import { nativeConfig } from "@repo/eslint-config/native";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nativeConfig,
  {
    files: ["*.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
