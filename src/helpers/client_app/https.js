'use strict'

import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:5000' // 域名

axios.interceptors.request.use(
  config => {
    // 這裡的config包含每次請求的內容
    // 判斷localStorage中是否存在api_token
    if (localStorage.getItem('api_token')) {
      //  存在將api_token寫入 request header
      config.headers.apiToken = `${localStorage.getItem('api_token')}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

function checkStatus (response) {
  // 如果http狀態碼正常，則直接返回資料
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
  }
  // 異常狀態下，把錯誤資訊返回去
  return {
    status: -404,
    msg: '網路異常'
  }
}

function checkCode (res) {
  // 如果code異常(這裡已經包括網路錯誤，伺服器錯誤，後端丟擲的錯誤)，可以彈出一個錯誤提示，告訴使用者
  if (res.status === -404) {
    alert(res.msg)
  }
  if (res.data && !res.data.success) {
    // alert(res.data.error_msg)
  }
  return res
}
// 請求方式的配置
export default {
  async post (url, data) {
    return axios({
      method: 'post',
      baseURL: '/backapis',
      url,
      data: qs.stringify(data),
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  async get (url, params) {
    // get
    return axios({
      method: 'get',
      baseURL: '/backapis',
      url,
      params, // get 請求時帶的引數
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  }
}
