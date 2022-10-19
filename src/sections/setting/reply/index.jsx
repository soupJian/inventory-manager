import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Collapse, Button, Row, Col, Space, Modal } from 'antd'
import { Icon } from '../../../components/commons'
import styles from './index.module.scss'
import EditFastReply from './components/edit-fast-reply'
import CreateFastReply from './components/create-fast-reply'
import {
  getAllChatReply,
  getAllEmailReply,
  updateChatReply,
  updateEmailReply
} from '../../../service/setting/setting-reply'
import { toggleLoading } from '../../../store/slices/globalSlice'

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
    dispatch(toggleLoading())
    if (editType == 'chat') {
      const res = await updateChatReply(info)
      if (res && res.message == 'success') {
        setShowEdit(false)
        dispatch(toggleLoading())
        getChatList()
      }
    } else {
      // const res = await Promise.all(
      //   info.files.map(async (item) => {
      //     if (!item.isNewFile) {
      //       return {
      //         fileName: item.fileName,
      //         url: item.url
      //       }
      //     } else {
      //       const formData = new FormData()
      //       formData.append('file', item.originFileObj)
      //       const url = await uploadImage(formData)
      //       return {
      //         fileName: item.fileName,
      //         url: url
      //       }
      //     }
      //   })
      // )
      // const result = await updateEmailReply(info)
      // if (result && res.message == 'success') {
      //   setShowEdit(false)
      //   dispatch(toggleLoading())
      //   getEmailList()
      // }
    }
  }
  const updateData = (type) => {
    dispatch(toggleLoading())
    if (type == 'chat') {
      getChatList().then(() => {
        dispatch(toggleLoading())
      })
    } else {
      getEmailList().then(() => {
        dispatch(toggleLoading())
      })
    }

    setShowFastReply(false)
  }
  useEffect(() => {
    dispatch(toggleLoading())
    Promise.all([getChatList(), getEmailList()]).then(() => {
      dispatch(toggleLoading())
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
                  <Button
                    className={styles.editBtn}
                    onClick={() => showEditModal(item, 'chat')}
                  >
                    <Space>
                      <Icon name="edit-white" width="11px" height="11px"></Icon>
                      Edit
                    </Space>
                  </Button>
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
                  <Button
                    className={styles.editBtn}
                    onClick={() => showEditModal(item, 'email')}
                  >
                    <Space>
                      <Icon name="edit-white" width="11px" height="11px"></Icon>
                      Edit
                    </Space>
                  </Button>
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
        <CreateFastReply updateData={updateData} />
      </Modal>
    </div>
  )
}
export default Reply
