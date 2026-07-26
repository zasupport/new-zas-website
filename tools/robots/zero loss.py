#!/usr/bin/env python3
"""
PURPOSE   Guarantee that nothing is ever lost. Before any file is written, the
          existing version is hashed, copied into a timestamped archive, and the
          copy is verified against the original hash. If the copy does not match,
          the install aborts before touching anything.
STORAGE   <site repo>/tools/robots/
EXECUTES  python3 "zero loss.py" snapshot|verify|restore|list [args]
          ZL_ARCHIVE=<dir> overrides where archives are written
RELATED   robots index engine.py | robots preflight.py
VERSION   1.0.2
DATE      19/07/2026 21:45 SAST
AUTHOR    Courtney Bentley, ZA Support

Guarantees
  1. Nothing is deleted. Ever. There is no delete path in this file.
  2. Nothing is overwritten before an archived copy exists and has been verified
     by hash against the original.
  3. Restore is itself reversible, because restore snapshots the current state
     before putting the old state back.
  4. Every operation writes a manifest, so what was held can be proved later
     rather than assumed.

Exit codes
  0  operation completed and verified
  1  verification failed, caller must not proceed
  2  bad arguments
"""

import hashlib
import json
import os
import shutil
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

SAST = timezone(timedelta(hours=2))
# Archive root. Overridable so the installer can run this script from a staging
# directory while still writing archives to the permanent location. Without the
# override the archive would land beside the script, which during testing on
# 20/07/2026 put the snapshot inside the staging folder that gets moved away.
ARCHIVE = Path(os.environ.get("ZL_ARCHIVE") or (Path(__file__).resolve().parent / "_archive"))


def stamp():
    return datetime.now(SAST).strftime("%d/%m/%Y %H:%M:%S SAST")


def tag():
    """
    A collision-proof archive tag.

    The first version used second resolution only. During testing on 20/07/2026
    a restore ran inside the same second as the archive it was restoring from,
    so its own pre-restore snapshot wrote over that archive and destroyed the
    only copy of the original. The tool built to prevent data loss lost data.

    The tag now carries milliseconds and, if a directory somehow still exists,
    takes the next free suffix. snapshot() additionally refuses to write into a
    directory that already holds a manifest.
    """
    base = datetime.now(SAST).strftime("%Y-%m-%d %H%M%S.%f")[:-3]
    candidate = base
    n = 1
    while (ARCHIVE / candidate).exists():
        candidate = f"{base}-{n}"
        n += 1
    return candidate


def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def safe_rel(path, roots):
    """
    Build a collision-free archive-relative path. Files come from several roots
    (the repo, the home directory), so the archive mirrors an absolute layout
    with the leading separator removed rather than flattening names.
    """
    p = Path(path).resolve()
    for label, root in roots.items():
        try:
            return Path(label) / p.relative_to(root)
        except ValueError:
            continue
    return Path("abs") / str(p).lstrip("/")


def snapshot(paths, note=""):
    """
    Archive every existing path, then verify each archived copy by hash.
    Returns the archive tag. Aborts with exit 1 if any copy does not verify.
    """
    roots = {"repo": Path.cwd().resolve(), "home": Path.home().resolve()}
    try:
        import subprocess
        out = subprocess.check_output(["git", "rev-parse", "--show-toplevel"],
                                      text=True, stderr=subprocess.DEVNULL).strip()
        roots["repo"] = Path(out).resolve()
    except Exception:
        pass

    t = tag()
    dest = ARCHIVE / t
    if (dest / "manifest.json").exists():
        print(f"ABORT: {dest} already holds an archive. Refusing to write over it.")
        print("Nothing has been modified.")
        sys.exit(1)
    dest.mkdir(parents=True, exist_ok=False)

    entries, missing = [], []
    for raw in paths:
        p = Path(os.path.expanduser(str(raw)))
        if not p.exists():
            missing.append(str(p))
            continue
        if p.is_dir():
            continue
        rel = safe_rel(p, roots)
        target = dest / rel
        target.parent.mkdir(parents=True, exist_ok=True)

        original_hash = sha256_file(p)
        shutil.copy2(p, target)
        copy_hash = sha256_file(target)

        if original_hash != copy_hash:
            print(f"ABORT: archived copy of {p} does not match the original.")
            print(f"  original {original_hash}")
            print(f"  copy     {copy_hash}")
            print("Nothing has been modified. Investigate the filesystem before retrying.")
            sys.exit(1)

        entries.append({
            "source": str(p),
            "archived": str(target.relative_to(dest)),
            "sha256": original_hash,
            "bytes": p.stat().st_size,
            "mode": oct(p.stat().st_mode)[-4:],
            "verified": True,
        })

    manifest = {
        "tag": t,
        "created": stamp(),
        "note": note,
        "roots": {k: str(v) for k, v in roots.items()},
        "archived_count": len(entries),
        "absent_at_snapshot_time": missing,
        "entries": entries,
    }
    (dest / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    print(f"SNAPSHOT {t}")
    print(f"  archived and hash-verified : {len(entries)} file(s)")
    print(f"  did not exist yet          : {len(missing)} path(s)")
    print(f"  location                   : {dest}")
    print(f"  restore with               : python3 \"zero loss.py\" restore \"{t}\"")
    return t


def verify(t):
    """Re-hash every archived file against its manifest. Detects archive rot."""
    dest = ARCHIVE / t
    mf = dest / "manifest.json"
    if not mf.exists():
        print(f"No manifest at {mf}")
        sys.exit(2)
    m = json.loads(mf.read_text(encoding="utf-8"))
    bad, ok = [], 0
    for e in m["entries"]:
        f = dest / e["archived"]
        if not f.exists():
            bad.append((e["archived"], "missing from archive"))
            continue
        h = sha256_file(f)
        if h != e["sha256"]:
            bad.append((e["archived"], f"hash drift {e['sha256'][:12]} -> {h[:12]}"))
        else:
            ok += 1
    print(f"VERIFY {t}   created {m['created']}")
    print(f"  intact : {ok}/{len(m['entries'])}")
    for name, why in bad:
        print(f"  DAMAGED {name}: {why}")
    if bad:
        sys.exit(1)
    print("  RESULT PASS. Every archived file is byte-identical to what was held.")
    return 0


def restore(t):
    """
    Put an archived state back. Snapshots the current state first, so a restore
    can itself be undone. Files that did not exist at snapshot time are left
    alone rather than removed, because removing is a delete and this file does
    not delete.
    """
    dest = ARCHIVE / t
    mf = dest / "manifest.json"
    if not mf.exists():
        print(f"No manifest at {mf}")
        sys.exit(2)
    m = json.loads(mf.read_text(encoding="utf-8"))

    current = [e["source"] for e in m["entries"]]
    pre = snapshot(current, note=f"state before restoring {t}")

    restored, failed = 0, []
    for e in m["entries"]:
        src = dest / e["archived"]
        tgt = Path(e["source"])
        tgt.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, tgt)
        if sha256_file(tgt) == e["sha256"]:
            restored += 1
        else:
            failed.append(e["source"])

    print(f"RESTORE {t}")
    print(f"  restored and verified : {restored}/{len(m['entries'])}")
    print(f"  previous state held as: {pre}")
    if m["absent_at_snapshot_time"]:
        print(f"  note: {len(m['absent_at_snapshot_time'])} path(s) did not exist at "
              f"snapshot time and were left in place, nothing is deleted by this tool")
    for f in failed:
        print(f"  FAILED {f}")
    if failed:
        sys.exit(1)
    return 0


def listing():
    if not ARCHIVE.exists():
        print("No archives yet.")
        return 0
    rows = []
    for d in sorted(ARCHIVE.iterdir()):
        mf = d / "manifest.json"
        if mf.exists():
            m = json.loads(mf.read_text(encoding="utf-8"))
            rows.append((m["tag"], m["created"], m["archived_count"], m.get("note", "")))
    if not rows:
        print("No manifests found.")
        return 0
    print(f"{'TAG':<20} {'CREATED':<26} {'FILES':>5}  NOTE")
    for t, c, n, note in rows:
        print(f"{t:<20} {c:<26} {n:>5}  {note[:40]}")
    print(f"\n{len(rows)} archive(s). Nothing is ever removed from here automatically.")
    return 0


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    cmd = sys.argv[1]
    if cmd == "snapshot":
        note = ""
        args = sys.argv[2:]
        if "--note" in args:
            i = args.index("--note")
            note = args[i + 1] if i + 1 < len(args) else ""
            args = args[:i] + args[i + 2:]
        if not args:
            print("snapshot needs at least one path")
            sys.exit(2)
        snapshot(args, note)
    elif cmd == "verify":
        sys.exit(verify(sys.argv[2]) if len(sys.argv) > 2 else 2)
    elif cmd == "restore":
        sys.exit(restore(sys.argv[2]) if len(sys.argv) > 2 else 2)
    elif cmd == "list":
        sys.exit(listing())
    else:
        print(f"unknown command {cmd}")
        sys.exit(2)


if __name__ == "__main__":
    main()
