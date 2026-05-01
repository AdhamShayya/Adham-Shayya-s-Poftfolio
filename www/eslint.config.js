import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.json"],
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      curly: ["warn"],
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "react/no-array-index-key": "error",
      "@typescript-eslint/no-unused-expressions": ["error"],
      "@typescript-eslint/no-floating-promises": ["error"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-var-requires": ["error"],
      "@typescript-eslint/strict-boolean-expressions": ["error"],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: false,
          allowAny: false,
          allowNullish: false,
          allowRegExp: false,
        },
      ],
      "@typescript-eslint/restrict-plus-operands": ["error"],
      "@typescript-eslint/no-base-to-string": ["error"],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unnecessary-condition": ["error"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^h{1,1}$|^_",
        },
      ],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-unsafe-assignment": ["warn"],
      "@typescript-eslint/no-unsafe-member-access": ["warn"],
      "@typescript-eslint/no-unsafe-return": ["warn"],
      "@typescript-eslint/no-unsafe-argument": ["warn"],
      "@typescript-eslint/prefer-nullish-coalescing": ["warn"],
      "@typescript-eslint/prefer-optional-chain": ["warn"],
      "@typescript-eslint/consistent-type-imports": ["warn"],
      "@typescript-eslint/no-redundant-type-constituents": ["warn"],
    },
  },
];
