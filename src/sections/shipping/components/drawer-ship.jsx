import React, { useState, useEffect } from 'react'
// components
import { Select, Row, Col, Input, Space, Checkbox, Button } from 'antd'
// js
import { v4 as uuidv4 } from 'uuid'

// css
import styles from '../index.module.less'

// main
const DrawerShip = ({ info }) => {
  const [order, setOrder] = useState(info)
  // 存放已经被勾选的 products ，存储SKU和当前是第几个package,
  // 当前的package中的是可以勾选和取消
  // 不在当前的package disabled
  const [selectedProduct, setSelectedProduct] = useState([])
  const handleChange = (value, index, key) => {
    setOrder((oldOrder) => {
      const newOrder = JSON.parse(JSON.stringify(oldOrder))
      newOrder.packageInfo[index][key] = value
      return newOrder
    })
  }
  // checkbox product
  const handleSelectProduct = (value, productItem, index) => {
    setOrder((oldOrder) => {
      const newOrder = JSON.parse(JSON.stringify(oldOrder))
      // 勾选
      if (value) {
        newOrder.packageInfo[index].selectProduct.push(productItem.SystemId)
      } else {
        const i = newOrder.packageInfo[index].selectProduct.findIndex(
          (item) => item == productItem.SystemId
        )
        newOrder.packageInfo[index].selectProduct.splice(i, 1)
      }
      return newOrder
    })
    // 已经被勾选的 checkbox
    setSelectedProduct((list) => {
      const newList = [...list]
      if (value) {
        newList.push({
          SystemId: productItem.SystemId,
          index
        })
      } else {
        const i = newList.findIndex((item) => item == productItem.SystemId)
        newList.splice(i, 1)
      }
      return newList
    })
  }
  // add
  const addPackage = () => {
    setOrder((oldOrder) => {
      const newOrder = JSON.parse(JSON.stringify(oldOrder))
      newOrder.packageInfo.push({
        id: uuidv4(),
        selectProduct: [],
        cappier: '',
        trackingId: ''
      })
      return newOrder
    })
  }
  const submit = () => {
    console.log(order)
  }
  useEffect(() => {
    if (info.packageInfo.length == 0) {
      setOrder(() => {
        const newOrder = JSON.parse(JSON.stringify(info))
        newOrder.packageInfo.push({
          id: uuidv4(),
          selectProduct: [],
          cappier: '',
          trackingId: ''
        })
        return newOrder
      })
    } else {
      setOrder(info)
    }
  }, [info])

  return (
    <div className={styles.drawerShip}>
      <div className={styles.headerWrap} gutter={[0, 16]}>
        <div
          span={24}
          className={styles.orderTitle}
        >{`Shipping Order #WS${order.id}`}</div>
      </div>
      {order.packageInfo.map((packageItem, packageIndex) => {
        return (
          <div key={packageItem.id} style={{ marginBottom: '40px' }}>
            <div className={styles.title}>Package {packageIndex + 1}</div>
            <div className={styles['product-description']}>
              Select the product(s) to ship in one package:
            </div>
            <Row gutter={[0, 32]} style={{ marginTop: '40px' }}>
              {order.products.map((productItem) => {
                return (
                  <Col span={24} key={productItem.SystemId}>
                    <Space align="center">
                      <Checkbox
                        disabled={
                          selectedProduct.findIndex(
                            (selectItem) =>
                              selectItem.SystemId == productItem.SystemId &&
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
                                selectItem.SystemId == productItem.SystemId &&
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
