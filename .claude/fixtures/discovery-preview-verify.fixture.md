# Fixture / equivalent-control record for scripts/discovery-preview-verify.py
# Read-only release-evidence engine (never pushes/deploys). Controls (python3 ... --test):
#   positive : live verify runs on real git + writes release-evidence.json
#   negative : a preview URL does NOT auto-become PREVIEW_VERIFIED (no fabricated pass)
#   absence  : no preview URL -> BLOCKED + exact unblock; state stays LOCALLY_COMMITTED
#   release-state distinction: the 6 states are ordered + never conflated (tests 23-25).
