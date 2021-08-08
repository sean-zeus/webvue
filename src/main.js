import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// // css
// import '@/assets/icons/iconfont.css'
// import '@/assets/my.css'

// 對Date的擴充套件，將 Date 轉化為指定格式的String
// import '@/helperLibs/jsPrototype/date.js'

// // 全局註冊自定義指令
import importDirective from '@/helperLibs/directive'
importDirective(Vue)

// 全局註冊自定義的api工具
import { apiCall } from '@/helperLibs/apiFunc/apiCall.js'
Vue.prototype.$apiCall = apiCall

// 全局註冊config配置
import gconf from '@/helperLibs/global_conf'
Vue.prototype.$gconf = gconf

// 將全域性函式當做外掛來進行註冊
import gfunc from '@/helperLibs/global_func.js'
Vue.use(gfunc)

import axios from 'axios'
import fs from 'fs'

// 获取远端图片
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
}).then(function (response) {
  debugger
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
})

Vue.config.productionTip = false // 生產環境關掉提示

new Vue({
  // async created () {
  //   window.localStorage.setItem('RequestVerificationToken', await apiCall.fetch('/Public/RequestVerificationToken'))
  //   // console.log(window.localStorage.getItem('RequestVerificationToken') || '')
  // },
  created () {
    // setTimeout(() => {
    // apiCall.post('/Public/RequestVerificationToken').then(res => {
    apiCall.post('/Public/RequestVerificationToken').then(res => {
      window.localStorage.setItem('RequestVerificationToken', res)
    })
    // }).catch(err => {
    //   console.log(err)
    // }, 1000)
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
