import request from '../../utils/request'
/**
 * 获取 所有 shipped 的订单
 */
export const getShippedOrders = (params) => {
  return request({
    url: `${process.env.BASE_URL}/shipped-orders`,
    params
  })
}

/**
 * 获取所有 not shipped 的订单
 */
export const getUnShippedOrders = (params) => {
  return request({
    url: `${process.env.BASE_URL}/not-shipped-orders`,
    params
  })
}

/**
 *
 */
export const syncOrdersInventory = (params) => {
  return request({
    url: `${process.env.BASE_URL}/sync-orders-inventory`,
    params
  })
}
