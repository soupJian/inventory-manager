import { message } from 'antd'
import { store } from '@/store/store'
import axios from 'axios'

// 创建一个axios实例
const request = axios.create({
  baseURL: process.env.CRM_BASE_URL,
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
    const token = store.getState().user.token || ''
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
    console.log(error)
    // 网络错误
    if (error.code == 'ERR_NETWORK') {
      message.error('ERR_NETWORK')
    } else {
      message.error(error.response.data.message)
    }
    // 网络错误
    return error.response.data
  }
)

export default request
