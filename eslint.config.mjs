import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

      {
        /**
         * 1. Allow 'var' for global variable declaration in specific contexts
         *    -> global varialble used to avoid duplicate mongoose connection, cannot be replaced using let/const
         */
        files:["src/server/db/config.ts"],
        rules: { 
          "no-var": "off",
        }
      },

      {
        /**  
         * 2. Disable rule for `any` type usage 
         *   -> allow use any type for api requests, at the same time, implement error handling & validation logic on request body validity 
        */
        files: ["src/server/requests.ts", "src/lib/validation/requests.ts"],
        rules: {
          "@typescript-eslint/no-explicit-any": "off",
        }
      },

];

export default eslintConfig;
