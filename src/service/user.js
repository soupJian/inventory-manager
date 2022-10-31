import request from '../utils/request'

/**
 * 登录
 * @param {*} data  {username,password}
 */
export const login = (data) => {
  return request({
    // url: 'https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/login-inventory',
    url: 'https://oypcwmk5j1.execute-api.us-west-2.amazonaws.com/v1/login',
    method: 'post',
    data
  })
}
