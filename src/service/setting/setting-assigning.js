import request from '@/utils/request'
/**
 * 获取当前inquiry settings
 * @returns
 */
export const getInquirySetting = () => {
  return request({
    url: '/inquiry-settings'
  })
}
/**
 * 修改
 * @returns
 */
export const updateInquirySetting = (data) => {
  return request({
    url: '/inquiry-settings',
    method: 'PUT',
    data
  })
}
/**
 * 获取所有的客服列表
 * @returns
 */
export const getRepresentatives = () => {
  return request({
    url: '/representatives'
  })
}
