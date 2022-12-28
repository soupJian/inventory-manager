import request from "@/utils/request"
/**
 * 获取 email列表
 */
export const getEmailList = (params) => {
  return request({
    url: `/incoming-emails`,
    params
  })
}

export const getSearchEmail = (params) => {
  return request({
    url: `/search-incoming-emails`,
    params
  })
}
