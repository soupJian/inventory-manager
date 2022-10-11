import request from '../utils/request'
/**
 * 获取所有的user
 * @returns
 */
export const getAllUser = () => {
  return request({
    url: '/users'
  })
}
/**
 * 获取所有的access
 * @returns
 */
export const getAllAccess = () => {
  return request({
    url: '/accesses'
  })
}
/**
 * 更新user
 * @param {*} user
 * @returns
 */
export const updateUser = (user) => {
  return request({
    url: '/user',
    method: 'post',
    data: {
      user
    }
  })
}
export const putCreateUser = (user) => {
  return request({
    url: '/user',
    method: 'put',
    data: {
      ...user
    }
  })
}
