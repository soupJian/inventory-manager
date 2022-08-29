import React from 'react'
import { Row, Col } from 'antd'

import styles from './index.module.scss'
const DealsLostIn = () => {
  return (
    <div className={styles['deal-lost-in']}>
      <Row>
        <Col className={styles.title}>Deals lost in:</Col>
        <Col></Col>
      </Row>
    </div>
  )
}

export default DealsLostIn
