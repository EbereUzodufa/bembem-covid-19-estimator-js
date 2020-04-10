module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "comma-dangle": ["error", "never"],
    "no-param-reassign": ["error", { "props": false }],
    "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"],
    "no-restricted-syntax": ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"],
    'max-len': ["error", { "code": 120 }]
  },
};