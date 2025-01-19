import { FlatCompat } from "@eslint/eslintrc";
import boundaries from "eslint-plugin-boundaries";
import importPlugin from 'eslint-plugin-import';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: importPlugin,
      boundaries: boundaries,
    },
    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: [
            ["builtin", "external"],
            "internal",
            ["sibling", "parent"],
            "index"
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['shared', 'entities', 'features', 'widgets'] },
            { from: 'widgets', allow: ['shared', 'entities', 'features'] },
            { from: 'features', allow: ['shared', 'entities'] },
            { from: 'entities', allow: ['shared'] },
            { from: 'shared', allow: [] },
          ],
        },
      ],
    },
    settings: {
      "boundaries/elements": [
        {
          type: "app",
          pattern: "src/app/*"
        },
        {
          type: "features",
          pattern: "src/features/*"
        },
        {
          type: "entities",
          pattern: "src/entities/*"
        },
        {
          type: "shared",
          pattern: "src/shared/*"
        }
      ],
    },
  }
];

export default eslintConfig;
