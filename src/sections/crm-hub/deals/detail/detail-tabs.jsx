import React, { useState } from 'react'
// antd -------------
import { Row, Col } from 'antd'
// components
// import Icon from '../../../../components/commons/icons/Icon'
// css ---------
import styles from './index.module.scss'
const tabs = [
  { name: 'History' },
  { name: 'Emails' },
  { name: 'Calls' },
  { name: 'Chats' },
  { name: 'Task' },
  { name: 'Repository' }
]

const DetailTabs = () => {
  const [active, setActive] = useState('History')
  return (
    <div className={styles['detail-tabs']}>
      <Row>
        {tabs.map((item) => {
          return (
            <Col key={item.name}>
              <div
                onClick={() => setActive(item.name)}
                className={
                  active == item.name
                    ? `${styles.tab} ${styles.active}`
                    : `${styles.tab}`
                }
              >
                {item.name}
              </div>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default DetailTabs
