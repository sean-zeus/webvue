export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到兩個數組的交集, 兩個數組的元素為數值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到兩個數組的並集, 兩個數組的元素為數值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目標數組
 * @param {Array} arr 需要查詢的數組
 * @description 判斷要查詢的數組是否至少有一個元素包含在目標數組中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要驗證的字符串或數值
 * @param {*} validList 用來驗證的列表
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @param {Number} timeStamp 判斷時間戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 傳入的時間戳
 * @param {Number} currentTime 當前時間時間戳
 * @returns {Boolean} 傳入的時間戳是否早於當前時間戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num 數值
 * @returns {String} 處理後的字符串
 * @description 如果傳入的數值小於10，即位數只有1位，則在前面補充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 傳入的時間戳
 * @param {Number} startType 要返回的時間字符串的格式類型，傳入'year'則返回年開頭的完整時間
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * @param {String|Number} timeStamp 時間戳
 * @returns {String} 相對時間字符串
 */
export const getRelativeTime = timeStamp => {
  // 判斷當前傳入的時間戳是秒格式還是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式則轉為秒格式
  if (IS_MILLISECOND) Math.floor((timeStamp /= 1000))
  // 傳入的時間戳可以是數值或字符串類型，這裡統一轉為數值類型
  timeStamp = Number(timeStamp)
  // 獲取當前時間時間戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  // 判斷傳入時間戳是否早於當前時間戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 獲取兩個時間戳差值
  let diff = currentTime - timeStamp
  // 如果IS_EARLY為false則差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? '前' : '後'
  // 少於等於59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr
  // 多於59秒，少於等於59分鐘59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分鐘' + dirStr
  // 多於59分鐘59秒，少於等於23小時59分鐘59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小時' + dirStr
  // 多於23小時59分鐘59秒，少於等於29天59分鐘59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
  // 多於29天59分鐘59秒，少於364天23小時59分鐘59秒，且傳入的時間戳早於當前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
  else resStr = getDate(timeStamp, 'year')
  return resStr
}

/**
 * @returns {String} 當前瀏覽器名稱
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = exp => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 綁定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解綁事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 判斷一個對象是否存在key，如果傳入第二個參數key，則是判斷這個obj對象是否存在key這個屬性
 * 如果沒有傳入key這個參數，則判斷obj對象是否有鍵值對
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj
  else {
    let keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @param {*} obj1 對象
 * @param {*} obj2 對象
 * @description 判斷兩個對象是否相等，這兩個對象的值只能是數字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */ else return !keysArr1.some(key => obj1[key] !== obj2[key])
}
