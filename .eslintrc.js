module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off', // 聲明的變數未使用
    'prefer-const': 'off', // 未使用的變數聲明為const
    'dot-notation': 'off', // 取陣列建議用.符號
    'import/first': 'off', // import必需放在最上面
    'no-extend-native': 'off' // 僅讀取原型，不應添加屬性(jsPrototype)
  }
}
