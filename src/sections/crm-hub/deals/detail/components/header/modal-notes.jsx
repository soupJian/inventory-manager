import React, { useState } from 'react'
// components
import { Input, Row, Col, Button } from 'antd'
import { Icon } from '../../../../../../components/commons'
//css
import styles from './index.module.less'

// main
const ModalNotes = () => {
  const [noteValue, setNoteValue] = useState('')

  return (
    <div className={styles['modal-note']}>
      <div className={styles.title}>New note</div>
      <Input.TextArea
        autoSize
        className={styles.textarea}
        value={noteValue}
        onChange={(e) => setNoteValue(e.target.value)}
      />
      <Row justify="end">
        <Col>
          <Button disabled={noteValue.trim() == ''} className={styles.postBtn}>
            Post
          </Button>
        </Col>
      </Row>
      <div className={styles.title}>Note History</div>
      <div className={styles['note-wrap']}>
        {
          <div className={styles['noteItem']}>
            <Row justify="space-between">
              <Col>5/15/2022 11:36 AM</Col>
              <Col className={styles.user}>
                <Icon name="user" className={styles.userIcon} />
                Cathy
              </Col>
            </Row>
            <Row className={styles.content}>
              <Col span={24}>
                Got connected with the contact and he said she was very
                interested in the canopy tent but will need some time to do
                research online and then he can purchase.
              </Col>
            </Row>
          </div>
        }
        {
          <div className={styles['noteItem']}>
            <Row justify="space-between">
              <Col>5/15/2022 11:36 AM</Col>
              <Col className={styles.user}>
                <Icon name="user" className={styles.userIcon} />
                Cathy
              </Col>
            </Row>
            <Row className={styles.content}>
              <Col span={24}>
                Got connected with the contact and he said she was very
                interested in the canopy tent but will need some time to do
                research online and then he can purchase.
              </Col>
            </Row>
          </div>
        }
      </div>
    </div>
  )
}

export default ModalNotes
