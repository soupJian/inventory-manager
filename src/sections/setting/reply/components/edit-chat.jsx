import React from 'react'
import { Row, Col, Input, Button, message } from 'antd'
import styles from '../index.module.scss'
import { useState } from 'react'
const EditChat = (props) => {
  const { detail, saveEditChat } = props
  const [info, setInfo] = useState(detail)
  const handleChangeInfo = (e) => {
    setInfo((info) => {
      const newInfo = { ...info }
      newInfo[e.target.name] = e.target.value
      return newInfo
    })
  }
  const save = () => {
    if (info.title.trim() == '' || info.contents.trim() == '') {
      message.warn('Please complete the information.')
      return
    }
    saveEditChat(info)
  }
  return (
    <div className={styles.modal}>
      <Row>
        <Col span={24} className={styles.labelTitle}>
          title*
        </Col>
        <Col span={24}>
          <Input value={info.title} onChange={handleChangeInfo} name="title" />
        </Col>
      </Row>
      <Row style={{ marginTop: '24px' }}>
        <Col span={24} className={styles.labelTitle}>
          CONTENT*
        </Col>
        <Col span={24}>
          <Input.TextArea
            autoSize
            value={info.contents}
            style={{ minHeight: '100px' }}
            name="contents"
            onChange={handleChangeInfo}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '24px' }} justify="end">
        <Col>
          <Button
            className={styles.editBtn}
            onClick={() => {
              save()
            }}
          >
            Save
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default EditChat
