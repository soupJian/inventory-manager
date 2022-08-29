import React from 'react'
import { Row, Col } from 'antd'
import styles from './index.module.scss'

const NewContact = () => {
  return (
    <div className={styles['new-contacts']}>
      <Row>
        <Col className={styles.title}>New contacts</Col>
        <Col></Col>
      </Row>
    </div>
  )
}

export default NewContact
