import React, { useState, useEffect } from "react"
// components
import { Checkbox, Row, Col, Popover, Button } from "antd"
import { PlusCircleFilled } from "@ant-design/icons"
// css
import styles from "../index.module.less"

// main
const DrawerDetail = ({ info }) => {
  const [productList, setProduct] = useState([])
  const changePart = (key, value, productIndex, partIndex) => {
    setProduct((productList) => {
      const newProductList = [...productList]
      newProductList[productIndex].Parts[partIndex][key] = value
      return newProductList
    })
  }
  useEffect(() => {
    setProduct(() => {
      const order = JSON.parse(JSON.stringify(info))
      order.packageInfo.forEach((packageItem) => {
        order.products.forEach((productItem) => {
          if (packageItem.systemIds.includes(productItem.SystemId)) {
            productItem.carrier = packageItem.carrier
            productItem.trackId = packageItem.trackId
            productItem.Shipped = true
          }
          productItem.Parts = productItem.Parts.map((i) => {
            return {
              ...i,
              activeLwh: "in.",
              activeWeight: "lbs."
            }
          })
        })
      })
      return order.products
    })
  }, [info])
  return (
    <div className={styles.drawer}>
      <div className={styles.headerWrap} gutter={[0, 16]}>
        <div
          span={24}
          className={styles.orderTitle}
        >{`Order #WS${info.id}`}</div>
      </div>
      <div className={styles.title}>CUSTOMER INFO</div>
      <div className={styles.customerInfo}>
        <div className={styles.name}>{info.customerInfo.fullName}</div>
        <div>{info.customerInfo.address1}</div>
        {info.customerInfo.address2 && (
          <div className={styles.address}>{info.customerInfo.address2}</div>
        )}
        <div>
          {info.customerInfo.city}, {info.customerInfo.state}{" "}
          {info.customerInfo.zipcode}
        </div>
        <div>{info.customerInfo.phone}</div>
      </div>
      <div className={styles.title}>PRODUCTS</div>
      <div className={styles["product-description"]}>
        Select products to see rate if they’re shipped together:
      </div>
      {productList.map((productItem, productIndex) => {
        return (
          <div key={productItem.SKU + productIndex} className={styles.product}>
            <div
              className={styles.nameHeaderWrap}
              style={{
                borderBottom: `${
                  productItem.Shipped ? "unset" : "1px solid #e6e6e6"
                }`
              }}
            >
              <Checkbox disabled={productItem.Shipped} />
              <span
                className={styles.productName}
                style={{
                  color: `${productItem.Shipped ? "#C4C4C4" : "#262626"}`
                }}
              >
                {productItem.Name}{" "}
                {productItem.Shipped && <span> - Shipped</span>}
              </span>
            </div>
            {!productItem.Shipped && (
              <>
                <Row gutter={10} style={{ marginBottom: "17px" }}>
                  <Col span={8}>PARTS NAME</Col>
                  <Col span={4}>COUNT</Col>
                  <Col span={6}>LOCATION</Col>
                  <Col span={6}>BARCODE</Col>
                </Row>
                <Row gutter={[0, 16]}>
                  {productItem.Parts.map((item) => {
                    return (
                      <Col span={24} key={item.Inventory.SKU}>
                        <Row gutter={10}>
                          <Col span={8}>{item.Inventory.Name}</Col>
                          <Col span={4}>{item.Quantity}</Col>
                          <Col span={6}>
                            {item.Inventory.Location[0]}
                            {item.Inventory.Location.length > 1 && (
                              <Popover
                                content={
                                  <>{item.Inventory.Location.join(";")}</>
                                }
                                trigger="hover"
                              >
                                <PlusCircleFilled
                                  style={{
                                    marginLeft: "4px",
                                    fontSize: "18px",
                                    marginTop: "2px"
                                  }}
                                />
                              </Popover>
                            )}
                          </Col>
                          <Col span={6}>{item.Inventory.Barcode}</Col>
                        </Row>
                      </Col>
                    )
                  })}
                </Row>
                <Row gutter={[0, 16]}>
                  <Col span={24}>
                    <Row style={{ marginTop: "16px" }} gutter={10}>
                      <Col span={12}>DIMESIONS</Col>
                      <Col span={12}>WEIGHT</Col>
                    </Row>
                  </Col>
                  {productItem.Parts.map((item, partIndex) => {
                    return (
                      <Col span={24} key={item.Inventory.SKU}>
                        <Row gutter={10}>
                          <Col span={12}>
                            {item.activeLwh == "in."
                              ? item.Inventory.attr.length
                              : Number(
                                  item.Inventory.attr.length * 2.54
                                ).toFixed(1)}{" "}
                            X{" "}
                            {item.activeLwh == "in."
                              ? item.Inventory.attr.width
                              : Number(
                                  item.Inventory.attr.width * 2.54
                                ).toFixed(1)}{" "}
                            X{" "}
                            {item.activeLwh == "in."
                              ? item.Inventory.attr.height
                              : Number(
                                  item.Inventory.attr.height * 2.54
                                ).toFixed(1)}
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
                          </Col>
                          <Col span={12}>
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
                          </Col>
                        </Row>
                      </Col>
                    )
                  })}
                  <Button className={styles.rateBtn}>Rate</Button>
                </Row>
              </>
            )}
          </div>
        )
      })}
      <Row justify="space-between" align="middle" style={{ marginTop: "33px" }}>
        <Col
          className={styles.title}
          style={{ textDecorationLine: "none", margin: "0" }}
        >
          SELECTED PRODUCTS RATE
        </Col>
        <Col>
          <Button className={styles.rateBtn}>Rate</Button>
        </Col>
      </Row>
    </div>
  )
}

export default DrawerDetail
