// React next -------------
import React from 'react'
// components
import { Row, Col, Space, Button, Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
// css ---------------
import styles from './index.module.scss'
const { Option } = Select

// main
const FromEmailHeader = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <Row justify="space-between" className={styles['header-wrap']}>
      <Col className={styles.title}>Forms & Emails</Col>
      <Col>
        <Space align="middle">
          <Button size="large">+ LOG eamil</Button>
          <Select
            mode="multiple"
            defaultValue={['all']}
            style={{
              minWidth: 200
            }}
            size="large"
            allowClear
            onChange={handleChange}
          >
            <Option value="jack">ALL types</Option>
            <Option value="Mockup forms">Mockup forms</Option>
            <Option value="Contact us forms">Contact us forms</Option>
          </Select>
          <Input
            size="large"
            placeholder="search email"
            prefix={<SearchOutlined />}
          />
        </Space>
      </Col>
    </Row>
  )
}

export default FromEmailHeader
