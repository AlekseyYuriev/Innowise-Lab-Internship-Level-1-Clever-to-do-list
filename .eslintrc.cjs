/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['vuejs-accessibility'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:vuejs-accessibility/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
