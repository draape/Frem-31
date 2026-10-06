import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

// Flat config, required by ESLint 9. Next 16 removed `next lint`, so linting now
// runs through the ESLint CLI directly (see the `lint` script in package.json).
// `eslint-config-next` 16 ships flat configs, so these spread in as-is — no
// FlatCompat shim needed.
const config = [
  {
    // Build output and generated code. `styled-system/` is emitted by
    // `panda codegen` on every build and is not ours to lint.
    ignores: ['.next/**', 'out/**', 'styled-system/**', 'playwright-report/**', 'test-results/**'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];

export default config;
