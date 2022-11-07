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

// main
const DrawerDetail = ({ info, productList = staticProduct }) => {
  return (
    <div className={styles.drawer}>
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
