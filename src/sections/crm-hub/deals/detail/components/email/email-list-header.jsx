import React from 'react'
// components
import Icon from '../../../../../../components/commons/icons/Icon'
import { Row, Col, Button } from 'antd'
// css
import styles from '../email.module.less'

// main
const EmailHeader = (item) => {
  return (
    <Row
      align="middle"
      wrap={false}
      gutter={[23, 0]}
      className={styles['email-list-header']}
    >
      <Col>
        <Icon
          style={{ width: '20px', height: '22px' }}
          name={item.lastType == 'send' ? 'send' : 'reply'}
        ></Icon>
      </Col>
      <Col>
        <div
          className={styles['email-list-header-avatar']}
          style={{
            background:
              item.emailAddress == 'inquiry@westshade.com'
                ? '#2C88DD'
                : '#2EBEBD'
          }}
        >
          {item.emailAddress[0].toUpperCase()}
        </div>
      </Col>
      <Col>
        <Row align="middle">
          <Col className={styles['title']} span={24}>
            <Row align="middle">
              <Col>{item.title}</Col>
              {item.new && (
                <Col>
                  <Button className={styles['email-header-new']}>NEW</Button>
                </Col>
              )}
            </Row>
          </Col>
          <Col className={styles['email-list-header-name-time']} span={24}>
            {item.personName} - {item.time}
          </Col>
          <Col span={24}>
            <div className={styles['email-list-header-content']}>
              {item.content}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default EmailHeader
