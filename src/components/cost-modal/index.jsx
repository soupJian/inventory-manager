import React from 'react'
// components
import { Row, Col } from 'antd'
import { Modal } from '../commons'
// js
import { formatMoney } from '@/utils/formatMoney'
// css
import styles from './index.module.less'

// main
const CostItem = ({ costInfo, total, name }) => {
  return (
    <div className={styles.costItem}>
      {name && (
        <div className={styles.costItemName}>
          {name}{' '}
          <span style={{ marginLeft: '20px' }}>
            ${formatMoney(costInfo.TotalCost)}
          </span>
        </div>
      )}
      <Row gutter={[16, 16]}>
        <Col>
          <div style={{ width: '110px' }} className={styles.subTitle}>
            ITEM COST
          </div>
          <div className={styles.number}>
            ${`${formatMoney(costInfo.ItemCost)}`}
            <span style={{ marginLeft: '2px' }}>
              ({`${parseInt((costInfo.ItemCost / total) * 100)}`}
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
              ({`${parseInt((costInfo.CustomEntryDuty / total) * 100)}`}
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
              ({`${parseInt((costInfo.OceanFreight / total) * 100)}`}
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
              ({`${parseInt((costInfo.WarehouseDelivery / total) * 100)}`}
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
              ({`${parseInt((costInfo.CustomerShipping / total) * 100)}`}
              %)
            </span>
          </div>
        </Col>
      </Row>
    </div>
  )
}

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
        {costInfo.parts ? (
          <>
            {costInfo.parts.map((item, index) => {
              return (
                <CostItem
                  key={index}
                  name={item.Name}
                  costInfo={{ ...item.Cost, TotalCost: item.TotalCost }}
                  total={costInfo.total}
                />
              )
            })}
          </>
        ) : (
          <CostItem costInfo={costInfo} total={costInfo.total} />
        )}
      </div>
    </Modal>
  )
}

export default CostModal
