import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Stale Claude Code worktrees — not source files
    ".claude/worktrees/**",
    "perfect-blog/**",
  ]),
  // ZA Support overrides — allow natural prose content in JSX
  {
    rules: {
      // Prose pages use quotes/apostrophes in text — escaping breaks readability
      "react/no-unescaped-entities": "off",
      // Unused imports are warnings only — never block deploy
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]);

export default eslintConfig;
