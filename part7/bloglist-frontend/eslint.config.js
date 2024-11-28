import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  // 5.12 - eslint config, using eslint.config.js because .eslintrc.csj is not supported by eslint 9
  {
    files: ['*.js', '*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    ignores: ['node_modules', 'dist', '.eslintrc.cjs', 'vite.config.js'], // .eslintignore is not supported by eslint 9, so using ignores in eslint.config.js
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 0,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 0,
    },
    settings: {
      react: {
        version: '18.2',
      },
    },
  },
]
