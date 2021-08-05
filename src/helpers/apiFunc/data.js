import { apiCall } from '@/helpers/apiCall.js'

export const getTableData = () => {
  return apiCall.fetch({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return apiCall.fetch({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return apiCall.post({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return apiCall.post({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}
