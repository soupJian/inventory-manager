import request from '../utils/request'
/**
 * 获取 assets 中的 contact
 * @returns
 */
export const getContacts = () => {
  return request({
    url: '/contacts'
  })
}
