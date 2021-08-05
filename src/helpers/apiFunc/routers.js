import { apiCall } from '@/helpers/apiCall.js'

export const getRouterReq = (access) => {
  return apiCall.fetch({
    url: 'get_router',
    params: {
      access
    },
    method: 'get'
  })
}
