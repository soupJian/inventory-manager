import request from '../../utils/request'
/**
 * 获取所有的 聊天快速回复
 * @returns
 */
export const getAllChatReply = () => {
  return request({
    url: '/chat-replies'
  })
}
/**
 * 获取所有的 聊天快速回复
 * @returns
 */
export const getAllEmailReply = () => {
  return request({
    url: '/emal-replies'
  })
}
