import React from 'react'
import { useRouter } from 'next/router'
// antd ---------
import { Row, Col } from 'antd'
// css -------------
import styles from './index.module.scss'
// js
import { switchStatusColor } from '../util'

// main
const DealsFilter = ({ filterData, status }) => {
  const router = useRouter()
  const data = filterData.filter((item) => {
    return item.status == status
  })
  let total = 0
  data.forEach((item) => {
    total += item.amount
  })
  total = total.toLocaleString()
  const handleClick = (item) => {
    localStorage.setItem('dealIds', JSON.stringify([item.key]))
    router.push('/crm-hub/deals/detail')
  }
  return (
    <div className={styles.dealsfilterwrap}>
      <div className={styles.container}>
        <Row className={styles.title}>
          <Col
            className={styles['status-name']}
            style={{ background: `${switchStatusColor(status)}` }}
          >
            {status}
          </Col>
          <Col className={styles['status-num']}>{data.length}</Col>
        </Row>
        {data.map((item) => {
          return (
            <div
              key={item.key}
              className={styles['filter-item']}
              onClick={() => handleClick(item)}
            >
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
