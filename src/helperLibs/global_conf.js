// 在main.js加入
// import { CONFIG as conf } from './config'
// Vue.prototype.$conf = conf

// 在<template>用 => <img :src="$conf.PHOHO_URL....">
// 在<script>用 => this.$conf.PHOHO_URL

export default {
  cookieExpires: 1, // token在Cookie中存儲的天數，默認1天
  useI18n: false, // 是否使用國際化，默認為false，如果不使用，則需要在路由中給需要在菜單中展示的路由設置meta: {title: 'xxx'},用來在菜單中顯示文字s
  webUrl: {
    // 網頁基礎路徑
    dev: window.document.location.origin,
    pro: window.document.location.origin
  },
  apiUrl: {
    // api請求基礎路徑
    dev: 'https://localhost:44310/api/',
    pro: 'https://localhost:44310/api/'
  },
  imgURL: {
    // api請求基礎路徑
    dev: 'https://static.xxxx.xxx/',
    pro: 'https://static.xxxx.xxx/'
  },
  homeName: 'Home', // 默認打開的首頁的路由name值，默認為home
  loginName: 'Login', // 默認打開的登入頁的路由name值，默認為login
  loginAPI: '/JwtAuth/SignIn', // 默認登入API路徑，默認為/login/login
  logoutAPI: '/JwtAuth/logout', // 默認登入API路徑，默認為/login/logout
  UserInfoAPI: '/JwtAuth/GetUserInfo', // 默認登入API路徑，默認為/login/GetUserInfo
  plugin: {
    // 需要加載的插件
    'error-store': {
      showInHeader: true, // 設為false後不會在頂部顯示錯誤日誌徽標
      developmentOff: false // 設為true後在開發環境不會收集錯誤信息，方便開發中排查錯誤
    }
  },
  updateDocsPath: '' + '/docsManage/Update_Docs',
  downLoadDocsPath: '' + '/DocsManage/Download_Docs/',
  sysHeighx: document.body.clientHeight,
  paraSetTypeList: [
    // {
    //   value: '全部',
    //   label: '全部'
    // },
    {
      value: '資產大小類別',
      label: '資產大小類別'
    },
    {
      value: '資產編碼原則',
      label: '資產編碼原則'
    },
    {
      value: '資產價值評估項',
      label: '資產價值評估項'
    },
    {
      value: '資產價值統計式',
      label: '資產價值統計式'
    },
    {
      value: '文件管理',
      label: '文件管理'
    },
    {
      value: '風險評估項',
      label: '風險評估項'
    },
    {
      value: '資通管理系統',
      label: '資通管理系統'
    }
  ]
}
