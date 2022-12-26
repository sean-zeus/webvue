import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// // css
// import '@/assets/icons/iconfont.css'
// import '@/assets/my.css'

// // Date 轉化為指定格式的String
// import '/../ExtenFunc/jsPrototype/date.js'

// // 全局註冊自定義指令
import importDirective from '/../ExtenFunc/directive'
importDirective(Vue)

// 全局註冊自定義的api工具
import { apiCall } from '/../ExtenFunc/apiFunc/apiCall.js'
Vue.prototype.$apiCall = apiCall

// 全局註冊config配置
import gconf from '/../ExtenFunc/global_conf.js'
Vue.prototype.$gconf = gconf

// 將全域性函式當做外掛來進行註冊
import gfunc from '/../ExtenFunc/global_func.js'
Vue.use(gfunc)

// // 获取远端图片
// import axios from 'axios'
// import fs from 'fs'
// axios({
//   method: 'get',
//   url: 'https://lh3.googleusercontent.com/iXmJ9aWblkGDpg-_jpcqaY10KmA8HthjZ7F15U7mJ9PQK6vZEStMlathz1FfQQWV5XeeF-A1tZ0UpDjx3q6vEm2BWZn5k1btVSuBk9ad=s660',
//   responseType: 'stream'
// }).then(function (response) {
//   debugger
//   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
// })

Vue.config.productionTip = false // 生產環境關掉提示

new Vue({
  created() {
    apiCall.post('/Public/GetWEB_XCSRF_Token').then(res => {
      window.localStorage.setItem('WEB.XCSRF', res)
    })
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
