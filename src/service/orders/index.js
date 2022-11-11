import request from '../../utils/request'
/**
 * 获取所有的 orders
 */
export const getAllOrders = (params) => {
  return request({
    url: `/orders`,
    params
  })
}
/**
 * 获取单个 order 的 信息
 */

export const getOrder = (id) => {
  return request({
    url: `/order`,
    params: {
      id
    }
  })
}
