import React, { useState } from 'react'
import { Row, Col, Select, message } from 'antd'
// components -----------
import PipelineSales from './components/pipeline-sales.jsx'
import styles from './pipeline.module.scss'
//js =---------
const { Option } = Select
const Pipeline = () => {
  const [headerSelect, setHeaderSelect] = useState('Sales pipeline')
  const [salesList, setSaleslist] = useState([
    {
      name: 'Interest showed',
      color: '#FF7B7B'
    },
    {
      name: 'Initial mockup',
      color: 'rgba(247, 148, 0, 0.6)'
    },
    {
      name: 'Mockup revising',
      color: '#2C88DD'
    },
    {
      name: 'Invoice sent',
      color: '#77D755'
    },
    {
      name: 'Closed won',
      color: '#2EBEBD'
    },
    {
      name: 'Closed lost',
      color: '#B7B7B7'
    }
  ])
  // 编辑 slaes pipeline
  const updateSalesPipeline = (oldValue, newValue) => {
    setSaleslist((list) => {
      const index = salesList.findIndex((item) => item.name == oldValue)
      const newList = [...list]
      newList[index].name = newValue
      return newList
    })
  }

  // 创建 sale pipeline
  const createSalesPipeline = (salesName, afterName) => {
    setSaleslist((list) => {
      const newList = [...list]
      const index = newList.findIndex((item) => item.name == afterName)
      newList.splice(index + 1, 0, {
        name: salesName,
        color: 'pink'
      })
      return newList
    })
  }
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
      {headerSelect == 'Sales pipeline' && (
        <PipelineSales
          salesList={salesList}
          updateSalesPipeline={updateSalesPipeline}
          createSalesPipeline={createSalesPipeline}
        />
      )}
    </div>
  )
}

export default Pipeline
