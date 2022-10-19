import React, { useState, useEffect } from 'react'
import { Collapse, Button, Row, Col, Space, Modal } from 'antd'
import { Icon } from '../../../components/commons'
import styles from './index.module.scss'
import EditFastReply from './components/edit-fast-reply'
import CreateFastReply from './components/create-fast-reply'
import {
  getAllChatReply,
  getAllEmailReply
} from '../../../service/setting/setting-reply'
const { Panel } = Collapse

const Reply = () => {
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
    if (res.Items) {
      setChatList(res.Items)
    }
  }
  // 获取邮件快速回复列表
  const getEmailList = async () => {
    const res = await getAllEmailReply()
    if (res.Items) {
      setEmailList(res.Items)
    }
  }
  // 展示 edit chat 弹窗
  const showEditModal = (item, type) => {
    // type ---> chat email
    setEditType(type)
    setShowEdit(true)
    setEditCurrent(item)
  }
  // 编辑 chat 的 提交按钮
  const saveEditChat = (info) => {
    console.log(info)
    setShowEdit(false)
  }
  useEffect(() => {
    getChatList()
    getEmailList()
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
          saveEditChat={saveEditChat}
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
        <CreateFastReply />
      </Modal>
    </div>
  )
}
export default Reply
