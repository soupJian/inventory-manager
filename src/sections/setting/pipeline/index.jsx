import React, { useState } from 'react'
import { Row, Col, Select, message } from 'antd'
// components -----------
import PipelineSales from './components/pipeline-sales.jsx'
import PipelineReverse from './components/pipeline-reverse'
import PipelineSupport from './components/pipeline-support'

import styles from './index.module.scss'
//js =---------
const { Option } = Select
const Pipeline = () => {
  const [headerSelect, setHeaderSelect] = useState('Reverse logistics')
  return (
    <div>
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
      {headerSelect == 'Support pipeline' && <PipelineSupport />}
      {headerSelect == 'Reverse logistics' && <PipelineReverse />}
    </div>
  )
}

export default Pipeline
