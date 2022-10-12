import { message } from 'antd'
import { store } from '../store/store'
import axios from 'axios'
// const baseURL = 'https://oypcwmk5j1.execute-api.us-west-2.amazonaws.com/v1'
const baseURL =
  process.env.NODE_ENV == 'productions'
    ? 'https://oypcwmk5j1.execute-api.us-west-2.amazonaws.com/v1'
    : '/api'
// const token = localStorage.getItem('token')
// 创建一个axios实例
const request = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})
// 请求拦截
request.interceptors.request.use(
  (config) => {
    const token = store.getState().user.accessToken || ''
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 网络错误
    if (error.code == 'ERR_NETWORK') {
      message.error(error.message)
    }
    // 网络错误
    return error.response.data
    // return Promise.reject(error)
  }
)

export default request
