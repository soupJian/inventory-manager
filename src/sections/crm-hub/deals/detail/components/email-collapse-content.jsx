import React from 'react'
import { Row, Col, Select, Space, Button } from 'antd'
import styles from '../index.module.scss'

const { Option } = Select

const EmailCollapseContent = (props) => {
  const { item } = props
  const handleChangeStatus = () => {}
  return (
    <div className={styles['collapse-content-wrap']}>
      <div className={styles['collapse-content-header']}>
        <Row justify="space-between" align="middle">
          <Col>
            <span className={styles['collapse-title']}>
              {item.collapseTitle}
            </span>
          </Col>
          <Col>
            <Select
              onChange={handleChangeStatus}
              placeholder="Select"
              size="middle"
            >
              <Option value="Interest showed">Reply</Option>
              <Option value="Initial mockup">Reply all</Option>
              <Option value=">Mockup revising">Forward</Option>
            </Select>
          </Col>
        </Row>
      </div>
      {item.contactList.map((email) => {
        return (
          <div key={email.id} className={styles.contentItem}>
            <Row>
              <Col>
                <div className={styles['email-list-avatar']}>
                  {email.sendPerson[0].toUpperCase()}
                </div>
              </Col>
              <Col>
                <Row align="middle">
                  <Col span={24}>{email.sendPerson}</Col>
                  <Col span={24}>
                    to {email.acceptPerson} . {email.sendTime}
                  </Col>
                  {/* <Col span={24}>
                    <Space>
                      <Button
                        className={styles['email-list-button']}
                        shape="round"
                      ></Button>
                    </Space>
                  </Col> */}
                </Row>
              </Col>
            </Row>
            <Row className={styles.content}>{email.content}</Row>
          </div>
        )
      })}
    </div>
  )
}

export default EmailCollapseContent
