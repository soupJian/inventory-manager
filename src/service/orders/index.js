import request from "@/utils/request"
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
 * 获取所有的 current-orders
 */
export const getAllCurrentOrders = (params) => {
  return request({
    url: `/current-orders`,
    params
  })
}
/**
 * 获取所有的 orders-history
 */
export const getAllOrderHistory = (params) => {
  return request({
    url: `/order-history`,
    params
  })
}
/**
 * 获取所有的 shipping-orders
 */
export const getAllShippingOrders = (params) => {
  return request({
    url: `/shipping-orders`,
    params
  })
}
/**
 * 获取所有的 shipping-histtory
 */
export const getAllShippingHistory = (params) => {
  return request({
    url: `/shipping-history`,
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
/**
 * 修改订单信息内容
 */
export const updateOrder = (order) => {
  return request({
    url: "/order",
    method: "PUT",
    data: order
  })
}

/**
 * 修改订单信息内容
 */
export const deleteOrder = (id) => {
  return request({
    url: "/order",
    method: "DELETE",
    params: {
      id
    }
  })
}
