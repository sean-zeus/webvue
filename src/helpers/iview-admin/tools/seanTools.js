import config from '@/helpers/config'
const setbaseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
// const setbaseUrl = window.document.location.origin // 域名

/**
 * delay停止幾毫秒
 * @param {Int} interval  ：檔案連結
 */
export const delayTime = (interval) => {
  return new Promise((resolve) => {
    setTimeout(resolve, interval)
  })
}

/**
 * 檔案連結轉檔案流下載--主要針對pdf 解決谷歌瀏覽器a標籤下載pdf直接開啟的問題
 * @param {String} url  ：檔案連結
 * @param {String} fileName  ：下載後產生的文件名;
 * @param {String} type  ：檔案型別 word(docx) excel(xlsx) ppt等;
 * @param {String} token  ：驗證登入的token;
 */
export const fileToBlobDownload = (url, fileName, type, token) => new Promise((resolve, reject) => {
  let xhr = new XMLHttpRequest()
  xhr.open('post', setbaseUrl + '.' + url, true)

  xhr.setRequestHeader('Content-Type', `application/${type}`)
  xhr.setRequestHeader('X_XSRF_TOKEN', token)

  // CORS
  xhr.withCredentials = true // defaul
  xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true')
  xhr.setRequestHeader('Access-Control-Allow-Headers', '*')
  xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  xhr.setRequestHeader('Access-Control-Allow-Methods', '*')

  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (this.status == 200) {
      // let allres = this.getAllResponseHeaders()
      // let filenaem = this.getResponseHeader("content-disposition") //'attachment; filename=MultiplePDFs.zip; filename*=UTF-8''MultiplePDFs.zip'
      // 接受二進位制檔案流
      // const blob = new Blob([this.response], { type: `application/${type}` }) // 將二進制流轉為blob
      var blob = this.response

      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
        window.navigator.msSaveBlob(blob, decodeURI(fileName))
      } else {
        // 創建新的URL並指向File對象或者Blob對象的地址
        const blobObjectURL = window.URL.createObjectURL(blob)
        // 創建a標籤，用於跳轉至下載鏈接
        const tempALink = document.createElement('a')
        tempALink.style.display = 'none'
        tempALink.href = blobObjectURL
        tempALink.setAttribute('download', decodeURI(fileName))
        // 兼容：某些瀏覽器不支持HTML5的download屬性
        if (typeof tempALink.download === 'undefined') {
          tempALink.setAttribute('target', '_blank')
        }
        // 掛載a標籤
        document.body.appendChild(tempALink)
        tempALink.click()
        document.body.removeChild(tempALink)
        // 釋放blob URL地址
        window.URL.revokeObjectURL(blobObjectURL)
      }
      resolve(this.response)
    } else if (this.status == 400) {
      reject(new Error(this.statusText))
    }
  }
  xhr.send()
})

/**
 *讀取載入目標的標韱預覽檔案
 * @param {String} url  ：檔案連結
 * @param {String} addTagName  ：讀取後載入目標的標韱名;
 * @param {String} type  ：檔案型別 word(docx) excel(xlsx) ppt等;
 * @param {String} token  ：驗證登入的token;
 */
export const fileToBlobPreview = (url, addTagName, type, token) => {
  let xhr = new XMLHttpRequest()
  xhr.open('post', setbaseUrl + '.' + url, true)

  xhr.setRequestHeader('Content-Type', `application/${type}`)
  xhr.setRequestHeader('X_XSRF_TOKEN', token)

  // CORS
  xhr.withCredentials = true // defaul
  xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true')
  xhr.setRequestHeader('Access-Control-Allow-Headers', '*')
  xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  xhr.setRequestHeader('Access-Control-Allow-Methods', '*')

  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (this.status == 200) {
      // 接受二進位制檔案流
      // let blob = new Blob([response], { type: 'application/pdf' })
      var blob = this.response

      let objectUrl = URL.createObjectURL(blob)
      let iFrame = document.createElement('iframe')

      iFrame.setAttribute('src', objectUrl)
      iFrame.setAttribute('style', 'width:100%;height:' + (document.body.clientHeight - 100) + 'px;')

      let tagName = document.querySelector('#' + addTagName)
      tagName.innerHTML = '' // clear any existing preview
      tagName.append(iFrame) // must have preview div in HTML
    }
  }
  xhr.send()
}
