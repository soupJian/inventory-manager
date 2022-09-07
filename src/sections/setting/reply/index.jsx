import React, { useState, useEffect } from 'react'
import { Collapse, Button, Row, Col, Space, Modal } from 'antd'
import { Icon } from '../../../components/commons'
import styles from './index.module.scss'
import EditFastReply from './components/edit-fast-reply'
import CreateFastReply from './components/create-fast-reply'
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
  const getChatList = () => {
    const list = [
      {
        id: 1,
        title: '快捷回复1',
        contents:
          'This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ.'
      },
      {
        id: 2,
        title: '快捷回复2',
        contents: '快捷回复2号内容'
      }
    ]
    setChatList(list)
  }
  // 获取邮件快速回复列表
  const getEmailList = () => {
    const list = [
      {
        id: 1,
        title: '快捷回复1',
        contents:
          'This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ. This is the example of Customization FAQ.',
        file: [
          {
            name: '附件1',
            status: 'done',
            url: 'http://175.24.116.96:3300/upload/343084a9e64c4dc40aeb00cae86b5aad.jpg'
          },
          {
            name: '附件2',
            status: 'done',
            url: 'http://175.24.116.96:3300/upload/182f94f5fe73be32c860b10297b5066b.jpg'
          }
        ]
      },
      {
        id: 2,
        title: '快捷回复2',
        contents: '快捷回复2号内容',
        file: [
          {
            uid: '1',
            name: '附件1',
            status: 'done',
            url: 'http://175.24.116.96:3300/upload/24026daa692aea08447833515d059e88.jpeg'
          },
          {
            uid: '2',
            name: '附件2',
            status: 'done',
            url: 'http://175.24.116.96:3300/upload/182f94f5fe73be32c860b10297b5066b.jpg'
          }
        ]
      }
    ]
    setEmailList(list)
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
              <div className={styles['panel-contnet']}>{item.contents}</div>
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
              <div className={styles['panel-contnet']}>{item.contents}</div>
              <div className={styles['panel-file']}>
                {item.file.map((item) => {
                  return (
                    <Button key={item.url} className={styles['file-btn']}>
                      {item.name}
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
