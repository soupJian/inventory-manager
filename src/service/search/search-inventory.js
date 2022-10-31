import request from '../../utils/request'
/**
 * 获取 assets 中的 contact
 * @returns
 */
export const getSearch = (params) => {
  return request({
    url: `${process.env.BASE_URL}/v1/search-inventory`,
    params
  })
}
