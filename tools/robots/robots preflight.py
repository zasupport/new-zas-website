#!/usr/bin/env python3
"""
PURPOSE   Answer one question before anything else runs: is this machine, this
          directory and this input set actually ready. Nine sections, each with a
          concrete fix line. Nothing here changes anything.
STORAGE   <site repo>/tools/robots/
EXECUTES  python3 "robots preflight.py" [--json] [--strict]
RELATED   robots index engine.py | robots guard.py | robots pressure test.py
VERSION   1.0.0
DATE      25/07/2026 10:30 SAST
AUTHOR    Courtney Bentley, ZA Support

Exit codes
  0  READY, or READY WITH WARNINGS
  1  NOT READY, at least one blocking check failed
  2  --strict was passed and there is at least one warning

Runs on a bare python3. Missing libraries are reported as findings, not crashes,
because the whole point is to be runnable before the environment is built.
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

SAST = timezone(timedelta(hours=2))
UA = "Mozilla/5.0 (compatible; ZASupportPreflight/1.0; +https://zasupport.com)"

PASS, WARN, FAIL, SKIP = "PASS", "WARN", "FAIL", "SKIP"

ROBOTS_SOURCES = [
    "app/robots.ts",
    "app/robots.js",
    "src/app/robots.ts",
    "src/app/robots.js",
    "app/robots.txt",
    "public/robots.txt",
]

results = []


def add(section, name, status, detail="", fix=""):
    results.append(
        {"section": section, "check": name, "status": status, "detail": detail, "fix": fix}
    )
    return status


def sh(*args, cwd=None):
    try:
        r = subprocess.run(args, capture_output=True, text=True, cwd=cwd, timeout=20)
        return r.returncode, r.stdout.strip(), r.stderr.strip()
    except Exception as exc:
        return 1, "", str(exc)


# ======================================================================================
# 1. Location. This is the check that answers "run Block 1 from inside the site repo".
# ======================================================================================


def check_location():
    s = "Location"
    rc, top, _ = sh("git", "rev-parse", "--show-toplevel")
    if rc != 0:
        add(
            s,
            "Inside a git repository",
            FAIL,
            f"cwd is {Path.cwd()}",
            "cd into the zasupport.com site repository, then run this again. "
            "Nothing in this toolchain works outside the repo.",
        )
        return None
    repo = Path(top)
    add(s, "Inside a git repository", PASS, str(repo))

    pkg = repo / "package.json"
    looks_right = False
    if pkg.exists():
        try:
            d = json.loads(pkg.read_text(encoding="utf-8"))
            deps = {**d.get("dependencies", {}), **d.get("devDependencies", {})}
            looks_right = "next" in deps
            add(
                s,
                "Repository is a Next.js project",
                PASS if looks_right else FAIL,
                f"name={d.get('name', '?')} next={deps.get('next', 'absent')}",
                ""
                if looks_right
                else "This does not look like the site repo. "
                "Check you are in the zasupport.com repository.",
            )
        except Exception as exc:
            add(s, "package.json readable", FAIL, str(exc), "Repair package.json")
    else:
        add(s, "package.json present", FAIL, "not found", "This is probably not the site repo")

    rc, branch, _ = sh("git", "rev-parse", "--abbrev-ref", "HEAD", cwd=repo)
    rc2, dirty, _ = sh("git", "status", "--porcelain", cwd=repo)
    n_dirty = len([l for l in dirty.splitlines() if l.strip()])
    add(
        s,
        "Working tree state",
        WARN if n_dirty else PASS,
        f"branch {branch}, {n_dirty} uncommitted change(s)",
        "Commit or stash before running the patch stage, so the fix lands on a clean branch"
        if n_dirty
        else "",
    )
    return repo


# ======================================================================================
# 2. Toolchain
# ======================================================================================


def check_toolchain(tools):
    s = "Toolchain"
    add(s, "python3", PASS, sys.version.split()[0])

    for exe, needed in (("git", True), ("node", False), ("npm", False)):
        p = shutil.which(exe)
        add(
            s,
            exe,
            PASS if p else (FAIL if needed else WARN),
            p or "not found",
            "" if p else f"Install {exe}",
        )

    venv_py = tools / ".venv" / "bin" / "python3" if tools else None
    if venv_py and venv_py.exists():
        add(s, "Virtual environment", PASS, str(venv_py))
        py = str(venv_py)
    else:
        add(
            s,
            "Virtual environment",
            FAIL,
            "tools/robots/.venv missing",
            "Run Block 1 of the runbook from inside the repo",
        )
        py = sys.executable

    for mod, needed, why in (
        ("protego", True, "Google-spec robots matching"),
        ("requests", True, "fetching the live site"),
        ("googleapiclient", False, "Search Console API"),
        ("google.oauth2", False, "Search Console authentication"),
    ):
        rc, _, err = sh(py, "-c", f"import {mod}")
        add(
            s,
            f"module {mod}",
            PASS if rc == 0 else (FAIL if needed else WARN),
            why if rc == 0 else err.splitlines()[-1][:80] if err else "missing",
            "" if rc == 0 else "Run Block 1 to install dependencies",
        )


# ======================================================================================
# 3. Next.js specifics
# ======================================================================================


def check_nextjs(repo):
    s = "Next.js"
    if repo is None:
        add(s, "Router layout", SKIP, "no repo", "")
        return

    app_router = (repo / "app").is_dir() or (repo / "src" / "app").is_dir()
    pages_router = (repo / "pages").is_dir() or (repo / "src" / "pages").is_dir()
    layout = ("App Router" if app_router else "") + (
        " and Pages Router"
        if app_router and pages_router
        else "Pages Router"
        if pages_router
        else ""
    )
    add(
        s,
        "Router layout",
        PASS if layout else WARN,
        layout or "neither app/ nor pages/ found",
        "" if layout else "Confirm this is the site repo",
    )

    found = [r for r in ROBOTS_SOURCES if (repo / r).exists()]
    if len(found) == 1:
        add(s, "robots source", PASS, found[0])
    elif len(found) > 1:
        add(
            s,
            "robots source",
            FAIL,
            ", ".join(found),
            "Two robots sources will fight. A static public/robots.txt wins over "
            "app/robots.ts in Next.js. Delete the one you are not using.",
        )
    else:
        add(
            s,
            "robots source",
            FAIL,
            "none of " + ", ".join(ROBOTS_SOURCES),
            "The site serves robots.txt from somewhere this tool cannot patch. "
            "Find it before running the patch stage.",
        )

    sitemap_src = [
        r
        for r in (
            "app/sitemap.ts",
            "src/app/sitemap.ts",
            "app/sitemap.xml",
            "public/sitemap.xml",
            "next-sitemap.config.js",
        )
        if (repo / r).exists()
    ]
    add(
        s,
        "sitemap source",
        PASS if sitemap_src else WARN,
        ", ".join(sitemap_src) or "not found in the usual places",
        ""
        if sitemap_src
        else "Confirm how sitemap.xml is generated, the engine reads the live one",
    )

    cfg = None
    for c in ("next.config.js", "next.config.mjs", "next.config.ts"):
        if (repo / c).exists():
            cfg = repo / c
            break
    if cfg:
        text = cfg.read_text(encoding="utf-8", errors="replace")
        has_headers = "headers" in text
        has_xrobots = "X-Robots-Tag" in text
        add(
            s,
            "next.config headers block",
            PASS if has_headers else WARN,
            f"{cfg.name}, headers()={'present' if has_headers else 'absent'}, "
            f"X-Robots-Tag={'present' if has_xrobots else 'absent'}",
            ""
            if has_headers
            else "A headers() block is needed to serve X-Robots-Tag noindex. Without it, "
            "the only way to de-index a crawlable route is a meta tag on the page.",
        )
    else:
        add(
            s,
            "next.config",
            WARN,
            "not found",
            "Needed if any URL must be crawlable and noindex at the same time",
        )


# ======================================================================================
# 4. Tool install
# ======================================================================================


def check_tools(tools):
    s = "Tooling"
    if tools is None:
        add(s, "tools/robots present", SKIP, "no repo", "")
        return
    if not tools.is_dir():
        add(
            s,
            "tools/robots present",
            FAIL,
            str(tools),
            "Run Block 1 of the runbook from inside the repo",
        )
        return
    add(s, "tools/robots present", PASS, str(tools))

    for f in ("robots index engine.py", "robots guard.py", "robots pressure test.py"):
        p = tools / f
        add(
            s,
            f,
            PASS if p.exists() else FAIL,
            f"{p.stat().st_size} bytes" if p.exists() else "missing",
            "" if p.exists() else "Rerun the block that writes this file",
        )

    for d in ("state", "inbox", "_archive"):
        p = tools / d
        add(
            s,
            f"{d}/ directory",
            PASS if p.is_dir() else WARN,
            str(p) if p.is_dir() else "missing",
            "" if p.is_dir() else f"mkdir -p '{p}'",
        )


# ======================================================================================
# 5. Configuration
# ======================================================================================


def check_config(tools, repo):
    s = "Configuration"
    if tools is None:
        add(s, "config.json", SKIP, "no repo", "")
        return {}
    p = tools / "config.json"
    if not p.exists():
        add(s, "config.json", FAIL, "missing", "Run Block 2 of the runbook")
        return {}
    try:
        c = json.loads(p.read_text(encoding="utf-8"))
    except Exception as exc:
        add(s, "config.json parses", FAIL, str(exc), "Repair or rerun Block 2")
        return {}
    add(s, "config.json parses", PASS, f"{len(c)} keys")

    for k in ("site", "gsc_property", "repo_path", "sitemaps", "notify_email"):
        add(
            s,
            f"key {k}",
            PASS if c.get(k) else FAIL,
            str(c.get(k, ""))[:70],
            "" if c.get(k) else "Add it in Block 2",
        )

    prop = c.get("gsc_property", "")
    ok_shape = prop.startswith("sc-domain:") or prop.startswith("http")
    add(
        s,
        "gsc_property shape",
        PASS if ok_shape else FAIL,
        prop,
        ""
        if ok_shape
        else "Must be exactly as Search Console shows it. Domain property is "
        "sc-domain:zasupport.com. URL-prefix property is https://zasupport.com/",
    )

    if repo:
        cfg_repo = Path(os.path.expanduser(c.get("repo_path", ""))).resolve()
        same = cfg_repo == repo.resolve()
        add(
            s,
            "repo_path matches this repo",
            PASS if same else FAIL,
            f"config says {cfg_repo}",
            "" if same else f"Rerun Block 2 from inside {repo}",
        )
    return c


# ======================================================================================
# 6. Credentials
# ======================================================================================


def check_credentials(cfg):
    s = "Credentials"

    key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    envfile = Path.home() / ".za-support.env"
    if key:
        add(s, "ANTHROPIC_API_KEY", PASS, f"set, {len(key)} chars")
    elif envfile.exists() and "ANTHROPIC_API_KEY" in envfile.read_text(
        encoding="utf-8", errors="replace"
    ):
        add(
            s,
            "ANTHROPIC_API_KEY",
            WARN,
            "not in this shell but present in ~/.za-support.env",
            "Run: source ~/.za-support.env",
        )
    else:
        add(
            s,
            "ANTHROPIC_API_KEY",
            FAIL,
            "not set and not in ~/.za-support.env",
            "Needed for the Analyst, Adjudicator, Verifier and Advisor stages",
        )

    sa = os.path.expanduser(cfg.get("gsc_service_account_json", ""))
    if not sa:
        add(s, "GSC service account", FAIL, "no path configured", "Set it in Block 2")
        return
    p = Path(sa)
    if not p.exists():
        add(
            s,
            "GSC service account file",
            FAIL,
            sa,
            "Create a service account in Google Cloud, enable the Search Console API, "
            "download the JSON key to this path",
        )
        return
    try:
        d = json.loads(p.read_text(encoding="utf-8"))
        email = d.get("client_email", "")
        add(
            s,
            "GSC service account file",
            PASS if email else FAIL,
            email or "no client_email in the key file",
            "" if email else "This does not look like a service account key",
        )
        if email:
            add(
                s,
                "Service account added to the property",
                WARN,
                f"cannot be checked from here: {email}",
                f"In Search Console, Settings, Users and permissions, add {email} "
                f"as a FULL user. The URL Inspection API refuses restricted access.",
            )
        mode = oct(p.stat().st_mode)[-3:]
        add(
            s,
            "Key file permissions",
            PASS if mode in ("600", "400") else WARN,
            mode,
            "" if mode in ("600", "400") else f"chmod 600 '{sa}'",
        )
    except Exception as exc:
        add(s, "GSC service account parses", FAIL, str(exc), "Re-download the key")


# ======================================================================================
# 7. Inputs. The Search Console export.
# ======================================================================================


def check_inputs(tools, cfg):
    s = "Inputs"
    if tools is None:
        add(s, "inbox", SKIP, "no repo", "")
        return
    inbox = tools / "inbox"
    inbox.mkdir(parents=True, exist_ok=True)
    site = (cfg.get("site") or "https://zasupport.com").rstrip("/")

    zips = list(inbox.glob("*.zip"))
    if zips:
        add(
            s,
            "Unextracted export archive",
            FAIL,
            ", ".join(z.name for z in zips),
            f"Search Console exports a zip. Extract it: cd '{inbox}' && unzip -o '{zips[0].name}'",
        )

    files = [f for pat in ("*.csv", "*.tsv", "*.txt") for f in inbox.glob(pat)]
    if not files:
        add(
            s,
            "Search Console export present",
            FAIL,
            f"{inbox} is empty",
            "Open the Indexed though blocked by robots.txt issue in Search Console, "
            "click EXPORT, choose CSV, and drop the file here. Search Console has no "
            "coverage API, so this export is the only authoritative list of affected "
            "URLs. Without it the engine can only see sitemap URLs, and the URLs "
            "causing this condition are usually orphans that are not in the sitemap.",
        )
        return

    add(s, "Search Console export present", PASS, ", ".join(f.name for f in files))

    rx = re.compile(re.escape(site) + r"[^\s\",;]*")
    urls, foreign = set(), set()
    for f in files:
        text = f.read_text(encoding="utf-8", errors="replace")
        for m in rx.findall(text):
            urls.add(m.rstrip('",;'))
        for m in re.findall(r"https?://[^\s\",;]+", text):
            if not m.startswith(site):
                foreign.add(m.split("/")[2])

    add(
        s,
        "URLs for this site in the export",
        PASS if urls else FAIL,
        f"{len(urls)} found",
        ""
        if urls
        else f"The export contains no {site} URLs. Check you exported the "
        f"right property and the right issue.",
    )
    if foreign:
        add(
            s,
            "URLs for other domains in the export",
            WARN,
            ", ".join(sorted(foreign)[:5]),
            "Mixed export. Confirm this is the zasupport.com property",
        )

    # Does the export actually describe the issue we are fixing? A real export for
    # this condition contains URLs the live robots.txt blocks.
    try:
        import requests
        from protego import Protego

        r = requests.get(f"{site}/robots.txt", headers={"User-Agent": UA}, timeout=20)
        txt = r.text
        if txt.startswith("\ufeff"):
            txt = txt[1:]
        txt = txt.replace("\r\n", "\n").replace("\r", "\n")
        parser = Protego.parse(txt)
        blocked = [u for u in urls if not parser.can_fetch(u, "Googlebot")]
        if urls:
            add(
                s,
                "Export matches this issue",
                PASS if blocked else WARN,
                f"{len(blocked)} of {len(urls)} export URLs are blocked by the live robots.txt",
                ""
                if blocked
                else "None of the exported URLs are currently blocked. Either the fix is "
                "already deployed, or this export is for a different issue.",
            )
    except Exception as exc:
        add(s, "Export matches this issue", SKIP, f"could not check: {exc}", "")


# ======================================================================================
# 8. Proof and wiring
# ======================================================================================


def check_proof(tools):
    s = "Proof"
    if tools is None:
        add(s, "Pressure test", SKIP, "no repo", "")
        return
    p = tools / "state" / "pressure test.json"
    if not p.exists():
        add(
            s,
            "Pressure test has been run",
            FAIL,
            "state/pressure test.json missing",
            "Run: python3 'robots pressure test.py'",
        )
        return
    try:
        d = json.loads(p.read_text(encoding="utf-8"))
        neg_ok = d.get("negative_passed") == d.get("negative_total")
        pos_ok = d.get("positive_passed") == d.get("positive_total")
        add(
            s,
            "Pressure test result",
            PASS if (neg_ok and pos_ok) else FAIL,
            f"positive {d.get('positive_passed')}/{d.get('positive_total')}, "
            f"negative {d.get('negative_passed')}/{d.get('negative_total')}",
            "" if (neg_ok and pos_ok) else "Do not trust the guard until every control passes",
        )
    except Exception as exc:
        add(s, "Pressure test result", FAIL, str(exc), "Rerun the pressure test")

    prot = tools / "protected urls.json"
    if prot.exists():
        try:
            n = len(json.loads(prot.read_text(encoding="utf-8"))["urls"])
            add(s, "Protected URL set", PASS, f"{n} URLs under guard")
        except Exception:
            add(s, "Protected URL set", FAIL, "unreadable", "Rerun the verify stage")
    else:
        add(
            s,
            "Protected URL set",
            WARN,
            "not generated yet",
            "Created by the verify stage. Until then the pre-commit hook passes "
            "everything, so the repo is not actually protected.",
        )


def check_wiring(tools, repo):
    s = "Wiring"
    if repo is None:
        add(s, "Hook points", SKIP, "no repo", "")
        return
    home = Path.home()
    points = [
        (
            "Skill, every session",
            home / ".claude" / "skills" / "robots-index-guard" / "SKILL.md",
            None,
        ),
        (
            "Skill, project scope",
            repo / ".claude" / "skills" / "robots-index-guard" / "SKILL.md",
            None,
        ),
        ("Pre-commit hook", repo / ".git" / "hooks" / "pre-commit", "robots guard"),
        ("CI workflow", repo / ".github" / "workflows" / "robots guard.yml", None),
        ("npm scripts", repo / "package.json", "robots:guard"),
        ("INSTRUCTIONS index", repo / "INSTRUCTIONS.md", "robots-index-guard"),
        ("Install chaser ledger", home / ".claude" / "install-ledger.json", "robots-index-guard"),
    ]
    for name, path, needle in points:
        ok = path.exists()
        if ok and needle:
            ok = needle in path.read_text(encoding="utf-8", errors="replace")
        add(
            s,
            name,
            PASS if ok else FAIL,
            str(path),
            "" if ok else "Rerun the wiring blocks of the runbook",
        )

    plist = home / "Library" / "LaunchAgents" / "com.zasupport.robotsguard.plist"
    if sys.platform != "darwin":
        add(s, "Weekly monitor", SKIP, "not macOS", "")
    else:
        rc, out, _ = sh("launchctl", "list")
        loaded = "com.zasupport.robotsguard" in out
        add(
            s,
            "Weekly monitor",
            PASS if loaded else FAIL,
            str(plist),
            "" if loaded else "Rerun the monitor block",
        )


# ======================================================================================
# 9. Live site
# ======================================================================================


def check_live(cfg):
    s = "Live site"
    site = (cfg.get("site") or "https://zasupport.com").rstrip("/")
    try:
        import requests
    except Exception:
        add(s, "Reachability", SKIP, "requests not installed", "Run Block 1")
        return
    for label, url in (
        ("robots.txt", f"{site}/robots.txt"),
        ("sitemap.xml", f"{site}/sitemap.xml"),
    ):
        try:
            r = requests.get(url, headers={"User-Agent": UA}, timeout=25)
            ok = r.status_code == 200
            extra = ""
            if label == "robots.txt" and ok:
                if r.text.startswith("\ufeff"):
                    extra = " -- BYTE ORDER MARK PRESENT"
                n_dis = len(re.findall(r"(?im)^\s*Disallow:", r.text))
                extra += f", {n_dis} Disallow rules"
            if label == "sitemap.xml" and ok:
                extra = f", {len(re.findall(r'<loc>', r.text))} URLs"
            add(
                s,
                label,
                PASS if ok else FAIL,
                f"HTTP {r.status_code}, {len(r.content)} bytes{extra}",
                "" if ok else f"{url} is not returning 200",
            )
            if label == "robots.txt" and ok and r.text.startswith("\ufeff"):
                add(
                    s,
                    "robots.txt encoding",
                    FAIL,
                    "file begins with a UTF-8 byte order mark",
                    "Google ignores the mark and honours the rules, but many parsers "
                    "discard the first group entirely. Re-save without BOM.",
                )
        except Exception as exc:
            add(s, label, FAIL, str(exc)[:80], f"Check {url} manually")


def check_robots_structure(cfg):
    """
    Structural hazards in the live robots.txt that a URL matcher alone will not flag.
    Added 25/07/2026 from the gap analysis. Two checks that catch silent future failure.
    """
    s = "robots.txt structure"
    site = (cfg.get("site") or "https://zasupport.com").rstrip("/")
    try:
        import requests

        r = requests.get(f"{site}/robots.txt", headers={"User-Agent": UA}, timeout=25)
        if r.status_code != 200:
            add(s, "Fetch for analysis", SKIP, f"HTTP {r.status_code}", "")
            return
        txt = r.text
    except Exception as exc:
        add(s, "Fetch for analysis", SKIP, str(exc)[:60], "")
        return

    # The multi-group trap. Google obeys only the single most specific matching group
    # and ignores the rest. If a named Googlebot group exists alongside the wildcard,
    # a later edit to only the wildcard group silently fails to apply to Googlebot.
    groups = re.findall(r"(?im)^\s*User-agent:\s*(.+?)\s*$", txt)
    named = [g for g in groups if g != "*"]
    has_wildcard = any(g == "*" for g in groups)
    google_named = any(g.lower().startswith("googlebot") for g in named)
    if google_named and has_wildcard:
        add(
            s,
            "Googlebot group vs wildcard",
            FAIL,
            f"{len(groups)} user-agent groups, Googlebot named separately alongside *",
            "Google obeys ONLY the Googlebot group and ignores the * group. A future "
            "edit to only the * group will not apply to Googlebot. Collapse to a single "
            "* group, or ensure every protected path appears in the Googlebot group too.",
        )
    elif len(groups) > 6:
        add(
            s,
            "User-agent group count",
            WARN,
            f"{len(groups)} groups ({len(set(groups))} distinct agents)",
            "Many duplicated groups are a maintenance hazard. An edit to one group does "
            "not propagate to the others. Consider collapsing to the minimum needed.",
        )
    else:
        add(
            s,
            "User-agent group structure",
            PASS,
            f"{len(groups)} group(s), no Googlebot-vs-wildcard split",
        )

    # The Host directive. Google does not support it. Noise that misleads maintainers.
    if re.search(r"(?im)^\s*Host:", txt):
        add(
            s,
            "Host directive",
            WARN,
            "present",
            "Google does not support the Host directive (it was Yandex-only). It is "
            "harmless but pure noise and can trigger a Syntax-not-understood signal. "
            "Remove it.",
        )

    # AI-search crawlers accidentally caught by a broad block would remove the site
    # from AI answer surfaces. Flag any Disallow: / applied to a search-class AI bot.
    for bot in ("OAI-SearchBot", "PerplexityBot", "ChatGPT-User", "Claude-SearchBot"):
        m = re.search(
            rf"(?ims)^\s*User-agent:\s*{re.escape(bot)}\s*$(.*?)(?=^\s*User-agent:|\Z)", txt
        )
        if m and re.search(r"(?im)^\s*Disallow:\s*/\s*$", m.group(1)):
            add(
                s,
                f"AI search crawler {bot}",
                WARN,
                "blocked with Disallow: /",
                f"{bot} is a retrieval crawler that surfaces you in AI answers. Blocking "
                f"it removes you from that channel. Confirm this is intended.",
            )


# ======================================================================================
# Report
# ======================================================================================


def report(as_json, strict):
    counts = {k: sum(1 for r in results if r["status"] == k) for k in (PASS, WARN, FAIL, SKIP)}
    blocking = [r for r in results if r["status"] == FAIL]
    warnings = [r for r in results if r["status"] == WARN]

    if as_json:
        print(
            json.dumps(
                {
                    "generated": datetime.now(SAST).strftime("%d/%m/%Y %H:%M SAST"),
                    "counts": counts,
                    "verdict": "NOT READY"
                    if blocking
                    else ("READY WITH WARNINGS" if warnings else "READY"),
                    "results": results,
                },
                indent=2,
            )
        )
    else:
        section = None
        for r in results:
            if r["section"] != section:
                section = r["section"]
                print(f"\n  {section}")
                print("  " + "-" * 70)
            mark = {PASS: "PASS", WARN: "WARN", FAIL: "FAIL", SKIP: "skip"}[r["status"]]
            print(f"  [{mark}] {r['check']:<38} {r['detail'][:70]}")
            if r["fix"]:
                for line in _wrap(r["fix"], 66):
                    print(f"         -> {line}")

        print("\n" + "=" * 74)
        print(
            f"  PREFLIGHT   pass {counts[PASS]}   warn {counts[WARN]}   "
            f"fail {counts[FAIL]}   skipped {counts[SKIP]}"
        )
        print("=" * 74)
        if blocking:
            print("  NOT READY. Fix these before running anything:")
            for r in blocking:
                print(f"    {r['section']}: {r['check']}")
        elif warnings:
            print("  READY WITH WARNINGS. Safe to proceed, but read the warnings above.")
        else:
            print("  READY. Every prerequisite is in place.")
        print()

    if blocking:
        return 1
    if warnings and strict:
        return 2
    return 0


def _wrap(text, width):
    words, line, out = text.split(), "", []
    for w in words:
        if len(line) + len(w) + 1 > width:
            out.append(line)
            line = w
        else:
            line = f"{line} {w}".strip()
    if line:
        out.append(line)
    return out


def main():
    ap = argparse.ArgumentParser(
        description="Readiness check for the robots index guard. Changes nothing."
    )
    ap.add_argument("--json", action="store_true", help="machine readable output")
    ap.add_argument("--strict", action="store_true", help="treat warnings as failure")
    args = ap.parse_args()

    if not args.json:
        print("=" * 74)
        print("  ROBOTS INDEX GUARD, PREFLIGHT")
        print(f"  {datetime.now(SAST).strftime('%d/%m/%Y %H:%M SAST')}")
        print("=" * 74)

    repo = check_location()
    tools = (repo / "tools" / "robots") if repo else None
    check_toolchain(tools)
    check_nextjs(repo)
    check_tools(tools)
    cfg = check_config(tools, repo)
    check_credentials(cfg)
    check_inputs(tools, cfg)
    check_proof(tools)
    check_wiring(tools, repo)
    check_live(cfg)
    check_robots_structure(cfg)

    sys.exit(report(args.json, args.strict))


if __name__ == "__main__":
    main()
