import { apiCall } from '@/helpers/apiCall.js'

export const login = ({ userStar, userName, password }) => {
  const data = {
    userStar,
    userName,
    password
  }
  return apiCall.post({
    url: '/login/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = token => {
  return apiCall.post({
    url: '/login/get_info',
    // params: {
    //   token
    // },
    data: { token },
    method: 'post'
  })
}

export const logout = token => {
  return apiCall.post({
    url: '/login/logout',
    data: { token },
    method: 'post'
  })
}
