import axios from 'axios'
import qs from 'qs'
import config from '@/helperLibs/global_conf'

const baseUrl = process.env.NODE_ENV === 'development' ? config.apiUrl.dev : config.apiUrl.pro
axios.defaults.baseURL = baseUrl
axios.defaults.timeout = 7000

// 用來解決 CORS 如果沒有cors的問題則可以都不加
// config.withCredentials = true// defaul
// config.headers.common['Access-Control-Allow-Credentials'] = 'true'
// config.headers.common['Access-Control-Allow-Headers'] = '*'
// config.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:7628'
// config.headers.common['Access-Control-Allow-Methods'] = '*'

// 判斷localStorage中是否存在WEB.XCSRF
if (localStorage['WEB.XCSRF']) {
  axios.defaults.headers.common['WEB.XCSRF'] = localStorage.getItem('WEB.XCSRF') || ''
}

axios.interceptors.request.use(// request 欄截
  // 這裡的config包含每次請求的內容
  config => {
    // config.data不為空且application/x-www-form-urlencoded才需要編碼
    if (Object.keys(config.data).length !== 0 && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data) // qs.parse()将URL解析成对象的形式、qs.stringify()編碼成UrlQuery
      // config.data = JSON.stringify(config.data)// 編碼成Json
    }

    if (localStorage['WEB.Token']) {
      axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('WEB.Token') || ''}`
    }

    // 送出過程中在data在加入物件資料的寫法
    // Object.assign(config.data, { 'sfsfsaf': 'sfsfs'})
    return config
  }
)

function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function post (url, data = {}, ContentType = 'form') {
  return new Promise((resolve, reject) => {
    ContentType = ContentType === 'form' ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8'
    axios.post(url, data, { headers: { 'Content-Type': ContentType } })
      .then(response => {
        if (response.status === 400) {
        // bus.$emit('modelError', x.response.data.modelState);
          alert(JSON.stringify(response.data))
        // resolve(response.data);
        } else {
          resolve(response.data)
        }
      }, err => {
        reject(err)
      })
  })
}

function remove (url, data = {}, ContentType = 'form') {
  return new Promise((resolve, reject) => {
    ContentType = ContentType === 'form' ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8'
    axios.delete(url, data, { headers: { 'Content-Type': ContentType } })
      .then(response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      })
  })
}

function put (url, data = {}, ContentType = 'form') {
  return new Promise((resolve, reject) => {
    ContentType = ContentType === 'form' ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8'
    axios.put(url, data, { headers: { 'Content-Type': ContentType } })
      .then(response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      })
  })
}

// 將封裝的方法打包起來
export const apiCall = {
  fetch: async function (url, paramObj) {
    axios.defaults.headers['AuthTimeStamp'] = await post('/Public/GetTimeStamp')
    return fetch(url, paramObj)
  },
  post: async function (url, paramObj, ContentType = 'form') {
    axios.defaults.headers['AuthTimeStamp'] = await post('/Public/GetTimeStamp')
    return post(url, paramObj, ContentType)
  },
  put: async function (url, paramObj, ContentType = 'form') {
    axios.defaults.headers['AuthTimeStamp'] = await post('/Public/GetTimeStamp')
    return put(url, paramObj, ContentType)
  },
  delete: async function (url, paramObj, ContentType = 'form') {
    axios.defaults.headers['AuthTimeStamp'] = await post('/Public/GetTimeStamp')
    return remove(url, paramObj, ContentType)
  }
}
