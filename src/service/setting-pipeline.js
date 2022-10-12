import request from '../utils/request'
/**
 * 获取 sales pipeline
 * @returns
 */
export const getSalesPipeline = () => {
  return request({
    url: '/sales-pipelines'
  })
}
/**
 * 更新所有的 salespipeline
 * 更新一个或者插入一个直接全部更新
 * @param {*} list
 * @returns
 */
export const postSalesPipeline = (list) => {
  return request({
    url: '/sales-pipelines',
    method: 'POST',
    data: list
  })
}

/**
 * 获取所有的supportPipeline
 */
export const getSupportPipeline = () => {
  return request({
    url: '/support-pipelines'
  })
}
/**
 * 更新所有的 supportPipeline
 * 更新一个或者插入一个直接全部更新
 * @param {*} list
 * @returns
 */
export const postSupportPipeline = (list) => {
  return request({
    url: '/support-pipelines',
    method: 'POST',
    data: list
  })
}
/**
 * 获取所有的reversePipeline
 */
export const getReplacePipeline = () => {
  return request({
    url: '/replace-pipelines'
  })
}
/**
 * 更新所有的 supportPipeline
 * 更新一个或者插入一个直接全部更新
 * @param {*} list
 * @returns
 */
export const postReplacePipeline = (list) => {
  return request({
    url: '/replace-pipelines',
    method: 'POST',
    data: list
  })
}
/**
 * 获取所有的reversePipeline
 */
export const getReturnPipeline = () => {
  return request({
    url: '/return-pipelines'
  })
}
/**
 * 更新所有的 supportPipeline
 * 更新一个或者插入一个直接全部更新
 * @param {*} list
 * @returns
 */
export const postReturnPipeline = (list) => {
  return request({
    url: '/return-pipelines',
    method: 'POST',
    data: list
  })
}
/**
 * 获取所有的reversePipeline
 */
export const getReturnReplacePipeline = () => {
  return request({
    url: '/returnReplace-pipelines'
  })
}
/**
 * 更新所有的 supportPipeline
 * 更新一个或者插入一个直接全部更新
 * @param {*} list
 * @returns
 */
export const postReturnReplacePipeline = (list) => {
  return request({
    url: '/returnReplace-pipelines',
    method: 'POST',
    data: list
  })
}
