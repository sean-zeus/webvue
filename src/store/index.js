import Vue from 'vue'
import Vuex from 'vuex'

import { loginAPI, logoutAPI, getUserInfoAPI } from '/../ExtenFunc/apiFunc/user.js'
import { setToken, getToken } from '/../ExtenFunc/tools/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userName: 'super_admin',
    // userId: '1',
    // avatorImgPath: 'userico/Basic_UI_Elements_2.4_-_Flat_Style_-_36-06-128.png',
    // token: getToken(),
    // access: ['super_admin', 'admin'],
    // hasGetInfo: true    userName: 'super_admin',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    ProjectId: 0
  },
  mutations: {
    setAvator(state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登錄
    handleLogin({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        loginAPI({
          userName,
          password
        })
          .then(res => {
            commit('setToken', res.token)
            resolve(res.message)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 退出登錄
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logoutAPI(state.token)
          .then(() => {
            commit('setToken', '')
            commit('setAccess', [])
            resolve()
          })
          .catch(err => {
            reject(err)
          })
        // 如果你的退出登錄無需請求接口，則可以直接使用下面三行代碼而無需使用logout調用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 獲取用戶相關信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfoAPI(state.token)
            .then(res => {
              // commit('setAvator', res.avator)
              commit('setUserName', res.name)
              commit('setUserId', res.user_id)
              commit('setAccess', res.access)
              commit('setHasGetInfo', res.hasGetInfo)
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  modules: {
  }
})
