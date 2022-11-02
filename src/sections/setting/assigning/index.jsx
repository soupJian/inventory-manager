import React, { useState } from 'react'
import { Row, Col, Select } from 'antd'
// components -----------
import AssigningDeal from './components/assigning-deal'
import AssigningCall from './components/assigning-call'
import AssigningChat from './components/assigning-chat'
// css
import styles from './index.module.scss'

const { Option } = Select

// main
const Assiging = () => {
  const [headerSelect, setHeaderSelect] = useState('Mockup inquiry form')

  return (
    <div className={styles.assiging}>
      {/* header-search */}
      <Row className={styles['header-select']} align="middle" gutter={10}>
        <Col className={styles.selectText}>Select</Col>
        <Col>
          <Select
            className={styles.selectWrap}
            value={headerSelect}
            style={{
              width: 200
            }}
            onChange={(value) => setHeaderSelect(value)}
          >
            <Option value="Mockup inquiry form">Mockup inquiry form</Option>
            <Option value="Call">Call</Option>
            <Option value="Chat">Chat</Option>
          </Select>
        </Col>
      </Row>
      {/* container */}
      {headerSelect == 'Mockup inquiry form' && <AssigningDeal />}
      {headerSelect == 'Call' && <AssigningCall />}
      {headerSelect == 'Chat' && <AssigningChat />}
    </div>
  )
}

export default Assiging
