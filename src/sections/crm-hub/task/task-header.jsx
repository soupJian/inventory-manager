import React from 'react'
// components
import { Row, Col, Input, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
// css
import styles from './index.module.scss'

const { Option } = Select

// main
const TaskHeader = () => {
  const handleChangePipeline = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <div>
      <Row justify="space-between" className={styles.taskHeader}>
        <Col>
          <span className={styles.title}>Tasks</span>
          <Select
            defaultValue={['Sales pipeline']}
            style={{
              minWidth: 200
            }}
            size="large"
            onChange={handleChangePipeline}
          >
            <Option value="Sales pipeline">Sales pipeline</Option>
            <Option value="Contact us forms">Contact us forms</Option>
          </Select>
        </Col>
        <Col>
          <Input
            size="large"
            placeholder="Search tasks"
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </div>
  )
}

export default TaskHeader
