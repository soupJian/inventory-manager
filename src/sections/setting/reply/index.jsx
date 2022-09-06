import React, { useState, useEffect } from 'react'
import { Collapse, Button, Row, Col, Space, Modal } from 'antd'
import { Icon } from '../../../components/commons'
import styles from './index.module.scss'
import EditChat from './components/edit-chat'
const { Panel } = Collapse

const Reply = () => {
  // chat 回复信息列表
  const [chatList, setChatList] = useState([])
  // edit弹窗
  const [showEdit, setShowEdit] = useState(false)
  // 当前编辑的信息
  const [editCurrent, setEditCurrent] = useState(null)
  // 获取数据
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
  // 展示 edit chat 弹窗
  const showEditModal = (item, type) => {
    // type ---> chat email
    if (type == 'chat') {
      setShowEdit(true)
    }
    setEditCurrent(item)
  }
  // 编辑 chat 的 提交按钮
  const saveEditChat = (info) => {
    console.log(info)
    setShowEdit(false)
  }
  useEffect(() => {
    getChatList()
  }, [])
  return (
    <div className={styles.reply}>
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
      <Modal
        title="Edit chat fast reply"
        visible={showEdit}
        footer={false}
        onCancel={() => setShowEdit(false)}
        destroyOnClose
      >
        <EditChat detail={editCurrent} saveEditChat={saveEditChat} />
      </Modal>
    </div>
  )
}
export default Reply
