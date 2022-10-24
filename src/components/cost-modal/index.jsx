import React from 'react'
import { Row, Col } from 'antd'
import { Modal } from '../commons'
import { formatMoney } from '../../utils/formatMoney'
import styles from './index.module.scss'
const CostModal = ({ costInfo, setCostInfo }) => {
  return (
    <Modal
      onClose={() => {
        setCostInfo({
          show: false
        })
      }}
    >
      <div className={styles.costModal}>
        <div className={styles.title}>
          US Cost: ${formatMoney(costInfo.total)}
        </div>
        <Row gutter={[16, 16]}>
          <Col>
            <div style={{ width: '110px' }} className={styles.subTitle}>
              ITEM COST
            </div>
            <div className={styles.number}>
              ${`${formatMoney(costInfo.ItemCost)}`}
              <span style={{ marginLeft: '2px' }}>
                ({`${parseInt((costInfo.ItemCost / costInfo.total) * 100)}`}
                %)
              </span>
            </div>
          </Col>
          <Col>
            <div style={{ width: '147px' }} className={styles.subTitle}>
              CUSTOM ENTRY DUTY
            </div>
            <div className={styles.number}>
              ${`${formatMoney(costInfo.CustomEntryDuty)}`}
              <span style={{ marginLeft: '2px' }}>
                (
                {`${parseInt(
                  (costInfo.CustomEntryDuty / costInfo.total) * 100
                )}`}
                %)
              </span>
            </div>
          </Col>
          <Col>
            <div className={styles.subTitle} style={{ width: '134px' }}>
              OCEAN FREIGHT
            </div>
            <div className={styles.number}>
              ${`${formatMoney(costInfo.OceanFreight)}`}
              <span style={{ marginLeft: '2px' }}>
                ({`${parseInt((costInfo.OceanFreight / costInfo.total) * 100)}`}
                %)
              </span>
            </div>
          </Col>
          <Col>
            <div style={{ width: '158px' }} className={styles.subTitle}>
              WAREHOUSE DELIVERY
            </div>
            <div className={styles.number}>
              ${`${formatMoney(costInfo.WarehouseDelivery)}`}
              <span style={{ marginLeft: '2px' }}>
                (
                {`${parseInt(
                  (costInfo.WarehouseDelivery / costInfo.total) * 100
                )}`}
                %)
              </span>
            </div>
          </Col>
          <Col>
            <div style={{ width: '171px' }} className={styles.subTitle}>
              CUSTOMER SHIPPING
            </div>
            <div className={styles.number}>
              ${`${formatMoney(costInfo.CustomerShipping)}`}
              <span style={{ marginLeft: '2px' }}>
                (
                {`${parseInt(
                  (costInfo.CustomerShipping / costInfo.total) * 100
                )}`}
                %)
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

export default CostModal
