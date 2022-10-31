import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Collapse, Button, Row, Col, Space, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Icon } from '../../../components/commons'
import styles from './index.module.scss'
import EditFastReply from './components/edit-fast-reply'
import CreateFastReply from './components/create-fast-reply'
import {
  getAllChatReply,
  getAllEmailReply,
  updateChatReply,
  updateEmailReply,
  deleteChatReply,
  deleteEmailReply
} from '../../../service/setting/setting-reply'
import { toggleLoading } from '../../../store/slices/globalSlice'
import { uploadImage } from '../../../service/uploadImage'

const { Panel } = Collapse

const Reply = () => {
  const dispatch = useDispatch()
  // chat 回复信息列表
  const [chatList, setChatList] = useState([])
  // email 回复信息列表
  const [emailList, setEmailList] = useState([])
  // edit弹窗
  const [showEdit, setShowEdit] = useState(false)
  const [editType, setEditType] = useState('chat')
  // 当前编辑的信息
  const [editCurrent, setEditCurrent] = useState(null)
  // create fast reply
  const [showFastReply, setShowFastReply] = useState(false)
  // delete modal
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    type: 'chat',
    item: null
  })
  // 获取 chat快速回复列表
  const getChatList = async () => {
    const res = await getAllChatReply()
    if (res && res.Items) {
      setChatList(res.Items)
    }
    return res
  }
  // 获取邮件快速回复列表
  const getEmailList = async () => {
    const res = await getAllEmailReply()
    if (res && res.Items) {
      setEmailList(res.Items)
    }
    return res
  }
  // 展示 edit chat 弹窗
  const showEditModal = (item, type) => {
    // type ---> chat email
    setEditType(type)
    setShowEdit(true)
    setEditCurrent(item)
  }
  // 编辑 chat 的 提交按钮
  const saveEdit = async (info, editType) => {
    dispatch(toggleLoading(true))
    if (editType == 'chat') {
      const res = await updateChatReply(info)
      if (res && res.message == 'success') {
        setShowEdit(false)
        await getChatList()
        dispatch(toggleLoading(false))
      }
    } else {
      const res = await Promise.all(
        info.files.map(async (item) => {
          if (!item.isNewFile) {
            return {
              fileName: item.fileName,
              url: item.url
            }
          } else {
            const url = `/reply-file/${item.uid}-${item.fileName}`
            await uploadImage(url, item.originFileObj)
            return {
              fileName: item.fileName,
              url: url
            }
          }
        })
      )
      const result = await updateEmailReply({
        ...info,
        files: res
      })
      if (result && result.message == 'success') {
        setShowEdit(false)
        await getEmailList()
        dispatch(toggleLoading(false))
      }
    }
  }
  const updateData = (type) => {
    dispatch(toggleLoading(true))
    if (type == 'chat') {
      getChatList().then(() => {
        dispatch(toggleLoading(false))
      })
    } else {
      getEmailList().then(() => {
        dispatch(toggleLoading(false))
      })
    }

    setShowFastReply(false)
  }
  // 打开新窗口
  const openNewWindow = (url) => {
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('target', '_blank')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link) //下载完成移除元素
  }
  // delete a item
  const handleDeleteReply = async () => {
    dispatch(toggleLoading(true))
    if (deleteModal.type == 'chat') {
      await deleteChatReply(deleteModal.item.id)
      await getChatList()
      setDeleteModal({
        type: '',
        show: false,
        item: null
      })
      dispatch(toggleLoading(false))
    } else {
      // deleteModal.type == 'email'
      await deleteEmailReply(deleteModal.item.id)
      await getEmailList()
      setDeleteModal({
        type: '',
        show: false,
        item: null
      })
      dispatch(toggleLoading(false))
    }
  }
  useEffect(() => {
    dispatch(toggleLoading(true))
    Promise.all([getChatList(), getEmailList()]).then(() => {
      dispatch(toggleLoading(false))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={styles.reply}>
      <Row justify="end">
        <Col>
          <Button
            className={styles.editBtn}
            onClick={() => setShowFastReply(true)}
            style={{ marginTop: '24px' }}
          >
            Create fast reply
          </Button>
        </Col>
      </Row>
      <div className={styles.title}>Chat fast reply</div>
      <Collapse ghost expandIconPosition="end">
        {chatList.map((item) => {
          return (
            <Panel accordion key={item.id} header={item.title}>
              <div className={styles['panel-contnet']}>{item.content}</div>
              <Row justify="end">
                <Col>
                  <Space>
                    <Button
                      className={styles.deleteBtn}
                      onClick={() =>
                        setDeleteModal({
                          type: 'chat',
                          show: true,
                          item
                        })
                      }
                    >
                      <Space>
                        <DeleteOutlined />
                        Delete
                      </Space>
                    </Button>
                    <Button
                      className={styles.editBtn}
                      onClick={() => showEditModal(item, 'chat')}
                    >
                      <Space>
                        <Icon
                          name="edit-white"
                          width="11px"
                          height="11px"
                        ></Icon>
                        Edit
                      </Space>
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Panel>
          )
        })}
      </Collapse>
      <div className={styles.title}>Email fast reply</div>
      <Collapse ghost expandIconPosition="end">
        {emailList.map((item) => {
          return (
            <Panel accordion key={item.id} header={item.title}>
              <div className={styles['panel-contnet']}>{item.content}</div>
              <div className={styles['panel-file']}>
                {item.files.map((item) => {
                  return (
                    <Button
                      key={item.url}
                      className={styles['file-btn']}
                      href={item.url}
                      target="_blank"
                    >
                      {item.fileName}
                    </Button>
                  )
                })}
              </div>

              <Row justify="end">
                <Col>
                  <Space>
                    <Button
                      className={styles.deleteBtn}
                      onClick={() =>
                        setDeleteModal({
                          type: 'email',
                          show: true,
                          item
                        })
                      }
                    >
                      <Space>
                        <DeleteOutlined />
                        Delete
                      </Space>
                    </Button>
                    <Button
                      className={styles.editBtn}
                      onClick={() => showEditModal(item, 'email')}
                    >
                      <Space>
                        <Icon
                          name="edit-white"
                          width="11px"
                          height="11px"
                        ></Icon>
                        Edit
                      </Space>
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Panel>
          )
        })}
      </Collapse>
      <Modal
        title={`Edit ${editType} fast reply`}
        visible={showEdit}
        footer={false}
        onCancel={() => setShowEdit(false)}
        destroyOnClose
      >
        <EditFastReply
          editType={editType}
          detail={editCurrent}
          saveEdit={saveEdit}
          openNewWindow={openNewWindow}
        />
      </Modal>
      <Modal
        title="New fast reply"
        visible={showFastReply}
        footer={false}
        onCancel={() => setShowFastReply(false)}
        destroyOnClose
        wrapClassName={styles.modalWrap}
      >
        <CreateFastReply
          updateData={updateData}
          openNewWindow={openNewWindow}
        />
      </Modal>
      <Modal
        title=""
        visible={deleteModal.show}
        okText="Save"
        footer={false}
        centered
        onCancel={() =>
          setDeleteModal({
            show: false,
            item: null,
            type: ''
          })
        }
        wrapClassName={styles.deleteModal}
      >
        <div className={styles.modalSubTitle}>
          Are you sure you want to delete this{' '}
          {deleteModal.type == 'chat' ? 'chat' : 'email'} reply ?
        </div>
        <Row justify="center">
          <Col>
            <Space>
              <Button
                className={styles.confirmBtn}
                onClick={() => handleDeleteReply()}
              >
                YES
              </Button>
              <Button
                className={styles.cancelBtn}
                onClick={() =>
                  setDeleteModal({
                    show: false,
                    item: null,
                    type: ''
                  })
                }
              >
                NO
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}
export default Reply
