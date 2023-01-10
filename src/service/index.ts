import Request from './request'
import { API_BASE_URL, TIME_OUT } from './config/config'

const request = new Request({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT
})

export default request
