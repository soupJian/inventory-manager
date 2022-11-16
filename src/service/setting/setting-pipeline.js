import request from '@/utils/request'
/**
 * 获取 sales pipeline
 * @returns
 */
export const getSalesPipeline = () => {
  return request({
    url: '/sales-pipeline'
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
    url: '/sales-pipeline',
    method: 'PUT',
    data: {
      pipelines: list
    }
  })
}

/**
 * 获取所有的supportPipeline
 */
export const getSupportPipeline = () => {
  return request({
    url: '/support-pipeline'
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
    url: '/support-pipeline',
    method: 'PUT',
    data: {
      pipelines: list
    }
  })
}
/**
 * 获取所有的reversePipeline
 */
export const getReplacePipeline = () => {
  return request({
    url: '/replace-pipeline'
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
    url: '/replace-pipeline',
    method: 'PUT',
    data: {
      pipelines: list
    }
  })
}
/**
 * 获取所有的reversePipeline
 */
export const getReturnPipeline = () => {
  return request({
    url: '/return-pipeline'
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
    url: '/return-pipeline',
    method: 'PUT',
    data: {
      pipelines: list
    }
  })
}
/**
 * 获取所有的reversePipeline
 */
export const getReturnReplacePipeline = () => {
  return request({
    url: '/return-replace-pipeline'
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
    url: '/return-replace-pipeline',
    method: 'PUT',
    data: {
      pipelines: list
    }
  })
}
