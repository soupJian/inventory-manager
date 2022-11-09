import React from 'react'
// components
import { Row, Col } from 'antd'
// css
import styles from '../index.module.less'

const packageList = [
  {
    id: '1',
    selectProduct: [],
    cappier: 'Fedex',
    trackingId: '1Z923875HY284K727213', // 订单号
    shipDate: 'July 18,2022', // 时间
    shipStatus: 'Delivered' // 状态
  }
]
// main
const ModalShipping = () => {
  return (
    <div className={styles.shipModal}>
      {packageList.map((item, index) => {
        return (
          <div key={item.id}>
            <Row gutter={[0, 15]}>
              <Col span={24} className={styles.infoIndex}>
                Package {index + 1}
              </Col>
              <Col span={24}>
                <Row justify="space-between">
                  <Col className={styles.infoName}>Carrier</Col>
                  <Col className={styles.infoValue}>{item.cappier}</Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="space-between">
                  <Col className={styles.infoName}>Tracking number</Col>
                  <Col
                    className={`${styles.infoValue} ${styles.infoValueTrackId}`}
                  >
                    {item.trackingId}
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="space-between">
                  <Col className={styles.infoName}>Shipping status</Col>
                  <Col className={styles.infoValue}>{item.shipStatus}</Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="space-between">
                  <Col className={styles.infoName}>Shipped on</Col>
                  <Col className={styles.infoValue}>{item.shipDate}</Col>
                </Row>
              </Col>
            </Row>
          </div>
        )
      })}
    </div>
  )
}

export default ModalShipping
