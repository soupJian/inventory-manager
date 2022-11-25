import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
// components
import { Select, Row, Col, Input, Space, Checkbox, Button } from "antd"
// api
import { updateOrder } from "@/service/orders"
// js
import { toggleFullLoading } from "@/store/slices/globalSlice"
// css
import styles from "../index.module.less"

// main
const DrawerShip = ({ info, closedDrawer }) => {
  const dispatch = useDispatch()
  const [packageInfo, setPackageInfo] = useState([])
  // 过滤掉没有发货的 product
  const [unShippedProduct, setUnshippedProduct] = useState([])
  // 存放已经被勾选的 products ，存储SKU和当前是第几个package,
  // 当前的package中的是可以勾选和取消
  // 不在当前的package disabled
  const [selectedProduct, setSelectedProduct] = useState([])
  const handleChange = (value, index, key) => {
    setPackageInfo((packageInfo) => {
      const newPackageInfo = JSON.parse(JSON.stringify(packageInfo))
      newPackageInfo[index][key] = value
      return newPackageInfo
    })
  }
  // checkbox product
  const handleSelectProduct = (value, productItem, index) => {
    setPackageInfo((packageInfo) => {
      const newPackageInfo = JSON.parse(JSON.stringify(packageInfo))
      // 勾选
      if (value) {
        newPackageInfo[index].systemIds.push(productItem.SystemId)
      } else {
        const i = newPackageInfo[index].systemIds.findIndex(
          (item) => item == productItem.SystemId
        )
        newPackageInfo[index].systemIds.splice(i, 1)
      }
      return newPackageInfo
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
    setPackageInfo((packageInfo) => {
      const newPackageInfo = JSON.parse(JSON.stringify(packageInfo))
      newPackageInfo.push({
        carrier: "",
        shippedTime: new Date(),
        status: "shipped",
        systemIds: [],
        trackId: ""
      })
      return newPackageInfo
    })
  }
  const submit = async () => {
    const newPackageInfo = packageInfo.filter(
      (item) =>
        item.carrier != "" && item.systemIds.length > 0 && item.trackId != ""
    )
    if (newPackageInfo.length == 0) {
      return
    }
    const order = JSON.parse(JSON.stringify(info))
    order.packageInfo = order.packageInfo.concat(newPackageInfo)
    dispatch(toggleFullLoading(true))
    await updateOrder(order)
    dispatch(toggleFullLoading(false))
    closedDrawer()
  }
  useEffect(() => {
    addPackage()
    if (info.packageInfo.length == 0) {
      setUnshippedProduct(info.products)
    } else {
      const arr = info.packageInfo.reduce(
        (pre, cur) => {
          return pre.systemIds.concat(cur.systemIds)
        },
        {
          systemIds: []
        }
      )
      // 已经发货的 product
      const newArr = Array.from(new Set(arr))
      setUnshippedProduct(() => {
        return info.products.filter((item) => !newArr.includes(item.SystemId))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.drawerShip}>
      <div className={styles.headerWrap} gutter={[0, 16]}>
        <div
          span={24}
          className={styles.orderTitle}
        >{`Shipping Order #WS${info.id}`}</div>
      </div>
      {packageInfo.map((packageItem, packageIndex) => {
        return (
          <div key={packageItem.shippedTime} style={{ marginBottom: "40px" }}>
            <div className={styles.title}>Package {packageIndex + 1}</div>
            <div className={styles["product-description"]}>
              Select the product(s) to ship in one package:
            </div>
            <Row gutter={[0, 32]} style={{ marginTop: "40px" }}>
              {unShippedProduct.map((productItem) => {
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
                        checked={packageItem.systemIds.includes(
                          productItem.SystemId
                        )}
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
                              ? "#C4C4C4"
                              : "#262626"
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
                  style={{ width: "100%" }}
                  size="large"
                  onChange={(value) =>
                    handleChange(value, packageIndex, "carrier")
                  }
                  value={packageItem.carrier}
                  options={[
                    {
                      value: "Fedex",
                      label: "Fedex"
                    },
                    {
                      value: "UPS",
                      label: "UPS"
                    },
                    {
                      value: "USPS",
                      label: "USPS"
                    }
                  ]}
                />
              </Col>
              <Col span={12}>
                <div className={styles.formLabel}>TRACKING ID</div>
                <Input
                  size="large"
                  className={styles.ipt}
                  value={packageItem.trackId}
                  onChange={(e) => {
                    handleChange(e.target.value, packageIndex, "trackId")
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
