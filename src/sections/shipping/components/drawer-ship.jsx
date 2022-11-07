import React, { useState } from 'react'
// components
import { Select, Row, Col, Input, Space, Checkbox, Button } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
// js
import { v4 as uuidv4 } from 'uuid'

// css
import styles from '../index.module.less'

// main
const DrawerShip = () => {
  const productList = [
    {
      SKU: 'TJ-2',
      Name: 'TJ-2'
    },
    {
      SKU: 'TJ-3',
      Name: 'TJ-3'
    }
  ]
  // 包裹列表
  const [packageList, setPackageList] = useState([
    {
      id: uuidv4(),
      selectProduct: [],
      cappier: '',
      trackingId: ''
    }
  ])
  const [selectedProduct, setSelectedProduct] = useState([])
  const handleChange = (value, index, key) => {
    setPackageList((list) => {
      const newList = [...list]
      newList[index][key] = value
      return newList
    })
  }
  // 选中 product
  const handleSelectProduct = (value, productItem, index) => {
    setPackageList((list) => {
      const newList = [...list]
      // 勾选
      if (value) {
        console.log(productItem)
      }
      return newList
    })
  }
  // add
  const addPackage = () => {
    setPackageList((list) => {
      const newList = [...list]
      newList.push({
        id: uuidv4(),
        selectProduct: [],
        cappier: '',
        trackingId: ''
      })
      return newList
    })
  }
  return (
    <div className={styles.drawerShip}>
      {packageList.map((packageItem, packageIndex) => {
        return (
          <div key={packageItem.id} style={{ marginBottom: '40px' }}>
            <div className={styles.title}>Package {packageIndex + 1}</div>
            <div className={styles['product-description']}>
              Select the product(s) to ship in one package:
            </div>
            <Row gutter={[0, 32]} style={{ marginTop: '40px' }}>
              {productList.map((productItem) => {
                return (
                  <Col span={24} key={productItem.SKU}>
                    <Space>
                      <Checkbox
                        onChange={(e) =>
                          handleSelectProduct(
                            e.target.checked,
                            productItem,
                            packageIndex
                          )
                        }
                      />
                      <span>{productItem.Name}</span>
                    </Space>
                  </Col>
                )
              })}
              <Col span={24}></Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <div className={styles.formLabel}>CARRIER</div>
                <Select
                  style={{ width: '100%' }}
                  onChange={(value) =>
                    handleChange(value, packageIndex, 'cappier')
                  }
                  options={[
                    {
                      value: 'Fedex',
                      label: 'Fedex'
                    },
                    {
                      value: 'UPS',
                      label: 'UPS'
                    },
                    {
                      value: 'USPS',
                      label: 'USPS'
                    }
                  ]}
                />
              </Col>
              <Col span={12}>
                <div className={styles.formLabel}>TRACKING ID</div>
                <Input
                  value={packageItem.trackingId}
                  onChange={(e) => {
                    handleChange(e.target.value, packageIndex, 'trackingId')
                  }}
                />
              </Col>
            </Row>
          </div>
        )
      })}
      <Row justify="space-between">
        <Col>
          <Button onClick={() => addPackage()}>Add package</Button>
        </Col>
        <Col>
          <Button type="primary">Submit</Button>
        </Col>
      </Row>
    </div>
  )
}

export default DrawerShip
