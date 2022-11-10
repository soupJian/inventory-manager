import React, { useState } from 'react'
// components
import { Checkbox, Row, Col, Popover, Button, Space } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
// css
import styles from '../index.module.less'

const staticProduct = [
  {
    Name: 'Y6 Canopy Tent Blue 13’x13’',
    Part: [
      {
        Inventory: {
          SKU: 'TJ-2',
          Name: '212345123786782121234512378678212123451237867821',
          Barcode: 'TJ-212345672345',
          Location: ['A1-R1', 'A1-R2'],
          attr: {
            height: 2,
            length: 2,
            weight: 2,
            width: 1
          }
        },
        SKU: 'TJ-2',
        Quantity: 3
      },
      {
        Inventory: {
          SKU: 'TJ-3',
          Name: 'TJ-3',
          Barcode: 'TJ-3',
          Location: ['A1-R1', 'A1-R2'],
          attr: {
            height: 2,
            length: 2,
            weight: 2,
            width: 1
          }
        },
        SKU: 'TJ-3',
        Quantity: 2
      }
    ],
    SKU: '123',
    Quantity: 0,
    Shipped: false,
    cappier: '',
    trackingId: ''
  },
  {
    Name: 'test',
    Part: [
      {
        Inventory: {
          SKU: 'TJ-2',
          Name: 'TJ-2',
          Barcode: 'TJ-2',
          Location: ['A1-R1'],
          attr: {
            height: 2,
            length: 2,
            weight: 2,
            width: 1
          }
        },
        SKU: 'TJ-2',
        Quantity: 1
      },
      {
        Inventory: {
          SKU: 'TJ-3',
          Name: 'TJ-3',
          Barcode: 'TJ-3',
          Location: ['A1-R1', 'A2-R2'],
          attr: {
            height: 2,
            length: 2,
            weight: 2,
            width: 1
          }
        },
        SKU: 'TJ-3',
        Quantity: 3
      }
    ],
    SKU: '1234',
    Quantity: 0,
    Shipped: true,
    cappier: 'Fedex',
    trackingId: '1234567890'
  },
  {
    Name: 'soupjian-test',
    Part: [
      {
        Inventory: {
          SKU: 'soupjian-test',
          Name: 'soupjian-test',
          Barcode: 'soupjian-test',
          Location: ['A1-R1'],
          attr: {
            height: 2,
            length: 2,
            weight: 2,
            width: 1
          }
        },
        SKU: 'soupjian-test',
        Quantity: 1
      },
      {
        Inventory: {
          SKU: 'TJ-3',
          Name: 'TJ-3',
          Barcode: 'TJ-3',
          Location: ['A1-R1', 'A2-R2'],
          attr: {
            height: 2,
            length: 2,
            weight: 2,
            width: 1
          }
        },
        SKU: 'TJ-3',
        Quantity: 3
      }
    ],
    SKU: 'soupjian-test',
    Quantity: 9,
    Shipped: false,
    cappier: '',
    trackingId: ''
  }
]
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

// main
const DrawerDetail = ({ info, productList = staticProduct }) => {
  return (
    <div className={styles.drawer}>
      <div className={styles.headerWrap} gutter={[0, 16]}>
        <div
          span={24}
          className={styles.orderTitle}
        >{`Order #WS${order.OrderInfo.OrderNo}`}</div>
      </div>
      <div className={styles.title}>CUSTOMER INFO</div>
      <div className={styles.customerInfo}>
        <div className={styles.name}>
          {info.LastName} {info.FirstName}
        </div>
        <div className={styles.address}>
          {info.City}, {info.State.toUpperCase()}
        </div>
        <div className={styles.phone}>
          {/* {info.City} {info.State.toUpperCase()} */}
        </div>
      </div>
      <div className={styles.title}>PRODUCTS</div>
      {productList.map((productItem) => {
        return (
          <div key={productItem.SKU} className={styles.product}>
            <div
              className={styles.nameHeaderWrap}
              style={{
                borderBottom: `${
                  productItem.Shipped ? '1px solid #e6e6e6' : 'unset'
                }`
              }}
            >
              <span className={styles.productName} style={{ paddingLeft: '0' }}>
                {productItem.Name} -
                {productItem.Shipped && (
                  <span style={{ color: '#2EBEBD' }}> Shipped</span>
                )}
                {!productItem.Shipped && (
                  <span style={{ color: '#C4C4C4' }}> Not Shipped</span>
                )}
              </span>
            </div>
            {productItem.Shipped && (
              <Row className={styles.trackInfo}>
                <Col>
                  Carrier:{' '}
                  <span style={{ color: '#000' }}>{productItem.cappier}</span>
                </Col>
                <Col style={{ marginLeft: '20px' }}>
                  Tracking:{' '}
                  <span style={{ color: '#2EBEBD' }}>
                    {productItem.trackingId}
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
