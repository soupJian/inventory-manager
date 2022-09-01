import React, { useState } from 'react'
import { Row, Col, Select } from 'antd'
// components -----------
import PipelineSales from './components/pipeline-sales.jsx'
import styles from './assigning.module.scss'
//js =---------
const { Option } = Select
const Assiging = () => {
  const [headerSelect, setHeaderSelect] = useState('Sales pipeline')

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
            <Option value="Sales pipeline">Sales pipeline</Option>
            <Option value="Support pipeline">Support pipeline</Option>
            <Option value="Reverse logistics">Reverse logistics</Option>
          </Select>
        </Col>
      </Row>
      {/* container */}
      {headerSelect == 'Sales pipeline' && <PipelineSales />}
    </div>
  )
}

export default Assiging
