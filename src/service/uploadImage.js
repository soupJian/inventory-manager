import axios from 'axios'

/**
 * 登录
 * @param {*} data  {username,password}
 */
export const uploadImage = (url, file) => {
  return axios({
    url: process.env.IMG_UPLOAD_URL + url,
    method: 'PUT',
    data: file,
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': file.type
    }
  })
}
