import request from '../../utils/request'
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
 * 更新user
 * @param {*} user
 * @returns
 */
export const updateUser = (user) => {
  return request({
    url: '/user',
    method: 'put',
    data: user
  })
}
/**
 * 创建一个user
 */
export const postCreateUser = (user) => {
  return request({
    url: '/user',
    method: 'post',
    data: user
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
 * @param {*} access
 * @returns
 */
export const updateAccess = (access) => {
  return request({
    url: '/access',
    method: 'put',
    data: access
  })
}
/**
 * 创建一个access
 */
export const postCreateAccess = (access) => {
  return request({
    url: '/access',
    method: 'post',
    data: access
  })
}
