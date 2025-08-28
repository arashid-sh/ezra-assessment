import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import playwright from "eslint-plugin-playwright";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        process: "readonly",
        localStorage: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      playwright: playwright,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...typescript.configs.stylistic.rules,
      "@typescript-eslint/no-non-null-assertion": "off",
      "playwright/prefer-lowercase-title": "warn",
      "playwright/prefer-to-be": "warn",
      "playwright/prefer-to-have-length": "warn",
      "playwright/prefer-strict-equal": "warn",
      "playwright/expect-expect": "off",
      "playwright/no-wait-for-timeout": "off",
      "playwright/max-nested-describe": ["warn", { max: 1 }],
      "playwright/no-restricted-matchers": [
        "error",
        {
          toBeFalsy: "Use `toBe(false)` instead.",
          not: null,
        },
      ],
      "playwright/missing-playwright-await": ["error"],
    },
  },
  prettier,
  {
    ignores: [
      "node_modules/",
      "test-results/",
      "playwright-report/",
      "summary.json",
      ".vscode/*",
      ".DS_Store",
      "Thumbs.db",
      "dist/",
      "build/",
    ],
  },
];
