import React, { useState } from "react"
import { Row, Col, Button, Modal, Space } from "antd"
// js
import { formatMoney } from "@/utils/formatMoney"
import { formatTimeStr } from "@/utils/formatTime"
// css
import styles from "../index.module.less"

const discountList = [
  {
    id: 1,
    Name: "welcome10"
  },
  {
    id: 2,
    Name: "10% off"
  },
  {
    id: 3,
    Name: "50% off"
  }
]

// main
/**
 * type current 和 history
 */
const DrawerOrder = ({ info, type }) => {
  const [showModal, setShowModal] = useState(false)
  // 取消订单
  const handleCancelOrder = () => {
    console.log("1234")
  }
  // const deliveredTime = info.packageInfo.
  return (
    <>
      <div className={styles.drawer}>
        <Row className={styles.headerWrap} gutter={[0, 16]}>
          <Col
            span={24}
            className={styles.orderTitle}
          >{`Order #${info.id}`}</Col>
          <Col
            span={24}
            className={styles.orderSubTitle}
          >{`Created on: ${formatTimeStr(
            info.created,
            "DD/MM/YY hh:mm a"
          )}`}</Col>
          {type == "history" && (
            <Col span={24}>
              <Row className={styles.orderSubTitle}>
                <Col>Delivered on: </Col>
                <Col style={{ marginLeft: "5px" }}>
                  <Row gutter={[0, 8]}>
                    {info.packageInfo.map((packageItem) => {
                      return (
                        <Col span={24} key={packageItem.TrackId}>
                          {formatTimeStr(info.created, "DD/MM/YY hh:mm a")}{" "}
                          <span style={{ color: "#2C88DD" }}>
                            {packageItem.Carrier}
                          </span>
                        </Col>
                      )
                    })}
                  </Row>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
        <Row className={styles.infoWrap}>
          <Col span={12}>
            <div className={styles.title}>BILLING INFO</div>
            <Row className={styles.infoDescription}>
              <Col span={24} className={styles.name}>
                {info.customerInfo.fullName}
              </Col>
              <Col span={24}>{info.billingInfo.address1}</Col>
              {info.billingInfo.address2 && (
                <Col span={24}>{info.billingInfo.address2}</Col>
              )}
              <Col span={24}>
                {info.customerInfo.city}, {info.customerInfo.state}{" "}
                {info.customerInfo.zipcode}
              </Col>
              <Col span={24}>{info.billingInfo.phone}</Col>
              <Col span={24}>{info.billingInfo.email}</Col>
            </Row>
          </Col>
          <Col span={12}>
            <div className={styles.title}>SHIPPING INFO</div>
            <Row className={styles.infoDescription}>
              <Col span={24} className={styles.name}>
                {info.customerInfo.fullName}
              </Col>
              <Col span={24}>{info.customerInfo.address1}</Col>
              {info.customerInfo.address2 && (
                <Col span={24}>{info.customerInfo.address2}</Col>
              )}
              <Col span={24}>
                {info.customerInfo.city}, {info.customerInfo.state}{" "}
                {info.customerInfo.zipcode}
              </Col>
              <Col span={24}>{info.customerInfo.phone}</Col>
            </Row>
          </Col>
        </Row>
        <table className={styles.productTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <td>ITEM</td>
              <td>QTY</td>
              <td>PRICE</td>
              <td>DISCOUNT</td>
            </tr>
          </thead>
          <tbody>
            {info.products.map((productItem) => {
              return (
                <tr key={productItem.SKU}>
                  <td>
                    <div className={styles.name}>{productItem.Name}</div>
                    <div className={styles.sku}>SKU: {productItem.SKU}</div>
                  </td>
                  <td>{productItem.Quantity}</td>
                  <td>${formatMoney(productItem.Price.toFixed(2))}</td>
                  <td>
                    {productItem.Discount > 0 ? "-" : ""}$0
                    {/* {formatMoney(productItem.Discount.toFixed(2))} */}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Row align="middle" className={styles.discountWrap}>
          <Col className={styles.discountLabel}>Discount:</Col>
          {discountList.map((discountItem, index) => {
            return (
              <Col
                key={discountItem.id}
                className={`${styles.discountName} ${
                  info.DiscountId == discountItem.id
                    ? styles.activeDiscount
                    : ""
                }`}
              >
                {discountItem.Name}
                {index != discountList.length - 1 &&
                info.DiscountId != discountItem.id
                  ? ";"
                  : ""}
              </Col>
            )
          })}
        </Row>
        <div className={styles.orderSummary}>
          <div span={24} className={styles.title}>
            ORDER SUMMARY
          </div>
          <Row gutter={[0, 19]}>
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col className={styles.summaryLabel}>Items Subtotal</Col>
                <Col className={styles.summaryValue}>
                  ${formatMoney(info.subtotal)}
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col className={styles.summaryLabel}>Discount</Col>
                <Col className={styles.summaryValue}>
                  {info.Discount > 0 ? "-" : ""}${formatMoney(info.Discount)}
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col className={styles.summaryLabel}>Shipping cost</Col>
                <Col className={styles.summaryValue}>
                  ${formatMoney(info.shippingCost)}
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col className={styles.summaryLabel}>Tax</Col>
                <Col className={styles.summaryValue}>
                  ${formatMoney(info.tax)}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row justify="space-between" align="middle">
          <Col className={styles.totalLabel}>Total</Col>
          <Col className={styles.summaryValue}>
            ${formatMoney(info.totalAmount)}
          </Col>
        </Row>
        {type == "current" && (
          <Row justify="end" className={styles.footerWrap}>
            <Col>
              <Button
                type="primary"
                className={styles.cancelOrderBtn}
                onClick={() => setShowModal(true)}
              >
                Cancle Order
              </Button>
            </Col>
          </Row>
        )}
      </div>
      {type == "current" && (
        <Modal
          centered
          title=""
          open={showModal}
          okText="Save"
          footer={false}
          // onOK={() => ()}
          onCancel={() => setShowModal(false)}
          wrapClassName={styles.modal}
        >
          <div className={styles.modalSubTitle}>
            Are you sure you want to cancel this order?
          </div>
          <Row justify="center">
            <Col>
              <Space>
                <Button
                  type="primary"
                  className={styles.confirmBtn}
                  onClick={() => handleCancelOrder()}
                >
                  YES
                </Button>
                <Button
                  className={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                >
                  NO
                </Button>
              </Space>
            </Col>
          </Row>
        </Modal>
      )}
    </>
  )
}

export default DrawerOrder
