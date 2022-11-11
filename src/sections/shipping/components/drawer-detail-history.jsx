import React, { useState, useEffect } from 'react'
// components
import { Checkbox, Row, Col, Popover, Button, Space } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
// css
import styles from '../index.module.less'

// main
const DrawerDetail = ({ info }) => {
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
          {info.customerInfo.city}, {info.customerInfo.state}{' '}
          {info.customerInfo.zipcode}
        </div>
        <div>{info.customerInfo.phone}</div>
      </div>
      <div className={styles.title}>PRODUCTS</div>
      {info.products.map((productItem) => {
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
