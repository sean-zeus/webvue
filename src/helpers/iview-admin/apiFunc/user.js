import axios from '@/libs/api.request'

export const login = ({ userStar, userName, password }) => {
  const data = {
    userStar,
    userName,
    password
  }
  return axios.request({
    url: '/login/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = token => {
  return axios.request({
    url: '/login/get_info',
    // params: {
    //   token
    // },
    data: { token },
    method: 'post'
  })
}

export const logout = token => {
  return axios.request({
    url: '/login/logout',
    data: { token },
    method: 'post'
  })
}
