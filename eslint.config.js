import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["node_modules", ".next"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {},
  },
];
