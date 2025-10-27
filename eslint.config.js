import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import { globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default [
  globalIgnores(['dist', 'node_modules', 'build']),
  js.configs.recommended,
  ...tseslint.configs.recommended, 
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      prettier,
    },
    // rules: {
    //   'react-hooks/rules-of-hooks': 'error',
    //   'prettier/prettier': [
    //     'warn',
    //     {
    //       semi: false,
    //       singleQuote: true,
    //       trailingComma: 'none',
    //       arrowParens: 'always',
    //       tabWidth: 2,
    //       useTabs: false,
    //       printWidth: 120,
    //       endOfLine: 'auto',
    //       jsxSingleQuote: true,
    //     },
    //   ],
    // },
  },
]
