# Fixture / equivalent-control record for scripts/discovery-next-step.*
# hook-block-mandate exemption clause: this is a standalone READ-ONLY advisory CLI tool with NO
# Claude lifecycle touchpoint, so it is not hook-governed at runtime. Its equivalent controls are
# its own embedded selftest, exercised in tempdirs (never the real runtime/shared stores):
#   positive : known-good input -> expected output, exit 0
#   negative : blocked/quota-fail source or invariant violation -> BLOCKED/forced-review, never a fake 0
#   absence  : missing input/cred -> honest UNKNOWN/BLOCKED with exact invocation, never a crash/fabrication
# Executable control (run to verify): python3 scripts/discovery-next-step.py --test    (or: bash scripts/discovery-next-step.sh --test)
# Aggregate smoke: bash scripts/smoke-seo-pipeline.sh ; harnesses: test-daily-seo-intelligence.py + test-commercial-discovery.py
