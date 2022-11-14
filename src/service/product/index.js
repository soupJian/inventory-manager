import request from '../../utils/request'
/**
 * 获取所有的 inventory 的 SKU
 */
export const getAllProducts = (params) => {
  return request({
    url: `${process.env.BASE_URL}/all-products-inventory`,
    params
  })
}
/**
 * 根据 传递的 多个 SKU 获取 对应的 product
 */
export const getMultipleProducts = (params) => {
  return request({
    url: `${process.env.BASE_URL}/products-skus`,
    params
  })
}
/**
 * 查询 单个 product
 */
export const getProduct = (params) => {
  return request({
    url: `${process.env.BASE_URL}/product-inventory`,
    params
  })
}
/**
 * 更新 product 或者新增 product type区分 crete 和 update
 */
export const updateProduct = (type, data) => {
  return request({
    url: `${process.env.BASE_URL}/product-inventory`,
    method: 'PUT',
    data,
    params: {
      type
    }
  })
}
/**
 * 删除 product
 */
export const deleteProduct = (sku) => {
  return request({
    url: `${process.env.BASE_URL}/product-inventory?sku=${sku}`,
    method: 'DELETE'
  })
}
