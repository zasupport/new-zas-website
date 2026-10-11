---
paths: ["**/*.go"]
---
# Go quality rules
- `gofmt -w` and `go vet` run on every edit. `go vet` is the unreachable-code detector for Go.
- `golangci-lint run --fix` runs at package scope with gosec, errcheck, gocognit, and bodyclose enabled.
- Every error is checked. A discarded error needs an inline comment saying why.
- gosec findings (G101 hardcoded credentials, G201 SQL injection, G304 file path taint, G401 weak crypto) block, they do not warn.
