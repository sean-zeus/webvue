// const path = require('path')

// const resolve = dir => {
//   return path.join(__dirname, dir)
// }

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  // // 默認情況下，Vue CLI 會假設你的應用是被部署在一個域名的根路徑上，例如 https://www.my-app.com/。如果應用被部署在一個子路徑上，你就需要用這個選項指定這個子路徑。例如，如果你的應用被部署在 https://www.my-app.com/my-app/，則設置 publicPath 為 /my-app/。
  // publicPath: '/', //基本路徑 Default: '/'
  // // 當運行 vue-cli-service build 時生成的生產環境構建文件的目錄。注意目標目錄在構建之前會被清除 (構建時傳入 --no-clean 可關閉該行為)。
  // outputDir: '../bccs_isms/wwwroot', // 輸出文件目錄 Default: 'dist'
  // assetsDir: '', ////放置生成的靜態資源 (js、css、img、fonts) 的 (相對於 outputDir 的) 目錄。Default: ''
  // indexPath : 'index.html', //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。Default:'index.html'
  productionSourceMap: false, // 打包時不生成.map文件(加速打包的速度)
  lintOnSave: false // 關畢eslint的執行時警告中斷
  // devServer: {
  //   // host: '127.0.0.1', //(默认值：0.0.0.0)
  //   port: 5001, // (默认值：8080)
  //   // https: true // (默认值：false),
  //   // compress: true, //为每个静态文件开启 gzip compression
  //   // disableHostCheck: true, // 当将此项配置设置为 true 时，将会跳过 host 检查
  //   proxy: 'https://localhost:44310/' // 這裡寫你調用接口的基礎路徑，來解決跨域，如果設置了代理，那你本地開發環境的axios的baseUrl要寫為 ''(包含config裏的env.js,url.js和src裏的config\index.js) ，即空字符串
  // }
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('@', resolve('src'))
  //     // .set('_c', resolve('src/components')) // key,value自行定義，比如.set('@@', resolve('src/components'))
  // }
}
