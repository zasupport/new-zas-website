---
paths: ["**/*.rs"]
---
# Rust quality rules
- `cargo clippy --fix` runs incrementally on edit; the correctness group is deny by default and stays that way.
- suspicious, complexity, and perf groups are warnings that must be resolved before the Stop gate passes.
- `unwrap()` and `expect()` in non-test code require a comment justifying why the panic is impossible.
