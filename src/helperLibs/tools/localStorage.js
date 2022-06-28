
export default {
  get (item) {
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

export const TOKEN_KEY = 'WEB.Token'

export const setToken = token => {
  if (window.localStorage) {
    window.localStorage.setItem(TOKEN_KEY, token)
  // window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } else {
    alert('This browser does NOT support localStorage')
  }
}

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY) || ''
}
