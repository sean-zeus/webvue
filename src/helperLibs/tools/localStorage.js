
export default {
  fetch (item) {
    return window.localStorage.getItem(item) || ''
    // return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save (value, item) {
    if (window.localStorage) {
      window.localStorage.setItem(item, value)
    // window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } else {
      alert('This browser does NOT support localStorage')
    }
  }
}
