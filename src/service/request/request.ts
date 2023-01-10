import axios from 'axios'
import { API_BASE_URL, TIME_OUT } from '../config/config'
const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

export default instance
