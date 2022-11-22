import React from "react"
// components
import { Row, Col } from "antd"
// css
import styles from "../index.module.less"

// main
const DrawerDetail = ({ info }) => {
  const order = JSON.parse(JSON.stringify(info))
  order.packageInfo.forEach((packageItem) => {
    order.products.forEach((productItem) => {
      if (packageItem.systemIds.includes(productItem.SystemId)) {
        productItem.cappier = packageItem.cappier
        productItem.trackingId = packageItem.trackingId
        productItem.Shipped = true
      }
    })
  })
  return (
    <div className={styles.drawer}>
      <div className={styles.headerWrap} gutter={[0, 16]}>
        <div
          span={24}
          className={styles.orderTitle}
        >{`Order #WS${order.id}`}</div>
      </div>
      <div className={styles.title}>CUSTOMER INFO</div>
      <div className={styles.customerInfo}>
        <div className={styles.name}>{order.customerInfo.fullName}</div>
        <div>{order.customerInfo.address1}</div>
        {order.customerInfo.address2 && (
          <div className={styles.address}>{order.customerInfo.address2}</div>
        )}
        <div>
          {order.customerInfo.city}, {order.customerInfo.state}{" "}
          {order.customerInfo.zipcode}
        </div>
        <div>{order.customerInfo.phone}</div>
      </div>
      <div className={styles.title}>PRODUCTS</div>
      {order.products.map((productItem) => {
        return (
          <div key={productItem.SKU} className={styles.product}>
            <div
              className={styles.nameHeaderWrap}
              style={{
                borderBottom: `${
                  productItem.Shipped ? "1px solid #e6e6e6" : "unset"
                }`
              }}
            >
              <span className={styles.productName} style={{ paddingLeft: "0" }}>
                {productItem.Name} -
                {productItem.Shipped && (
                  <span style={{ color: "#2EBEBD" }}> Shipped</span>
                )}
                {!productItem.Shipped && (
                  <span style={{ color: "#C4C4C4" }}> Not Shipped</span>
                )}
              </span>
            </div>
            {productItem.Shipped && (
              <Row className={styles.trackInfo}>
                <Col>
                  Carrier:{" "}
                  <span style={{ color: "#000" }}>{productItem.cappier}</span>
                </Col>
                <Col style={{ marginLeft: "20px" }}>
                  Tracking:{" "}
                  <span style={{ color: "#2C88DD" }}>
                    {productItem.cappier == "Fedex" && (
                      <a
                        href={`https://www.fedex.com/fedextrack/?trknbr=${productItem.trackingId}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {productItem.trackingId}
                      </a>
                    )}
                    {productItem.cappier == "UPS" && (
                      <a
                        href={`https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=${productItem.trackingId}&requester=ST/`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {productItem.trackingId}
                      </a>
                    )}
                    {productItem.cappier == "USPS" && (
                      <a
                        href={`https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=${productItem.trackingId}%2C&tABt=false`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {productItem.trackingId}
                      </a>
                    )}
                  </span>
                </Col>
              </Row>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default DrawerDetail
