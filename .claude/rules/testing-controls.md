# Testing controls
Every gate ships with five controls and is not considered working until all five pass.

- Positive: known-good input passes, exit 0.
- Negative: a planted fault MUST be caught, exit 2. This is the definition of done. If a planted fault passes, the pipeline is broken regardless of what everything else reports.
- Absence: empty input, missing file, and missing tool each produce a defined, logged outcome. Never a silent pass, never a crash.
- Pressure: repeated rapid invocation stays within the latency budget.
- End-to-end: the run is recorded in telemetry, proving the gate actually fired.

Falsification is mandatory. Deliberately break what the gate checks, confirm it reports the failure, restore, confirm it passes. Record both. A gate that has never failed has never been tested.
