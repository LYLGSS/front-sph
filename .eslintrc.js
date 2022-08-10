module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 在方法的形参()之前，是否必须有空格
    'space-before-function-paren': ['warn', 'never'],
    // 关闭组件的驼峰命名规则
    'vue/multi-word-component-names': 0,
    // 关闭未使用过的变量的检测
    'no-unused-vars': 'off'
  }
}
