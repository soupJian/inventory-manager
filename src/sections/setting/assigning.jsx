import React, { useState } from 'react'
import { Row, Col, Select, Switch, Checkbox, Radio, Space } from 'antd'
// components -----------
import SettingDeal from './components/setting-deal'
import SettingCall from './components/setting-call'
import SettingChat from './components/setting-chat'
import styles from './assigning.module.scss'
//js =---------
const { Option } = Select
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
      {headerSelect == 'Mockup inquiry form' && <SettingDeal />}
      {headerSelect == 'Call' && <SettingCall />}
      {headerSelect == 'Chat' && <SettingChat />}
    </div>
  )
}

export default Assiging
