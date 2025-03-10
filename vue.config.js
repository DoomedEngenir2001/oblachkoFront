const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    devtool: 'source-map',
  },
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '^/users': {
          target: 'http://localhost:3000/',
          ws: true,
          changeOrigin: true
        },
      }
    }}});
