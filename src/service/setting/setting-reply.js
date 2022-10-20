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
/** 修改 chat */
export const updateChatReply = (info) => {
  return request({
    url: '/chat-reply',
    method: 'PUT',
    data: info
  })
}
/** 删除 chat */
export const deleteChatReply = (id) => {
  return request({
    url: '/chat-reply',
    method: 'DELETE',
    params: {
      id
    }
  })
}
/** 新增 chat */
export const AddChatReply = (info) => {
  return request({
    url: '/chat-reply',
    method: 'POST',
    data: info
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
/** 修改 email */
export const updateEmailReply = (info) => {
  return request({
    url: '/email-reply',
    method: 'PUT',
    data: info
  })
}
/** 删除 chat */
export const deleteEmailReply = (id) => {
  return request({
    url: '/email-reply',
    method: 'DELETE',
    params: {
      id
    }
  })
}
/** 新增 email */
export const AddEmailReply = (info) => {
  return request({
    url: '/email-reply',
    method: 'POST',
    data: info
  })
}
