import request from '../../utils/request'
/**
 * 获取 assets 中的 contact
 * @returns
 */
export const getContacts = (search) => {
  return request({
    url: `https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/search-product?search=${search}`
  })
}
