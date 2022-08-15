import React from 'react'
// antd ---------
import { Row, Col } from 'antd'

// css -------------
import styles from './index.module.scss'

const DealsFilter = ({ filterData, status }) => {
  const data = filterData.filter((item) => {
    return item.status == status
  })
  let total = 0
  data.forEach((item) => {
    total += item.amount
  })
  total = total.toLocaleString()

  return (
    <div className={styles.dealsfilterwrap}>
      <div className={styles.container}>
        {data.map((item) => {
          return (
            <div key={item.key} className={styles['filter-item']}>
              <Row>
                <Col>
                  <span className={styles['item-title']}>{item.dealName}</span>
                </Col>
                <Col span={24}>Interest: {item.interest}</Col>
                <Col span={24}>Amount: ${item.amount.toLocaleString()}</Col>
              </Row>
            </div>
          )
        })}
      </div>
      <div className={styles.footer}>
        <Row justify="space-between">
          <Col>
            <span className={styles.total}>TOTAL:</span>
          </Col>
          <Col>
            <span className={styles.amount}>${total}</span>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DealsFilter
