// React next -------------
import React from 'react'
import Image from 'next/image'
// antd ui -------------
import { Row, Col, Space, Button, Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
// components ----------------
import Icon from '../../../components/commons/icons/Icon'
// css ---------------
import styles from './index.module.scss'
const { Option } = Select

const DealsHeader = ({ changeShowListType, shouListType }) => {
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
          <div className={styles.type}>
            <div
              className={`${styles['type-menu']} ${
                shouListType == 'menu' ? styles.active : ''
              }`}
              onClick={() => changeShowListType('menu')}
            >
              <Icon name={shouListType == 'menu' ?'menu-white' :'menu-black'} width="14px" height="13px" />
            </div>
            <div
              className={`${styles['type-filter']} ${
                shouListType == 'filter' ? styles.active : ''
              }`}
              onClick={() => changeShowListType('filter')}
            >
              <Icon name={shouListType == 'filter' ?'filter-white' :'filter-black'} width="14px" height="13px" />
            </div>
          </div>
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
