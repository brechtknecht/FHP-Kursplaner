module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console' : 'off',
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multi-word-component-names': 0,
    'no-unreachable' : 'off',
    'no-unused-vars' : 'warn',
    'no-prototype-builtins' : 'off',
    'no-mixed-spaces-and-tabs' : 'off',
    'no-irregular-whitespace' : 'off'
  },
  parserOptions: {
    parser: '@babel/eslint-parser'
  }
}
