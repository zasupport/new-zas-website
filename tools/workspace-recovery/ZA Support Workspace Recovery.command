#!/bin/bash
# ZA Support Workspace Recovery, v1.0.1, 21 September 2026.
# User-launched Claude Code handoff. Never disables sandbox or permission checks.
set -euo pipefail
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
command -v python3 >/dev/null || { printf 'BLOCKED: Python 3 is required.\n'; exit 20; }
exec python3 - "$0" "$@" <<'PY'
import argparse
import datetime as dt
import hashlib
import json
import os
from pathlib import Path
import platform
import shutil
import subprocess
import sys
import tempfile
import uuid

VERSION = "1.0.1"
SELF = Path(sys.argv[1]).resolve()
HOME = Path.home()
STATE = HOME / "Library/Application Support/ZA Support/Workspace Recovery"
PROJECT = HOME / "Developer/new-zas-website"
FEEDBACK = Path("/tmp") / ("za-workspace-feedback-" + str(os.getuid()))
ARGS = sys.argv[2:]

def now():
    return dt.datetime.now(dt.timezone.utc).isoformat()

def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def write_json(path, data):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    if path.is_symlink():
        raise RuntimeError("Refusing to replace symlink: " + str(path))
    fd, tmp = tempfile.mkstemp(prefix=".receipt-", dir=path.parent)
    try:
        with os.fdopen(fd, "w") as stream:
            json.dump(data, stream, indent=2)
            stream.write("\n")
            stream.flush()
            os.fsync(stream.fileno())
        os.chmod(tmp, 0o600)
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)

def owned_dir(path):
    if path.is_symlink():
        raise RuntimeError("Refusing symlink directory: " + str(path))
    path.mkdir(parents=True, exist_ok=True, mode=0o700)
    if path.stat().st_uid != os.getuid():
        raise RuntimeError("Directory is not owned by this user: " + str(path))
    os.chmod(path, 0o700)

def run(command, cwd, log, timeout=1800):
    with Path(log).open("w") as output:
        try:
            result = subprocess.run(command, cwd=cwd, stdout=output,
                                    stderr=subprocess.STDOUT, timeout=timeout,
                                    check=False)
            code = result.returncode
        except (OSError, subprocess.TimeoutExpired) as error:
            output.write("\n" + type(error).__name__ + ": " + str(error) + "\n")
            code = 124 if isinstance(error, subprocess.TimeoutExpired) else 127
    return {"command": command, "exit_code": code, "log": str(log),
            "sha256": digest(log), "passed": code == 0}

def git_value(repo, *args):
    result = subprocess.run(["git", "-C", str(repo), *args],
                            capture_output=True, text=True, check=False)
    if result.returncode:
        raise RuntimeError(result.stderr.strip())
    return result.stdout.strip()

def close_state(native, request, remote):
    if not native or not native.get("passed"):
        return "NATIVE_REPAIR_REQUIRED"
    if not request or not remote:
        return "AWAITING_REMOTE_VERIFICATION"
    required = ["durable_write_read", "git_metadata_commit", "full_build"]
    matches = (
        remote.get("environment") == "perplexity-remote-device"
        and remote.get("request_id") == request.get("request_id")
        and remote.get("challenge") == request.get("challenge")
        and remote.get("repo") == request.get("repo")
        and remote.get("head") == native.get("head")
        and remote.get("source_sha256") == native.get("source_sha256")
        and remote.get("observed_at", "") >= request.get("created_at", "")
        and all(remote.get("checks", {}).get(k) is True for k in required)
        and bool(remote.get("tool_evidence"))
    )
    return "VERIFIED_FOR_THIS_WORKSPACE_AND_REVISION" if matches else "REMOTE_PROOF_REJECTED"

def load(path):
    return json.loads(path.read_text()) if path.exists() else None

def self_test():
    with tempfile.TemporaryDirectory(prefix="za-workspace-command-test-") as directory:
        root = Path(directory)
        write_json(root/"receipt.json", {"pass": True})
        assert load(root/"receipt.json") == {"pass": True}
        assert close_state(None, None, None) == "NATIVE_REPAIR_REQUIRED"
        native = {"passed": True, "head": "abc", "source_sha256": "123"}
        request = {"request_id": "r", "challenge": "c", "repo": "/p",
                   "created_at": "2026-09-21T00:00:00+00:00"}
        remote = {"environment": "perplexity-remote-device", "request_id": "r",
                  "challenge": "c", "repo": "/p", "head": "abc",
                  "source_sha256": "123", "observed_at": "2026-09-21T01:00:00+00:00",
                  "tool_evidence": "actual parent-agent tool receipt required",
                  "checks": dict.fromkeys(["durable_write_read", "git_metadata_commit", "full_build"], True)}
        assert close_state(native, request, None) == "AWAITING_REMOTE_VERIFICATION"
        assert close_state(native, request, remote) == "VERIFIED_FOR_THIS_WORKSPACE_AND_REVISION"
        for key, value in [("challenge","wrong"), ("head","wrong"), ("repo","/wrong"),
                           ("observed_at","2026-09-20"), ("source_sha256","wrong"),
                           ("environment","native-terminal")]:
            assert close_state(native,request,{**remote,key:value}) == "REMOTE_PROOF_REJECTED"
        assert close_state(native, request, {**remote, "checks": {}}) == "REMOTE_PROOF_REJECTED"
        probe = root/"git-probe"
        probe.mkdir()
        assert run(["git","init",str(probe)],root,root/"git-init.log")["passed"]
        assert run(["git","-C",str(probe),"-c","user.name=Verification test",
                    "-c","user.email=probe@localhost","commit","--allow-empty",
                    "-m","Disposable verification test"],root,root/"git-commit.log")["passed"]
        assert not run(["git","-C",str(probe),"rev-parse","missing-ref"],
                       root,root/"negative.log")["passed"]
    print("PASS: receipt round-trip, state machine, 8 negative controls and real disposable Git commit.")
    print("This self-test does not attest to Mac workspace permission or application build success.")

parser = argparse.ArgumentParser(description="Safe workspace repair and dual-environment verification.")
group = parser.add_mutually_exclusive_group()
group.add_argument("--self-test", action="store_true")
group.add_argument("--prepare-only", action="store_true")
group.add_argument("--verify-native", action="store_true")
group.add_argument("--status", action="store_true")
parser.add_argument("--repo", type=Path)
opts = parser.parse_args(ARGS)
if opts.self_test:
    self_test()
    sys.exit(0)
if platform.system() != "Darwin":
    raise SystemExit("BLOCKED: native installation is for macOS. Use --self-test elsewhere.")
native_path = STATE/"native-latest.json"
request_path = STATE/"remote-request.json"
remote_path = FEEDBACK/"remote-verification.json"
if opts.status:
    remote = load(remote_path) or load(STATE/"remote-verification.json")
    state = close_state(load(native_path), load(request_path), remote)
    print(json.dumps({"state":state,"native":load(native_path),"request":load(request_path),
                      "remote":remote},indent=2))
    sys.exit(0 if state.startswith("VERIFIED_") else 10)
owned_dir(STATE)
owned_dir(FEEDBACK)

run_id = dt.datetime.now(dt.timezone.utc).strftime("%Y%m%dT%H%M%SZ")+"-"+uuid.uuid4().hex[:8]
run_dir = STATE/"runs"/run_id
owned_dir(run_dir)
installed = run_dir/"ZA Support Workspace Recovery.command"
shutil.copy2(SELF, installed)
installed.chmod(0o700)

if opts.verify_native:
    if not opts.repo:
        raise SystemExit("BLOCKED: --verify-native requires --repo pointing to the isolated clean checkout.")
    repo = opts.repo.expanduser().resolve()
    if repo == PROJECT.resolve():
        raise SystemExit("BLOCKED: do not build in the canonical dirty checkout; use an isolated clone.")
    if not (repo/".git").is_dir():
        raise SystemExit("BLOCKED: checkout must own its .git directory, not a linked-worktree .git file.")
    if (repo/"node_modules").is_symlink():
        raise SystemExit("BLOCKED: node_modules must not point outside the checkout.")
    if git_value(repo,"status","--porcelain"):
        raise SystemExit("BLOCKED: commit the reviewed isolated changes first; never auto-stash or discard.")
    head = git_value(repo,"rev-parse","HEAD")
    source_hash = hashlib.sha256(subprocess.check_output(["git","-C",str(repo),"ls-tree","-r","HEAD"])).hexdigest()
    proof_root = repo/".git"/"za-workspace-proof"/run_id
    proof_root.mkdir(parents=True)
    probe = proof_root/"git-probe"
    probe.mkdir()
    checks = []
    marker = proof_root/"write-read-test.txt"
    payload = uuid.uuid4().hex
    marker.write_text(payload)
    checks.append({"name":"durable_write_read","passed":marker.read_text()==payload})
    checks.append({"name":"git_init",**run(["git","init",str(probe)],repo,run_dir/"git-init.log")})
    checks.append({"name":"git_metadata_commit",**run(["git","-C",str(probe),"-c",
        "user.name=Workspace verification","-c","user.email=probe@localhost",
        "commit","--allow-empty","-m","Local workspace verification"],repo,run_dir/"git-commit.log")})
    lock_hash = digest(repo/"package-lock.json")
    for name, command in [
        ("dependency_install",["npm","ci"]),
        ("typecheck",["npm","run","typecheck"]),
        ("lint",["npm","run","lint"]),
        ("seo",["npm","run","check:seo"]),
        ("full_build",["npm","run","build"]),
    ]:
        if checks and not checks[-1]["passed"]:
            checks.append({"name":name,"passed":False,"skipped":"prior gate failed"})
            continue
        checks.append({"name":name,**run(command,repo,run_dir/(name+".log"))})
        print(name+": "+("PASS" if checks[-1]["passed"] else "FAIL"), flush=True)
    build_id = repo/".next"/"BUILD_ID"
    checks.append({"name":"build_artifact","passed":build_id.is_file(),
                   "build_id":build_id.read_text().strip() if build_id.is_file() else None})
    checks.append({"name":"source_unchanged","passed":not git_value(repo,"status","--porcelain")})
    checks.append({"name":"lockfile_unchanged","passed":digest(repo/"package-lock.json")==lock_hash})
    receipt = {"version":VERSION,"run_id":run_id,"observed_at":now(),"environment":"native-macos",
               "repo":str(repo),"head":head,"source_sha256":source_hash,"lock_sha256":lock_hash,
               "checks":checks,"passed":all(x["passed"] for x in checks),
               "scope":"Native checks only. Never evidence of remote sandbox permission."}
    write_json(run_dir/"native-receipt.json",receipt)
    write_json(native_path,receipt)
    write_json(FEEDBACK/"native-latest.json",receipt)
    if receipt["passed"]:
        request={"request_id":run_id,"challenge":uuid.uuid4().hex,"created_at":now(),
                 "repo":str(repo),"head":head,"source_sha256":source_hash,
                 "native_receipt_sha256":digest(native_path),
                 "required_remote_checks":["durable_write_read","git_metadata_commit","full_build"],
                 "instructions":"Parent Computer session must run fresh checks through its remote-device tool in this exact authorised workspace. Never copy native results into remote-verification.json."}
        write_json(request_path,request)
        write_json(FEEDBACK/"remote-request.json",request)
        print("NATIVE PASS. LOOP OPEN: fresh remote verification is required.")
        print("Feedback request: "+str(FEEDBACK/"remote-request.json"))
        sys.exit(10)
    print("NATIVE FAIL. Read "+str(run_dir/"native-receipt.json"))
    sys.exit(20)

context = {
    "version":VERSION,"created_at":now(),"user_intent":"Permanent supported workspace/build repair with feedback verification",
    "source_project":str(PROJECT),"recommended_isolated_clone":str(HOME/"Developer/za-website-build-sandbox"),
    "production_verified_commit":"38eb9b1154343c35c25ced7e2ad904ef5a912d2e",
    "known_failure":"Remote tool reports Active workspace: none, even after user confirmed granting access.",
    "verified_temporary_git":"git init and a real empty commit succeeded in permitted /tmp on 21 September 2026.",
    "latest_remote_failure":"mkdir under /Users/cb/Developer/new-zas-website/.build-sandboxes denied; active workspace remained none.",
    "existing_dirty_project":"seo/organic-growth-infra; 38 pre-existing modified paths observed. Preserve all.",
    "old_isolated_worktree":"/private/tmp/claude-501/-Users-cb/5b336e83-2f8b-4e8c-9068-36980445790f/scratchpad/za-batch1-wt",
    "other_active_work":"Dependency remediation and indexing reliability remain active in the Computer thread. Coordinate before editing/deploying the same files.",
    "safety":"No sudo, SIP/TCC changes, sandbox escape, skip-permissions flags, private app database edits, hidden background relays, credential reads, destructive reset, or automatic production push.",
    "standing_rule":"Torcod and contextually clawed code mean Claude Code. Every operational deliverable needs an executable lesson, evidence, tests, propagation target and next action.",
}
write_json(run_dir/"contract.json",context)
prompt = f"""# ZA Support - Context Export - 21 September 2026

## Profile
Courtney Bentley, ZA Support. Primary project: {PROJECT}. Internal operational work.
No tax or company identifiers are needed for this repair.

## Workstreams
Execute this workspace-access repair now. Audit existing infrastructure first.
The Computer session reports Active workspace: none despite the user's grant confirmation.
Native Terminal permissions and Computer remote permissions are different boundaries.
Create a durable self-contained checkout only through supported ordinary file/Git operations.
Use {HOME}/Developer/za-website-build-sandbox if absent; inspect and reuse safely if already present.
Keep .git and node_modules within that checkout. Do not link back to protected parent metadata.
Audit the canonical dirty project, prior isolated worktree, existing scripts and documented app access controls.
Do not restart the publishing task or duplicate watchers.

## Decisions
The previous temporary Git init and commit passed. Durable mkdir was denied.
Correct the supported workspace selection/grant mechanism; never defeat it.
If no documented CLI exists, request the single necessary user action in the app, then wait for fresh remote evidence.
Do not claim that a native clone or build repairs the Computer session automatically.
Check supported Node engines before npm ci. Avoid build-time font downloads by using licensed project-local fonts.
Snapshots and commit context precede changes. Preserve the design and font weights.

## Open questions
Which app/session owns the active-workspace grant, and does a renewed tool session receive it?
The root cause is not yet proven. Do not invent an app preference key or patch a private database.
Check official documentation and observed UI, with user approval where needed.

## Actions
Audit -> classify -> bounded repair -> commit isolated changes -> native verification -> request remote verification.
Read {run_dir}/contract.json. Find existing equivalent setup before writing a new rule.
Use this installed command for the real native test:
    bash "{installed}" --verify-native --repo "<verified isolated checkout>"
It runs npm ci, typecheck, lint, SEO checks, full build, and real Git metadata operations.
Exit 10 after native PASS intentionally means the feedback loop is still open.
On failure, inspect that run's logs, repair only the proven cause, rerun no more than three times.
After three unsuccessful repair cycles, record a BLOCKED receipt with cause, owner and exact supported next action.
Never weaken checks, mock a production build, hide a failed subprocess, or replace npm ci with an unchecked install.
Do not publish, modify DNS, upgrade unrelated software, install a background service, or change global settings.

## Contacts
Courtney is the workspace owner. No third-party communication is authorised by this file.
Use the current authenticated Claude Code installation; do not print or collect credentials.

## Files
Installed versioned command: {installed}
Machine-readable contract: {run_dir}/contract.json
Durable feedback state: {STATE}
Computer-readable event mirror: {FEEDBACK}
Native test logs are per-run and never overwritten.
Remote attestation destination: {FEEDBACK}/remote-verification.json.
This path is inside the remote tool's permitted temporary area, not a request to write into a protected Library folder.
After validation, native Claude Code may archive the receipt under {STATE} without changing its contents.
Only the parent Computer session may create that attestation after ACTUAL remote-tool checks.
Its keys are environment=perplexity-remote-device, request_id, challenge, repo, head,
source_sha256, observed_at, checks (durable_write_read/git_metadata_commit/full_build),
and tool_evidence identifying the real tool outputs. Bind these to remote-request.json.
The parent must create a disposable proof repo within the authorised directory, commit there,
run npm run build from the exact isolated revision and record success or denial honestly.
Run --status after that receipt appears. Rejected, stale or mismatched proof is not a closed loop.

## Voice / sender / rules
Internal technical record; exact facts and executable checks, no unqualified permanent/100% success claims.
No client-facing output or supplier disclosures. Preserve existing project rules.

## Captures verbatim
"Standard rule STT failure Torcod is Claude Code"
"create a command file for cc to fix this problem permanently with a feedback mechanism that closes the loop to confirm that it is actually working"

## Other
Standing learning: preflight the actual execution surface before implementation.
Path permission, native build success, cloud build success and remote sandbox success are separate states.
Known new lessons: linked-worktree .git outside the allowed root fails; native success cannot attest to remote access;
build-time Google font downloads add avoidable network dependence; never equate HTTP 200 with the new deployment.
Propagate only genuine new lessons into the matching project CLAUDE.md/.claude rule, after duplicate scan.
Record rule path, before/after hash, trigger, enforcement, positive/negative tests and rollback.
Append to suitable existing rules; never overwrite unrelated instructions.
Do not mix this repair with the concurrent dependency patch or GSC changes without inspecting their actual state.
The original live publication is verified. Google discovered-not-indexed is not evidence of a local permissions failure.
No general indexing guarantee and no Indexing API use for ordinary service pages.
README execution clause: execute this bounded contract, extract verified operational learning,
propagate it through the existing applicable rule and record the evidence. Documentation alone is not completion.
No automatic deletion/uninstall: retain evidence and remove only this task's files after explicit owner approval.
END OF EXPORT
"""
prompt_path = run_dir/"Claude Code Import Workspace Recovery Context Summary 21.9.26.md"
prompt_path.write_text(prompt)
prompt_path.chmod(0o600)
write_json(STATE/"latest-handoff.json",{"version":VERSION,"run":str(run_dir),
           "command":str(installed),"command_sha256":digest(installed),"prompt":str(prompt_path),
           "status":"PREPARED_NOT_EXECUTED"})
write_json(FEEDBACK/"handoff-ready.json",{"run":str(run_dir),"status":"PREPARED_NOT_EXECUTED"})
print("Handoff: "+str(prompt_path))
print("Evidence: "+str(STATE))
if opts.prepare_only:
    print("Prepared only. No repair, build, app setting or production change was performed.")
    sys.exit(0)
claude = shutil.which("claude")
if not claude:
    raise SystemExit("BLOCKED: existing Claude Code executable not found. Import the saved handoff into Claude Code; no software was installed.")
if not PROJECT.is_dir():
    raise SystemExit("BLOCKED: expected project folder does not exist; contract retained for review.")
print("Starting Claude Code with normal permissions. No permission bypass flags are used.",flush=True)
with open("/dev/tty","r") as tty:
    status = subprocess.call([claude,prompt], cwd=PROJECT, stdin=tty)
print("Claude Code exited with status "+str(status))
print("Loop status: "+close_state(load(native_path),load(request_path),load(remote_path)))
print("Native success alone never closes the remote workspace-access issue.")
sys.exit(status)
PY
