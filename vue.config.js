const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 自动打开浏览器
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,

    // proxy 跨域代理
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  },
  // 关闭 eslint
  lintOnSave: false,
  // 打包项目时，不生成 .map 文件
  productionSourceMap: false
})
