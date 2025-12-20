import { config as baseConfig } from "./base.js";
import expoConfig from "eslint-config-expo/flat";

/** @type {import("eslint").Linter.Config[]} */
export const nativeConfig = [
  ...baseConfig,
  ...expoConfig,
  {
    rules: {
      // Add any native-specific rule overrides here
    },
  },
];
