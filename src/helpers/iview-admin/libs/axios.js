// import Cookies from 'js-cookie'

import axios from 'axios'
// import store from '@/store'
import qs from 'qs'

import { apiCall } from '@/helpers/libs/apiCall.js'

// import { Spin } from 'iview'

// const addErrorLog = errorInfo => {
//   const {
//     statusText,
//     status,
//     request: { responseURL }
//   } = errorInfo
//   let info = { type: 'ajax', code: status, mes: statusText, url: responseURL }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl + 'isms'
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl
      // headers: {
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie, authorizations, x_xsrf_token',
      // 'Access-Control-Allow-Origin': 'http://localhost:8080',
      // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      // 'Access-Control-Max-Age': '86400'
      // }
    }
    return config
  }

 {
  }

 {
  }

 request (options) {
    let instance = axios.create()

    instance.defaults.headers['Authorizations'] = await apiCall.post('/Public/gettoken')
    // options.headers['author_izations'] = await apiCall.post('/Public/gettoken')

    options = Object.assign(this.getInsideConfig(), options)

    this.interceptors(instance, options.url)

    return instance(options)
  }
}
export default HttpRequest
