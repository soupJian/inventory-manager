// React next -------------
import React from 'react'
// antd ui -------------
import { Row, Col, Space, Button, Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
// css ---------------
import styles from './index.module.scss'
const { Option } = Select

const FromEmailHeader = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <Row justify="space-between" className={styles['header-wrap']}>
      <Col className={styles.title}>Forms & Emails</Col>
      <Col>
        <Space>
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
            <Option value="Contact us forms"></Option>Contact us forms
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
