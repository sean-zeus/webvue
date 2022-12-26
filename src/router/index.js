import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers.js'

import store from '@/store'
import { canTurnTo } from '/../ExtenFunc/iview-admin/util'
import { setToken, getToken } from '/../ExtenFunc/tools/localStorage'
import config from '/../ExtenFunc/global_conf.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const LOGIN_PAGE_NAME = config.loginName

const turnTo = (to, access, next) => {
  next()
  // 權限未完成先不判斷權限
  // else if (canTurnTo(to.name, access, routes)) next()
  // // 有權限，可訪問
  // else next({ replace: true, name: 'error_401' }) // 無權限，重定向到error_401頁面
}

router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start()

  const token = getToken()

  if (to.name === 'wreg') {
    next()
  } else if (!token && to.name !== LOGIN_PAGE_NAME) {
    next({ name: LOGIN_PAGE_NAME }) // 未登錄且要跳轉的頁面不是登錄頁，則跳轉到登錄頁
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    next() // // 未登陸且要跳轉的頁面是登錄頁，則跳轉
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next({ name: config.homeName })// 已登錄且要跳轉的頁面是登錄頁，則跳轉到homeName頁
  } else {
    if (store.state.hasGetInfo) {
      turnTo(to, store.state.access, next)
    } else {
      store.dispatch('getUserInfo')
        .then(user => {
          // 拉取用戶信息，通過用戶權限和跳轉的頁面的name來判斷是否有權限訪問;access必須是一個數組，如：['super_admin'] ['super_admin', 'admin']
          turnTo(to, user.access, next)
        })
        .catch(() => {
          setToken('')
          next({ name: 'login' })
        })
    }
  }
})

router.afterEach(to => {
  // iView.LoadingBar.finish()
  window.scrollTo(0, 0) // 捲動網頁捲軸到指定的位置
})

export default router
