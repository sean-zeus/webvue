const STORAGE_KEY = 'RequestVerificationToken'

export default {
  fetch (item = STORAGE_KEY) {
    return window.localStorage.getItem(item) || ''
    // return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save (value, item = STORAGE_KEY) {
    window.localStorage.setItem(STORAGE_KEY, value)
    // window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}

// // 在公用base.js中，設定localstorage方法，之後可以通過this.方法呼叫
// Vue.prototype.setToken = function(tokenName, tokenValue) {
//    if (window.localStorage) {
//      localStorage.setItem(tokenName, tokenValue)
//    } else {
//      alert('This browser does NOT support localStorage')
//    }
//  }
//  Vue.prototype.getToken = function(name) {
//    var token = localStorage.getItem(name)
//    if (token) {
//      return token
//    } else {
//      return ''
//    }
//  }
