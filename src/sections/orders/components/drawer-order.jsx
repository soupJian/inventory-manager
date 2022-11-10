import React, { useState } from 'react'
import { Row, Col, Button, Modal, Space } from 'antd'
// js
import { formatMoney } from '../../../utils/formatMoney'
import { formatTimeStr } from '../../../utils/formatTime'
// css
import styles from '../index.module.less'

const order = {
  OrderInfo: {
    // 订单信息
    OrderNo: '12345', // 订单编号
    Payment: 200, // 消费金额
    Created: new Date(), // 订单创建时间
    // 目前已知设计稿 四种 ，需要 与 UI 确认，每一个包裹状态改变，如果改变订单状态需要确认
    OrderStatus: '', // 订单状态 Shipped 、Processing、 Delivered  、In Transit(最后两个状态需要去物流中心主抓取)
    Subtotal: 100, // 折扣前 的价格
    Discount: 20,
    DiscountId: 1,
    ShippingCost: 30,
    Tax: 10,
    TotalPrice: 12345 // 最终支付金额
  },
  CustomerInfo: {
    // 购买人 相关信息
    FullName: 'John Doe',
    Phone: '123 456 7890',
    Address1: '1234 Preserve Road',
    Address2: '',
    City: 'lrvine', // 城市
    State: 'CA', // 州
    ZipCode: '12345', // 邮编
    Email: 'soupjian@163.com'
  },
  PackageInfo: [
    // 包裹相关信息
    {
      Carrier: 'Fedex', // 快递公司  Fedex，UPS，USPS
      TrackId: '1Z923875HY284K727213', // 快递单号
      Status: 'Shipped', // 单独的包裹状态 Shipped 和 Not Shipped
      shipDate: new Date(), // 以仓库人员 提交时间为准 还是 邮寄时间为准 待确认
      DeleveredTime: new Date() // 送达时间
    },
    {
      Carrier: 'Fedex', // 快递公司  Fedex，UPS，USPS
      TrackId: '1Z923875H27213', // 快递单号
      Status: 'Shipped', // 单独的包裹状态 Shipped 和 Not Shipped
      shipDate: new Date(), // 以仓库人员 提交时间为准 还是 邮寄时间为准 待确认
      DeleveredTime: new Date() // 送达时间
    }
  ],
  ProductInfo: [
    // 订单涉及到的 产品
    {
      Name: 'Kapri Umbrella Aqua 7.5 ft',
      SKU: 'JZ-1640',
      Price: 300.0,
      Discount: 90.0,
      Quanity: 2, // 数量
      Parts: [
        {
          SKU: '',
          Quanity: '',
          Inventory: {}
        }
      ]
    }
  ],
  InvoiceInfo: {
    // 发票相关信息
    InvoiceNumber: '123',
    invoiceDate: '2022-11-09',
    invoiceNotes: ''
  },
  BillingInfo: {
    // 计费信息
    FullName: 'John Doe',
    Phone: '123 456 7890',
    Address1: '1234 Preserve Road',
    Address2: '',
    City: 'lrvine', // 城市
    State: 'CA', // 州
    ZipCode: '12345', // 邮编
    Email: 'soupjian@163.com'
  }
}
const discountList = [
  {
    id: 1,
    Name: 'welcome10'
  },
  {
    id: 2,
    Name: '10% off'
  },
  {
    id: 3,
    Name: '50% off'
  }
]

// main
/**
 * type current 和 history
 */
const DrawerOrder = ({ type }) => {
  const [showModal, setShowModal] = useState(false)
  // 取消订单
  const handleCancelOrder = () => {
    console.log('1234')
  }
  return (
    <>
      <div className={styles.drawer}>
        <Row className={styles.headerWrap} gutter={[0, 16]}>
          <Col
            span={24}
            className={styles.orderTitle}
          >{`Order #${order.OrderInfo.OrderNo}`}</Col>
          <Col
            span={24}
            className={styles.orderSubTitle}
          >{`Created on: ${formatTimeStr(
            order.OrderInfo.Created,
            'DD/MM/YY hh:mm a'
          )}`}</Col>
          {type == 'history' && (
            <Col span={24}>
              <Row className={styles.orderSubTitle}>
                <Col>Delivered on: </Col>
                <Col style={{ marginLeft: '5px' }}>
                  <Row gutter={[0, 8]}>
                    {order.PackageInfo.map((packageItem) => {
                      return (
                        <Col span={24} key={packageItem.TrackId}>
                          {formatTimeStr(
                            order.OrderInfo.Created,
                            'DD/MM/YY hh:mm a'
                          )}{' '}
                          <span style={{ color: '#2C88DD' }}>
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
                {order.CustomerInfo.FullName}
              </Col>
              <Col span={24}>{order.BillingInfo.Address1}</Col>
              {order.BillingInfo.Address2 && (
                <Col span={24}>{order.BillingInfo.Address2}</Col>
              )}
              <Col span={24}>
                {order.BillingInfo.City},{order.BillingInfo.State}{' '}
                {order.BillingInfo.ZipCode}
              </Col>
              <Col span={24}>{order.BillingInfo.Phone}</Col>
              <Col span={24}>{order.BillingInfo.Email}</Col>
            </Row>
          </Col>
          <Col span={12}>
            <div className={styles.title}>SHIPPING INFO</div>
            <Row className={styles.infoDescription}>
              <Col span={24} className={styles.name}>
                {order.CustomerInfo.FullName}
              </Col>
              <Col span={24}>{order.CustomerInfo.Address1}</Col>
              {order.CustomerInfo.Address2 && (
                <Col span={24}>{order.CustomerInfo.Address2}</Col>
              )}
              <Col span={24}>
                {order.CustomerInfo.City},{order.CustomerInfo.State}{' '}
                {order.CustomerInfo.ZipCode}
              </Col>
              <Col span={24}>{order.CustomerInfo.Phone}</Col>
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
            {order.ProductInfo.map((productItem) => {
              return (
                <tr key={productItem.SKU}>
                  <td>
                    <div className={styles.name}>{productItem.Name}</div>
                    <div className={styles.sku}>SKU: {productItem.SKU}</div>
                  </td>
                  <td>{productItem.Quanity}</td>
                  <td>${formatMoney(productItem.Price.toFixed(2))}</td>
                  <td>
                    {productItem.Discount > 0 ? '-' : ''}$
                    {formatMoney(productItem.Discount.toFixed(2))}
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
                  order.OrderInfo.DiscountId == discountItem.id
                    ? styles.activeDiscount
                    : ''
                }`}
              >
                {discountItem.Name}
                {index != discountList.length - 1 &&
                order.OrderInfo.DiscountId != discountItem.id
                  ? ';'
                  : ''}
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
                  ${formatMoney(order.OrderInfo.Subtotal)}
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col className={styles.summaryLabel}>Discount</Col>
                <Col className={styles.summaryValue}>
                  {order.OrderInfo.Discount > 0 ? '-' : ''}$
                  {formatMoney(order.OrderInfo.Discount)}
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col className={styles.summaryLabel}>Shipping cost</Col>
                <Col className={styles.summaryValue}>
                  ${formatMoney(order.OrderInfo.ShippingCost)}
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col className={styles.summaryLabel}>Tax</Col>
                <Col className={styles.summaryValue}>
                  ${formatMoney(order.OrderInfo.Tax)}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row justify="space-between" align="middle">
          <Col className={styles.totalLabel}>Total</Col>
          <Col className={styles.summaryValue}>
            ${formatMoney(order.OrderInfo.TotalPrice)}
          </Col>
        </Row>
        {type == 'current' && (
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
      {type == 'current' && (
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
