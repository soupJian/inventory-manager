import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
// components
import {
  Select,
  Row,
  Col,
  Input,
  Space,
  Checkbox,
  Button,
  Divider,
  Modal,
  Form
} from "antd"
import { DownOutlined } from "@ant-design/icons"
// api
import { updateOrder } from "@/service/orders"
// js
import { toggleFullLoading } from "@/store/slices/globalSlice"
// css
import styles from "../index.module.less"
import { STATE } from "@/constants/pageConstants/shipping"

// main
const DrawerShip = ({ info }) => {
  console.log(info)
  const [productList, setProductList] = useState([])
  const [showAddressModal, setShowAddAddressModal] = useState(false)
  const [showShipBtn, setShowShipBtn] = useState(false)
  const handleSelectAddress = (value) => {
    console.log(`selected ${value}`)
  }
  const addFormFinish = (values) => {
    console.log(values)
  }
  const changePart = (key, value, productIndex, partIndex) => {
    setProductList((productList) => {
      const newProductList = [...productList]
      newProductList[productIndex].Parts[partIndex][key] = value
      return newProductList
    })
  }
  useEffect(() => {
    setProductList(() => {
      const list = []
      info.products.forEach((item) => {
        const len = item.Quantity
        for (let i = 0; i < len; i++) {
          list.push(item)
        }
      })
      console.log(list)
      info.products.map((productItem) => {
        productItem.Parts = productItem.Parts.map((i) => {
          return {
            ...i,
            activeLwh: "in.",
            activeWeight: "lbs."
          }
        })
      })
      return info.products
    })
  }, [info])
  return (
    <>
      <div className={styles.drawerShip}>
        <div className={styles.headerWrap} gutter={[0, 16]}>
          <div
            span={24}
            className={styles.orderTitle}
          >{`Shipping Order #WS${info.id}`}</div>
        </div>
        <div className={styles.title}>SHIP FROM</div>
        <Select
          size="large"
          className={styles.selectWrap}
          onChange={handleSelectAddress}
          options={[]}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: "8px 0"
                }}
              />
              <div
                className={styles.addText}
                onClick={() => setShowAddAddressModal(true)}
              >
                Add new address
              </div>
            </>
          )}
        />
        <div className={styles.title}>SHIP TO</div>
        <div className={styles.customerInfo}>
          <div className={styles.name}>{info.customerInfo.fullName}</div>
          <div>{info.customerInfo.address1}</div>
          {info.customerInfo.address2 && (
            <div>{info.customerInfo.address2}</div>
          )}
          <div>
            {info.customerInfo.city}, {info.customerInfo.state}{" "}
            {info.customerInfo.zipcode}
          </div>
          <div>{info.customerInfo.phone}</div>
          <div className={styles.addressDes}>This is a residential address</div>
        </div>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "24px" }}
        >
          <Col className={styles.title} style={{ marginBottom: 0 }}>
            PACKING LIST
          </Col>
          {showShipBtn && (
            <Col>
              <Button type="primary" className={styles.Btn}>
                Ship selected
              </Button>
            </Col>
          )}
        </Row>
        {productList.map((productItem, productIndex) => {
          return (
            <div key={productItem.SKU} className={styles.productsWrap}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Space>
                    <Checkbox />
                    <span className={styles.productName}>
                      {productItem.Name}
                    </span>
                  </Space>
                </Col>
                <Col className={styles.getLabel}>
                  <Space>
                    Get label <DownOutlined />
                  </Space>
                </Col>
              </Row>
              <table className={styles.productTable}>
                <tr>
                  <th></th>
                  <th>PARTS SKU</th>
                  <th>PARTS NAME</th>
                  <th>PARTS WEIGHT</th>
                </tr>
                {productItem.Parts.map((item, partIndex) => {
                  return (
                    <tr key={partIndex}>
                      <td>
                        <Checkbox />
                      </td>
                      <td>{item.Inventory.SKU}</td>
                      <td>{item.Inventory.Name}</td>
                      <td>
                        {item.activeWeight == "lbs."
                          ? item.Inventory.attr.weight
                          : Number(
                              item.Inventory.attr.weight * 0.45359237
                            ).toFixed(1)}
                        {item.activeWeight == "lbs." && (
                          <>
                            <span
                              className={
                                item.activeWeight == "kg"
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              style={{ margin: "0 5px" }}
                              onClick={() =>
                                changePart(
                                  "activeWeight",
                                  "lbs.",
                                  productIndex,
                                  partIndex
                                )
                              }
                            >
                              lbs.
                            </span>
                            <span
                              className={
                                item.activeWeight == "lbs."
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              onClick={() =>
                                changePart(
                                  "activeWeight",
                                  "kg",
                                  productIndex,
                                  partIndex
                                )
                              }
                            >
                              kg
                            </span>
                          </>
                        )}
                        {item.activeWeight == "kg" && (
                          <>
                            <span
                              className={
                                item.activeWeight == "lbs."
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              style={{ margin: "0 5px" }}
                              onClick={() =>
                                changePart(
                                  "activeWeight",
                                  "kg",
                                  productIndex,
                                  partIndex
                                )
                              }
                            >
                              kg
                            </span>
                            <span
                              className={
                                item.activeWeight == "kg"
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              onClick={() =>
                                changePart(
                                  "activeWeight",
                                  "lbs.",
                                  productIndex,
                                  partIndex
                                )
                              }
                            >
                              lbs.
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <th></th>
                  <th>PARTS DIMENSIONS</th>
                </tr>
                {productItem.Parts.map((item, partIndex) => {
                  return (
                    <tr key={partIndex}>
                      <td></td>
                      <td>
                        {item.activeLwh == "in."
                          ? item.Inventory.attr.length
                          : Number(item.Inventory.attr.length * 2.54).toFixed(
                              1
                            )}{" "}
                        X{" "}
                        {item.activeLwh == "in."
                          ? item.Inventory.attr.width
                          : Number(item.Inventory.attr.width * 2.54).toFixed(
                              1
                            )}{" "}
                        X{" "}
                        {item.activeLwh == "in."
                          ? item.Inventory.attr.height
                          : Number(item.Inventory.attr.height * 2.54).toFixed(
                              1
                            )}
                        {item.activeLwh == "in." && (
                          <>
                            <span
                              className={
                                item.activeLwh == "cm"
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              style={{ margin: "0 5px" }}
                              onClick={() =>
                                changePart(
                                  "activeLwh",
                                  "in.",
                                  productIndex,
                                  partIndex
                                )
                              }
                            >
                              in.
                            </span>
                            <span
                              className={
                                item.activeLwh == "in."
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              onClick={() =>
                                changePart(
                                  "activeLwh",
                                  "cm",
                                  productIndex,
                                  partIndex
                                )
                              }
                            >
                              cm
                            </span>
                          </>
                        )}
                        {item.activeLwh == "cm" && (
                          <>
                            <span
                              className={
                                item.activeLwh == "in."
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              style={{ margin: "0 5px" }}
                              onClick={() =>
                                changePart(
                                  "activeLwh",
                                  "cm",
                                  productIndex,
                                  partIndex
                                )
                              }
                            >
                              cm
                            </span>
                            <span
                              className={
                                item.activeLwh == "cm"
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              onClick={() =>
                                changePart(
                                  "activeLwh",
                                  "in.",
                                  productIndex,
                                  partIndex
                                )
                              }
                            >
                              in.
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </table>
            </div>
          )
        })}
      </div>
      <Modal
        title="Add New Address"
        open={showAddressModal}
        footer={null}
        centered
        destroyOnClose
        width="632px"
        onCancel={() => setShowAddAddressModal(false)}
      >
        <Form
          size="large"
          onFinish={addFormFinish}
          validateMessages={{
            required: "Required"
          }}
          className={styles.formWrap}
        >
          <Form.Item
            name="addressName"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Address Name/Contact Name" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input prefix="+1" placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="address1"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Address line 1" />
          </Form.Item>
          <Form.Item
            name="address2"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Address line 2" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="state"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Select options={STATE} placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="zipcode"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input placeholder="Zip code" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default DrawerShip
