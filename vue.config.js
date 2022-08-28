const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    // localhostでvueからexpressにAPIリクエストを送信する為の設定
    proxy: {
      '/auth': {
        target:'http://localhost:3000'
      }
    },
  }  
})
