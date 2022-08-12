// React next -------------
import React from 'react'
// antd ui -------------
import { Row, Col, Space, Button, Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
// css ---------------
import styles from './index.module.scss'
const { Option } = Select

const DealsHeader = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <Row justify="space-between" className={styles['header-wrap']}>
      <Col>
        <Space>
          <span className={styles.title}>Deals</span>
          <Select
            defaultValue={'Sales pipeline'}
            style={{
              minWidth: 200
            }}
            size="large"
            allowClear
            onChange={handleChange}
          >
            <Option value="Sales pipeline">Sales pipeline</Option>
            <Option value="Other pipeline example"></Option>Other pipeline
            example
          </Select>
        </Space>
      </Col>
      <Col>
        <Space>
          <Input
            size="large"
            name="dealNmae"
            placeholder="search deal nmae"
            prefix={<SearchOutlined />}
          />
          <Button size="large" className={styles.createBtn}>
            Create deal
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default DealsHeader
