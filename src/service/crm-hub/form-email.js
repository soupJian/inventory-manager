import request from "@/utils/request"
/**
 * 获取 email列表
 */
export const getEmailList = (params) => {
  if (params.genre == "") {
    delete params.genre
  }
  if (params.search == "") {
    delete params.search
  }
  return request({
    url: `/incoming-emails`,
    params
  })
}
/**
 * 删除 email
 * @param {*} id
 * @returns
 */
export const deleteEmail = (id) => {
  return request({
    url: `/email`,
    params: {
      id
    },
    method: "DELETE"
  })
}
