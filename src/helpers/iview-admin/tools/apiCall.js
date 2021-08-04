// import Cookies from 'js-cookie'

import axios from 'axios'
import qs from 'qs'
import config from '@/helpers/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
axios.defaults.timeout = 7000
// axios.defaults.baseURL = window.document.location.origin // 域名
axios.defaults.baseURL = baseUrl

// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN // 设置请求头为 Authorization
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"

// http request 欄截
axios.interceptors.request.use(
  config => {
    // 用來判斷是否為 跨域存取 (cross-site Access-Control requests)
    // 等同 Access-Control-Allow-Credentials 表頭
    // 用來解決 CORS 如果沒有cors的問題則可以都不加

    // net core 搞好可以不加才拿掉
    // config.withCredentials = true// defaul
    // config.headers['Access-Control-Allow-Credentials'] = 'true'
    // config.headers['Access-Control-Allow-Headers'] = '*'
    // config.headers['Access-Control-Allow-Origin'] = 'http://localhost:7628'
    // config.headers['Access-Control-Allow-Methods'] = '*'

    // config.headers['author_izations'] = '?????'

    config.data = qs.stringify(config.data)
    // config.data = JSON.stringify(config.data)

    // Object.assign(config.data, { X_XSRF_TOKEN: Cookies.get('XSRF_TOKEN') })
    // Object.assign(config.data, { X_XSRF_TOKEN: localStorage.RequestVerificationToken })

    // config.headers['X_XSRF_TOKEN'] = Cookies.get('XSRF_TOKEN')
    if (localStorage.RequestVerificationToken) {
      // 存在將RequestVerificationToken寫入 request header
      config.headers['X_XSRF_TOKEN'] = localStorage.RequestVerificationToken
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 攔截器
axios.interceptors.response.use(
  response => {
    switch (response) {
      case 302: // Found
        // 如果后台返回302，需要跳转到首页，让用户登录
        // window.location.href = dataAxios.URL
        // 需要重新登录

        response = '未授權，請登錄'
        if (window.location.pathname !== '/login') {
          window.location.href = window.location.origin + '/api/login'
        }

        break
      default:
        // return Promise.reject(dataAxios)
        return response
    }
  },
  error => {
    // Form登入用的[.AspNetcore.Cookies]過期登出
    if (error.message === 'Network Error') {
      error.message = '未授權，請登錄'
      if (window.location.pathname !== '/login') {
        window.location.href = window.location.origin + '/api/login'
      }
    }
    // 異常處理
    if (error && error.response) {
      switch (error.response.status) {
        case 302: // Found
          error.message = '未授權，請登錄'
          if (window.location.pathname !== '/login') {
            window.location.href = window.location.origin + '/api/login'
          }
          break
        case 400:
          error.message = '請求錯誤'
          break
        case 401:
          // 登入授權處理
          // 返回 401 清除token資訊並跳轉到登入頁面
          // store.commit(types.LOGOUT)
          // router.replace({
          //   path: 'login',
          //   query: { redirect: router.currentRoute.fullPath }
          // })

          error.message = '未授權，請登錄'
          if (window.location.pathname !== '/login') {
            window.location.href = window.location.origin + '/api/login'
          }
          break
        case 403:
          error.message = '拒絕訪問'
          break
        case 404:
          error.message = `請求地址不存在: ${error.response.config.url}`
          break
        case 408:
          error.message = '請求超時'
          break
        case 500:
          error.message = '服務器內部錯誤'
          break
        case 501:
          error.message = '服務未實現'
          break
        case 502:
          error.message = '連線錯誤'
          break
        case 503:
          error.message = '服務不可用'
          break
        case 504:
          error.message = '連線超時'
          break
        case 505:
          break
        default:
          error.message = `連接錯誤${error.response.status}`
          break
      }
    }
    console.log(error.message)
    return Promise.reject(error)

    // //原來的寫法
    // if (error && error.response) {
    //    switch (error.response.status) {
    //       case 400:
    //          console.log('資料驗證錯誤')
    //          break
    //       case 404:
    //          console.log('找不到該頁面')
    //          break
    //       case 500:
    //          console.log('伺服器出錯')
    //          break
    //       case 503:
    //          console.log('服務失效')
    //          break
    //       default:
    //          console.log(`連接錯誤${error.response.status}`)
    //    }
    // } else {
    //    console.log('連接到服務器失敗')
    // }
    // return Promise.resolve(error.response)
  }
)

function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get('/api' + url, {
        params: params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post('/api' + url, data).then(
      response => {
        if (response.status === 400) {
          // bus.$emit('modelError', x.response.data.modelState);
          alert(JSON.stringify(response.data))
          // resolve(response.data);
        } else {
          resolve(response.data)
        }
      },
      err => {
        reject(err)
      }
    )
  })
}

function remove (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete('/api' + url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put('/api' + url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

// 將封裝的方法打包起來
export const apiCall = {
  fetch: async function (url, paramObj, token = '') {
    // axios.defaults.headers['RequestVerificationToken'] = token
    // axios.defaults.headers['Authorizations'] = await post('/Public/gettoken')
    return fetch(url, paramObj)
  },
  post: async function (url, paramObj, token = '') {
    // axios.defaults.headers['RequestVerificationToken'] = token
    axios.defaults.headers['Authorizations'] = await post('/Public/gettoken')
    return post(url, paramObj)
  },
  put: async function (url, paramObj, token = '') {
    // axios.defaults.headers['RequestVerificationToken'] = token
    axios.defaults.headers['Authorizations'] = await post('/Public/gettoken')
    return put(url, paramObj)
  },
  delete: async function (url, paramObj, token = '') {
    // axios.defaults.headers['RequestVerificationToken'] = token
    axios.defaults.headers['Authorizations'] = await post('/Public/gettoken')
    return remove(url, paramObj)
  }
}
