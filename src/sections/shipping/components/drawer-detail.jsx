import React, { useState } from 'react'
// components
import { Checkbox, Row, Col, Popover, Button } from 'antd'
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
    Shipped: false
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
    Shipped: true
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
    Shipped: false
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
const DrawerDetail = ({ info }) => {
  const [productList, setProduct] = useState(
    staticProduct.map((item) => {
      return {
        ...item,
        Part: item.Part.map((i) => {
          return {
            ...i,
            activeLwh: 'in.',
            activeWeight: 'lbs.'
          }
        })
      }
    })
  )
  const changePart = (key, value, productIndex, partIndex) => {
    setProduct((productList) => {
      const newProductList = [...productList]
      newProductList[productIndex].Part[partIndex][key] = value
      return newProductList
    })
  }
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
      <div className={styles['product-description']}>
        Select products to see rate if they’re shipped together:
      </div>
      {productList.map((productItem, productIndex) => {
        return (
          <div key={productItem.SKU + productIndex} className={styles.product}>
            <div
              className={styles.nameHeaderWrap}
              style={{
                borderBottom: `${
                  productItem.Shipped ? 'unset' : '1px solid #e6e6e6'
                }`
              }}
            >
              <Checkbox disabled={productItem.Shipped} />
              <span
                className={styles.productName}
                style={{
                  color: `${productItem.Shipped ? '#C4C4C4' : '#262626'}`
                }}
              >
                {productItem.Name}{' '}
                {productItem.Shipped && <span> - Shipped</span>}
              </span>
            </div>
            {!productItem.Shipped && (
              <>
                <Row gutter={10} style={{ marginBottom: '17px' }}>
                  <Col span={8}>PARTS NAME</Col>
                  <Col span={4}>COUNT</Col>
                  <Col span={6}>LOCATION</Col>
                  <Col span={6}>BARCODE</Col>
                </Row>
                <Row gutter={[0, 16]}>
                  {productItem.Part.map((item) => {
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
                                  <>{item.Inventory.Location.join(';')}</>
                                }
                                trigger="hover"
                              >
                                <PlusCircleFilled
                                  style={{
                                    marginLeft: '4px',
                                    fontSize: '18px',
                                    marginTop: '2px'
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
                <Row gutter={10} style={{ margin: '17px 0' }}>
                  <Col span={12}>DIMESIONS</Col>
                  <Col span={12}>WEIGHT</Col>
                </Row>
                <Row gutter={[0, 16]}>
                  {productItem.Part.map((item, partIndex) => {
                    return (
                      <Col span={24} key={item.Inventory.SKU}>
                        <Row gutter={10}>
                          <Col span={12}>
                            {item.activeLwh == 'in.'
                              ? item.Inventory.attr.length
                              : Number(
                                  item.Inventory.attr.length * 2.54
                                ).toFixed(1)}{' '}
                            X{' '}
                            {item.activeLwh == 'in.'
                              ? item.Inventory.attr.width
                              : Number(
                                  item.Inventory.attr.width * 2.54
                                ).toFixed(1)}{' '}
                            X{' '}
                            {item.activeLwh == 'in.'
                              ? item.Inventory.attr.height
                              : Number(
                                  item.Inventory.attr.height * 2.54
                                ).toFixed(1)}
                            {item.activeLwh == 'in.' && (
                              <>
                                <span
                                  className={
                                    item.activeLwh == 'cm'
                                      ? `${styles.activeText} ${styles.pointer}`
                                      : `${styles.pointer}`
                                  }
                                  style={{ margin: '0 5px' }}
                                  onClick={() =>
                                    changePart(
                                      'activeLwh',
                                      'in.',
                                      productIndex,
                                      partIndex
                                    )
                                  }
                                >
                                  in.
                                </span>
                                <span
                                  className={
                                    item.activeLwh == 'in.'
                                      ? `${styles.activeText} ${styles.pointer}`
                                      : `${styles.pointer}`
                                  }
                                  onClick={() =>
                                    changePart(
                                      'activeLwh',
                                      'cm',
                                      productIndex,
                                      partIndex
                                    )
                                  }
                                >
                                  cm
                                </span>
                              </>
                            )}
                            {item.activeLwh == 'cm' && (
                              <>
                                <span
                                  className={
                                    item.activeLwh == 'in.'
                                      ? `${styles.activeText} ${styles.pointer}`
                                      : `${styles.pointer}`
                                  }
                                  style={{ margin: '0 5px' }}
                                  onClick={() =>
                                    changePart(
                                      'activeLwh',
                                      'cm',
                                      productIndex,
                                      partIndex
                                    )
                                  }
                                >
                                  cm
                                </span>
                                <span
                                  className={
                                    item.activeLwh == 'cm'
                                      ? `${styles.activeText} ${styles.pointer}`
                                      : `${styles.pointer}`
                                  }
                                  onClick={() =>
                                    changePart(
                                      'activeLwh',
                                      'in.',
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
                            {item.activeWeight == 'lbs.'
                              ? item.Inventory.attr.weight
                              : Number(
                                  item.Inventory.attr.weight * 0.45359237
                                ).toFixed(1)}
                            {item.activeWeight == 'lbs.' && (
                              <>
                                <span
                                  className={
                                    item.activeWeight == 'kg'
                                      ? `${styles.activeText} ${styles.pointer}`
                                      : `${styles.pointer}`
                                  }
                                  style={{ margin: '0 5px' }}
                                  onClick={() =>
                                    changePart(
                                      'activeWeight',
                                      'lbs.',
                                      productIndex,
                                      partIndex
                                    )
                                  }
                                >
                                  lbs.
                                </span>
                                <span
                                  className={
                                    item.activeWeight == 'lbs.'
                                      ? `${styles.activeText} ${styles.pointer}`
                                      : `${styles.pointer}`
                                  }
                                  onClick={() =>
                                    changePart(
                                      'activeWeight',
                                      'kg',
                                      productIndex,
                                      partIndex
                                    )
                                  }
                                >
                                  kg
                                </span>
                              </>
                            )}
                            {item.activeWeight == 'kg' && (
                              <>
                                <span
                                  className={
                                    item.activeWeight == 'lbs.'
                                      ? `${styles.activeText} ${styles.pointer}`
                                      : `${styles.pointer}`
                                  }
                                  style={{ margin: '0 5px' }}
                                  onClick={() =>
                                    changePart(
                                      'activeWeight',
                                      'kg',
                                      productIndex,
                                      partIndex
                                    )
                                  }
                                >
                                  kg
                                </span>
                                <span
                                  className={
                                    item.activeWeight == 'kg'
                                      ? `${styles.activeText} ${styles.pointer}`
                                      : `${styles.pointer}`
                                  }
                                  onClick={() =>
                                    changePart(
                                      'activeWeight',
                                      'lbs.',
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
      <Row justify="space-between" align="middle" style={{ marginTop: '33px' }}>
        <Col
          className={styles.title}
          style={{ textDecorationLine: 'none', margin: '0' }}
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
