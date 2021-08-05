import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// ----------------iview-admin-template------------------------------------------------
// import '@/helpers/iview-admin/libs/DatePrototype.js' // 對Date的擴充套件，將 Date 轉化為指定格式的String

// // css
// import '@/assets/ivew-admin/icons/iconfont.css'
// // import '@/assets/ivew-admin/index.less'

// // 全局註冊自定義指令
import importDirective from '@/helpers/directive'
importDirective(Vue)

// 全局註冊自定義的api工具
import { apiCall } from '@/helpers/apiCall.js'
Vue.prototype.$apiCall = apiCall

// 全局註冊config配置
import gconf from '@/helpers/global_conf'
Vue.prototype.$gconf = gconf

// 將全域性函式當做外掛來進行註冊
import gfunc from '@/helpers/iview-admin/tools/global_func.js'
Vue.use(gfunc)
// ----------------iview-admin-template------------------------------------------------

// // ----------------client_app------------------------------------------------
// import { CONFIG as conf } from './helpers/client_app/global_conf.js'
// Vue.prototype.$gconf = conf
// import gfucn from './helpers/client_app/global_func.js'
// Vue.use(gfucn)
// import { apiCall } from './helpers/client_app/apiCall.js'
// Vue.prototype.$apiCall = apiCall

// import '@/assets/my.css'

// client_app參考用法
// let sfs = this.$gconf.API_URL
// let sfs1 = this.getToken('RequestVerificationToken')

// this.$apiCall.post('/Home/test', { modelx: 'wrwr' }).then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })

// // // 获取远端图片
// // axios({
// //    method:'get',
// //    url:'http://bit.ly/2mTM3nY',
// //    responseType:'stream'
// //  }).then(function(response) {
// //    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
// //  });
// // ----------------client_app------------------------------------------------

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
