import request from '../utils/request'

/**
 * 登录
 * @param {*} data  {username,password}
 */
export const login = (data) => {
  return request({
    url: '/login-inventory',
    method: 'post',
    data: JSON.stringify(data)
  })
}
