import { apiCall } from '@/helperLibs/apiFunc/apiCall.js'
import config from '@/helperLibs/global_conf'

export const loginAPI = ({ userName, password }) => {
  return apiCall.post(config.loginAPI, { userName, password })
}

export const logoutAPI = token => {
  return apiCall.post(config.logoutAPI, { token })
}

export const getUserInfoAPI = token => {
  return apiCall.post(config.UserInfoAPI, { token })
}
