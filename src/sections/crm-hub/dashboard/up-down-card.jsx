import React from 'react'
import { Row, Col } from 'antd'
import { Icon } from '../../../components/commons'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

const UpDownCard = ({
  background,
  iconName,
  num,
  color,
  precent,
  isup,
  description,
  format
}) => {
  return (
    <Row align="middle" className={styles['up-down-card']}>
      <Col className={styles.iconWrap} style={{ background }}>
        <Icon name={iconName} width="20px" height="20px" />
      </Col>
      <Col className={styles.num} style={{ color }}>
        {format ? `$${num.toLocaleString()}` : num}
      </Col>
      <Col className={styles.precent}>
        <span>
          {isup ? (
            <ArrowUpOutlined style={{ color: '#77D755' }} />
          ) : (
            <ArrowDownOutlined style={{ color: '#FF7B7B' }} />
          )}
        </span>
        <span style={{ marginLeft: '6px' }}>{precent}%</span>
      </Col>
      <Col span={24} className={styles.description}>
        {description}
      </Col>
    </Row>
  )
}

export default UpDownCard
