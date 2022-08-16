// React next -------------
import React, { useState } from 'react'
// antd ui -------------
import { Row, Col, Space, Button, Select, Input, Drawer } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
// components ----------------
import Icon from '../../../../components/commons/icons/Icon'
import CreateDealForm from './create-deal-form'
// css ---------------
import styles from './index.module.scss'
const { Option } = Select

const DealsHeader = ({ changeShowListType, showListType }) => {
  const [showDealDrawer, setShowDealDrawer] = useState(false)
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <>
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
                  showListType == 'menu' ? styles.active : ''
                }`}
                onClick={() => changeShowListType('menu')}
              >
                <Icon
                  name={showListType == 'menu' ? 'menu-white' : 'menu-black'}
                  width="14px"
                  height="13px"
                />
              </div>
              <div
                className={`${styles['type-filter']} ${
                  showListType == 'filter' ? styles.active : ''
                }`}
                onClick={() => changeShowListType('filter')}
              >
                <Icon
                  name={
                    showListType == 'filter' ? 'filter-white' : 'filter-black'
                  }
                  width="14px"
                  height="13px"
                />
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
            <Button
              size="large"
              className={styles.createBtn}
              onClick={() => setShowDealDrawer(true)}
            >
              Create deal
            </Button>
          </Space>
        </Col>
      </Row>
      <Drawer
        title="Create a deal"
        placement="left"
        closable={false}
        onClose={() => setShowDealDrawer(false)}
        visible={showDealDrawer}
        key={'left'}
      >
        <CreateDealForm />
      </Drawer>
    </>
  )
}

export default DealsHeader
