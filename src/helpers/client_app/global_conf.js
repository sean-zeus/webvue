// 在main.js加入
// import { CONFIG as conf } from './config'
// Vue.prototype.$conf = conf

// 在<template>用 => <img :src="$conf.PHOHO_URL....">
// 在<script>用 => this.$conf.PHOHO_URL

const CONFIG = {
  XSRF_TOKEN: decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1')),

  LOGIN_TOKEN: '123456',

  BASE_URL: 'http://localhost:5000', // window.document.location.origin

  // [API_URL] 全站發 api 的 endpoint
  API_URL: 'http://localhost:5000',

  PHOTO_URL: 'https://static.xxxx.xxx/'
}

export { CONFIG }
