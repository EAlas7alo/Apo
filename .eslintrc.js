module.exports = {
  env: {
    "node": true,
    "browser": true,
    "es6": true,
    "jest": true 
  },
  parser: "babel-eslint",
  extends: [
    'airbnb',
  ],
  
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: 0,
    'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx"] }],
    'linebreak-style': ["error", "windows"],
    'arrow-parens': 0,
    'object-curly-newline': 0,
    'no-shadow': 0,
    'arrow-body-style': 0,
    'no-underscore-dangle': 0
  },
};
