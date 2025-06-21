import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended",
    "plugin:mdx/recommended" // Wrap this in compat.extends
  ),
  {
    rules: {
      semi: ["error", "always"], // Enforce semicolons
      "prettier/prettier": ["warn", { singleQuote: false }], // Disable warnings about single and double quotes
    },
  },
];

export default eslintConfig;
