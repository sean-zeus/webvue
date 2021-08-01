// Vue.js的外掛應當有一個公開方法 install。這個方法的第一個引數是 Vue 構造器，第二個引數是一個可選的選項物件。
exports.install = function (Vue, options) {
  Vue.prototype.setToken = function (tokenName, tokenValue) {
    if (window.localStorage) {
      localStorage.setItem(tokenName, tokenValue)
    } else {
      alert('This browser does NOT support localStorage')
    }
  }
  Vue.prototype.getToken = function (name) {
    var token = localStorage.getItem(name)
    if (token) {
      return token
    } else {
      return ''
    }
  }
}

// // 1. 在main.js裡面直接寫函式
// // 簡單的函式可以直接在main.js裡面直接寫
// Vue.prototype.changeData = function (){//changeData是函式名
// alert('執行成功');
// }
// // 元件中呼叫：
// this.changeData();//直接通過this執行函式

// // 2. 寫一個模組檔案，掛載到main.js上面。
// // base.js檔案，檔案位置可以放在跟main.js同一級，方便引用
// exports.install = function (Vue, options) {
// Vue.prototype.text1 = function (){//全域性函式1
// alert('執行成功1');
//    };
//    Vue.prototype.text2 = function (){//全域性函式2
//    alert('執行成功2');
//    };
// };

// // main.js入口檔案：
// import base from './base'//引用
// Vue.use(base);//將全域性函式當做外掛來進行註冊

// // 元件裡面呼叫：
// this.text1();
// this.text2();
