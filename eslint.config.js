import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    'dist-runtime',
    'public',
    'src/archive',
    'src/assignment',
    'src/blur',
    'src/blur1',
    'src/components',
    'src/home',
    'src/home copy',
    'src/hooks',
    'src/iot_testing',
    'src/nextmodel',
    'src/performance',
    'src/portfolio',
    'src/test',
    'src/AMP',
    'src/AMPReaderScreen.jsx',
    'src/App.jsx',
    'src/NotFound.jsx',
    'src/main.jsx',
    'src/old.jsx',
  ]),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^(?:[A-Z_]|motion$)',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    // Edge runtime: browser-style globals (fetch, Response, crypto) plus
    // process.env. Not React, so the component-oriented rules don't apply.
    files: ['middleware.js', 'lib/**/*.js', 'api/**/*.js', 'dev/**/*.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // These rendering modules intentionally export reusable shader/material
    // helpers alongside their React component entry points.
    files: [
      'src/features/portfolio/MetaballCursor.jsx',
      'src/features/portfolio/PortfolioCompositeEffects.jsx',
      'src/features/portfolio/SceneLoader.jsx',
      'src/features/animation/components/FaultyTerminal.jsx',
      'src/features/animation/core/MouseContext.jsx',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
