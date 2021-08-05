import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers.js'

import store from '@/store'
import { setToken, getToken, canTurnTo } from '@/helpers/iview-admin/libs/util'
import config from '@/helpers/global_conf.js'
const { homeName } = config

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const LOGIN_PAGE_NAME = 'Login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next()
  // 有權限，可訪問
  else next({ replace: true, name: 'error_401' }) // 無權限，重定向到401頁面
}

router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start()

  // const token = getToken()
  const token = null // 暫時先給null

  if (to.name === 'wreg') {
    next()
  } else if (to.name === 'mreg') {
    next()
  } else if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登錄且要跳轉的頁面不是登錄頁
    next({
      name: LOGIN_PAGE_NAME // 跳轉到登錄頁
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陸且要跳轉的頁面是登錄頁
    next() // 跳轉
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登錄且要跳轉的頁面是登錄頁
    next({
      name: homeName // 跳轉到homeName頁
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store
        .dispatch('getUserInfo')
        .then(user => {
          // 拉取用戶信息，通過用戶權限和跳轉的頁面的name來判斷是否有權限訪問;access必須是一個數組，如：['super_admin'] ['super_admin', 'admin']
          turnTo(to, user.access, next)
        })
        .catch(() => {
          setToken('')
          next({
            name: 'login'
          })
        })
    }
  }
})

router.afterEach(to => {
  // iView.LoadingBar.finish()
  window.scrollTo(0, 0) // 捲動網頁捲軸到指定的位置
})

export default router
