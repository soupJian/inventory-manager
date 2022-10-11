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
