import React from 'react'
import { Row, Col } from 'antd'
import styles from './index.module.scss'
import SelectDay from './components/select-day'
const NewContact = () => {
  // 切换 时间选择
  const handleChooseSelect = (item) => {
    console.log(item)
  }
  return (
    <div className={styles['new-contacts']}>
      <Row>
        <Col className={styles.title} span={24}>
          New contacts
        </Col>
        <Col span={24}>
          <div className={styles.num}>153</div>
          <SelectDay handleChooseSelect={handleChooseSelect} />
        </Col>
      </Row>
    </div>
  )
}

export default NewContact
