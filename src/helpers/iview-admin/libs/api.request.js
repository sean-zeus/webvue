import HttpRequest from '@/helpers/libs/axios'
import config from '@/helpers/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const axios = new HttpRequest(baseUrl)
export default axios
