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
  // 存放已经被勾选的 products ，存储SKU和当前是第几个package,
  // 当前的package中的是可以勾选和取消
  // 不在当前的package disabled
  const [selectedProduct, setSelectedProduct] = useState([])
  const handleChange = (value, index, key) => {
    setPackageList((list) => {
      const newList = [...list]
      newList[index][key] = value
      return newList
    })
  }
  // checkbox product
  const handleSelectProduct = (value, productItem, index) => {
    setPackageList((list) => {
      const newList = [...list]
      // 勾选
      if (value) {
        newList[index].selectProduct.push(productItem.SKU)
      } else {
        const i = newList[index].selectProduct.findIndex(
          (item) => item == productItem.SKU
        )
        newList[index].selectProduct.splice(i, 1)
      }
      console.log('packageList----------')
      console.log(newList)
      return newList
    })
    // 已经被勾选的 checkbox
    setSelectedProduct((list) => {
      const newList = [...list]
      if (value) {
        newList.push({
          SKU: productItem.SKU,
          index
        })
      } else {
        const i = newList.findIndex((item) => item == productItem.SKU)
        newList.splice(i, 1)
      }
      console.log(newList)
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
  const submit = () => {
    console.log(packageList)
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
                    <Space align="center">
                      <Checkbox
                        disabled={
                          selectedProduct.findIndex(
                            (selectItem) =>
                              selectItem.SKU == productItem.SKU &&
                              selectItem.index != packageIndex
                          ) >= 0
                        }
                        onChange={(e) =>
                          handleSelectProduct(
                            e.target.checked,
                            productItem,
                            packageIndex
                          )
                        }
                      />
                      <span
                        style={{
                          color: `${
                            selectedProduct.findIndex(
                              (selectItem) =>
                                selectItem.SKU == productItem.SKU &&
                                selectItem.index != packageIndex
                            ) >= 0
                              ? '#C4C4C4'
                              : '#262626'
                          }`
                        }}
                      >
                        {productItem.Name}
                      </span>
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
                  size="large"
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
                  size="large"
                  className={styles.ipt}
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
          <Button className={styles.btn} onClick={() => addPackage()}>
            Add package
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            className={styles.btn}
            onClick={() => submit()}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default DrawerShip
