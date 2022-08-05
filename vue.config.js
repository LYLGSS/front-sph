const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 自动打开浏览器
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080
  },
  // 关闭 eslint
  lintOnSave: false
})
