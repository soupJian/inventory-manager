import request from '../utils/request'

// const base_img_url = 'https://westshade-erp.s3.us-west-2.amazonaws.com'
const base_img_url = 'https://westshade-erp.s3.us-west-2.amazonaws.com'
/**
 * 登录
 * @param {*} data  {username,password}
 */
export const uploadImage = (url, file) => {
  return request({
    url: `${base_img_url}${url}`,
    method: 'PUT',
    data: file,
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': file.type
    }
  })
}
