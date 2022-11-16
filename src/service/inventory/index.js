import request from '@/utils/request'
/**
 * 获取所有的 inventory 的 SKU
 */
export const getAllInventory = (params) => {
  return request({
    url: `${process.env.BASE_URL}/all-inventory`,
    params
  })
}
/**
 * 根据 传递的 多个 SKU 获取 对应的 Inventory
 */
export const getMultipleInventory = (params) => {
  return request({
    url: `${process.env.BASE_URL}/inventory-skus`,
    params
  })
}
/**
 * 查询 单个 Inventory
 */
export const getInventory = (params) => {
  return request({
    url: `${process.env.BASE_URL}/inventory`,
    params
  })
}
/**
 * 获取所有 已经入库 settled 商品
 */
export const getSettledInventory = (params) => {
  return request({
    url: `${process.env.BASE_URL}/settled-inventory`,
    params
  })
}
/**
 * 获取所有 已经入库 没有 not settled 商品
 */
export const getUnsettledInventory = (params) => {
  return request({
    url: `${process.env.BASE_URL}/unsettled-inventory`,
    params
  })
}
/**
 * 更新 inventory 或者新增 inventory
 * type 区分 create 和 update
 */
export const updateInventory = (type, data) => {
  return request({
    url: `${process.env.BASE_URL}/inventory`,
    method: 'PUT',
    data,
    params: {
      type
    }
  })
}
/**
 * 删除 inventory
 */
export const deleteInventory = (sku) => {
  return request({
    url: `${process.env.BASE_URL}/inventorysku=${sku}`,
    method: 'DELETE'
  })
}
