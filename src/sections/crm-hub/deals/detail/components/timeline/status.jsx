import React, { useState } from 'react'
import { Row, Col, Space } from 'antd'
import styles from '../timeline.module.scss'
import { Icon } from '../../../../../../components/commons'
// 状态一 这个deal的负责人把这个 deal 分配给别人时候
export const StatusOne = ({ item }) => {
  return (
    <Row gutter={[0, 14]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col className={styles.time}>{item.time}</Col>
          <Col className={styles.action}>
            <Space>
              <Icon name="user" style={{ width: '16px', height: '16px' }} />
              <span>{item.actionPerson}</span>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24} className={styles.detail}>
        <Space>
          <span>Assigned owner to</span>
          <span className={styles.bold}>{item.toPerson}</span>
        </Space>
      </Col>
    </Row>
  )
}

// 状态二 客服在这个 deal 中 增加了一个 note,
// 点击 Review Notes 展示 note 内容
export const StatusTwo = ({ item }) => {
  const [showDetail, setShowDetai] = useState(false)
  return (
    <Row gutter={[0, 14]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col className={styles.time}>{item.time}</Col>
          <Col className={styles.action}>
            <Space>
              <Icon name="user" style={{ width: '16px', height: '16px' }} />
              <span>{item.actionPerson}</span>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24} className={styles.detail}>
        <Space>
          <span>Made a note</span>
          <span
            onClick={() => setShowDetai(true)}
            className={styles.activeColor}
          >
            Review Notes
          </span>
        </Space>
        {showDetail && (
          <Row style={{ marginTop: '14px' }} align="top">
            <Col className={styles.label}>Note</Col>
            <Col className={styles.labelContent}>{item.note}</Col>
          </Row>
        )}
      </Col>
    </Row>
  )
}
// 状态三 客服修改 status 时
export const StatusThree = ({ item }) => {
  return (
    <Row gutter={[0, 14]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col className={styles.time}>{item.time}</Col>
          <Col className={styles.action}>
            <Space>
              <Icon name="user" style={{ width: '16px', height: '16px' }} />
              <span>{item.actionPerson}</span>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24} className={styles.detail}>
        <Space>
          <span>Change the status from Mockup sent to</span>
          <span className={styles.bold}>{item.status}</span>
        </Space>
      </Col>
    </Row>
  )
}
// 状态四
export const StatusFour = ({ item }) => {
  return (
    <Row gutter={[0, 14]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col>
            <Space>
              <Icon
                name="task-clock"
                style={{ width: '16px', height: '16px' }}
              />
              <span className={styles.due}>Due: {item.time}</span>
            </Space>
          </Col>
          <Col className={styles.action}>
            <Space>
              <Icon name="user" style={{ width: '16px', height: '16px' }} />
              <span>{item.actionPerson}</span>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24} className={styles.detail}>
        <Row gutter={[0, 12]}>
          <Col span={24}>{item.remind}</Col>
          <Col span={24}>
            <Row align="top">
              <Col className={styles.label}>Reminder</Col>
              <Col className={styles.labelContent}>{item.remindTime}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row align="top">
              <Col className={styles.label}>Details</Col>
              <Col className={styles.labelContent}>{item.detail}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
// 状态五
export const StatusFive = ({ item }) => {
  return (
    <Row gutter={[0, 14]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col className={styles.time}>{item.time}</Col>
          <Col className={styles.action}>
            <Space>
              <Icon name="user" style={{ width: '16px', height: '16px' }} />
              <span>{item.actionPerson}</span>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24} className={styles.detail}>
        <Space>
          <span>Made a Call to</span>
          <span className={styles.bold}>
            {item.name ? item.name : item.phone}
          </span>
          <span className={styles.activeColor}>Call contact</span>
        </Space>
        <Row style={{ marginTop: '14px' }} align="top">
          <Col className={styles.label}>Status</Col>
          <Col className={`${styles.labelContent} ${styles.statusColor}`}>
            {item.status}
          </Col>
        </Row>
        <Row style={{ marginTop: '14px' }} align="top">
          <Col className={styles.label}>Notes</Col>
          <Col className={styles.labelContent}>{item.notes}</Col>
        </Row>
      </Col>
    </Row>
  )
}
// 状态六
export const StatusSix = ({ item }) => {
  return (
    <Row gutter={[0, 14]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col className={styles.time}>{item.time}</Col>
          <Col className={styles.action}>
            <Space>
              <Icon name="user" style={{ width: '16px', height: '16px' }} />
              <span>{item.actionPerson}</span>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24} className={styles.detail}>
        <Space>
          <span>Received a Call from</span>
          <span className={styles.bold}>
            {item.name ? item.name : item.phone}
          </span>
          <span className={styles.activeColor}>Call contact</span>
        </Space>
        <Row style={{ marginTop: '14px' }} align="top">
          <Col className={styles.label}>Notes</Col>
          <Col className={styles.labelContent}>{item.notes}</Col>
        </Row>
      </Col>
    </Row>
  )
}
// 状态七
export const StatusSeven = ({ item }) => {
  return (
    <Row gutter={[0, 14]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col className={styles.time}>{item.time}</Col>
          <Col className={styles.action}>
            <Space>
              <Icon name="user" style={{ width: '16px', height: '16px' }} />
              <span>{item.actionPerson}</span>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24} className={styles.detail}>
        <Space>
          <span>Chatted with</span>
          <span className={styles.bold}>
            {item.name ? item.name : item.phone}
          </span>
        </Space>
        <Row style={{ marginTop: '14px' }} align="top">
          <Col className={styles.label}>Status</Col>
          <Col className={`${styles.labelContent} ${styles.statusColor}`}>
            {item.status}
          </Col>
        </Row>
        <Row style={{ marginTop: '14px' }} align="top">
          <Col className={styles.label}>Summary</Col>
          <Col className={styles.labelContent}>{item.summary}</Col>
        </Row>
      </Col>
    </Row>
  )
}
// 状态八
export const StatusEight = ({ item }) => {
  return (
    <Row gutter={[0, 14]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col className={styles.time}>{item.time}</Col>
          <Col className={styles.action}>
            <Space>
              <Icon name="user" style={{ width: '16px', height: '16px' }} />
              <span>{item.actionPerson}</span>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24} className={styles.detail}>
        <span>Created this deal</span>
      </Col>
    </Row>
  )
}
