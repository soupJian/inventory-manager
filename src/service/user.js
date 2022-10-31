import request from '../utils/request'

/**
 * 登录
 * @param {*} data  {username,password}
 */
export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
/**
 * 用户 历史操作信息
 */
export const getHistory = (params) => {
  return request({
    url: params
      ? `${process.env.BASE_URL}/history?${params}`
      : `${process.env.BASE_URL}/history`
  })
}
