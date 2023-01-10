// 区分环境变量一
// export const API_BASE_URL = 'http://AIX/org/dev'
// export const API_BASE_URL = 'http://AIX/org/prod'

// 区分环境变量二
// let baseURL = ''
// if (import.meta.env.DEV) {
//   baseURL = 'http://AIX/org/dev'
// } else {
//   baseURL = 'http://AIX/org/prod'
// }
// export const API_BASE_URL = baseURL
// console.log(import.meta.env, baseURL)

// 区分环境变量三
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const TIME_OUT = 10000
