
// 簡單的函式可以直接在main.js裡面直接寫
// 1. 在main.js裡面直接寫函式
// Vue.prototype.changeData = function () {alert('執行成功')};

// 2. 寫一個base.js模組檔案，掛載到main.js上面。
// exports.install = function (Vue, options) {
// Vue.prototype.changeData = function () {
//  alert('執行成功1');
// };

// main.js入口檔案：
// import base from './base'//引用
// Vue.use(base);//將全域性函式當做外掛來進行註冊

// 在<template>用 => <img :src="changeData()">
// 在<script>用 => this.changeData();

// Vue.js的外掛應當有一個公開方法 install。這個方法的第一個引數是 Vue 構造器，第二個引數是一個可選的選項物件。
export default function install (Vue, options) {
  /* 左邊補0 */
  Vue.prototype.padLeft = function (str, len) {
    str = '' + str
    return str.length >= len ? str : new Array(len - str.length + 1).join('0') + str
  }

  /* 右邊補0 */
  Vue.prototype.padRight = function (str, len) {
    str = '' + str
    return str.length >= len ? str : str + new Array(len - str.length + 1).join('0')
  }

  /* 日期格式化 */
  Vue.prototype.dateFormat = function (date = '', seperator = '-') {
    if (date === '') {
      return ''
    } else {
      let datetmp = new Date(date)
      var year = datetmp.getFullYear()
      var month = datetmp.getMonth() + 1
      var strDate = datetmp.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator + month + seperator + strDate
      return currentdate
    }
  }

  // 時間格式化函數，此處僅針對yyyy-MM-dd hh:mm:ss 的格式進行格式化
  Vue.prototype.dateTimeFormat = function (time) {
    if (time == null) {
      return ''
    } else {
      var date = new Date(time)
      var year = date.getFullYear()
      /* 在日期格式中，月份是從0開始的，因此要加0
       * 使用三元表達式在小於10的前面加0，以達到格式統一  如 09:11:05
       * */
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      // 拼接
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    }
  }
}
