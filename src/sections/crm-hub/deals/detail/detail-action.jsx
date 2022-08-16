import React from 'react'
// antd ---------
import { Select, Row, Col, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
// components -----------
import Icon from '../../../../components/commons/icons/Icon'
import styles from './index.module.scss'

// js ------------
const { Option } = Select
const DetailAction = () => {
  const handleChangeStatus = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <div className={styles['detail-action']}>
      <div className={styles['action-header']}>
        <div className={styles.header}>
          <Icon name="deal" width="22px" height="24px" />
          <div className={styles['deal-logo']}>DEAL</div>
        </div>
        <div className={styles['deal-name']}>Kevin Bowden</div>
        <div className={styles['status-wrap']}>
          <div>Status</div>
          <Select
            defaultValue="Closed lost"
            onChange={handleChangeStatus}
            size="middle"
          >
            <Option value="Interest showed">Interest showed</Option>
            <Option value="Initial mockup">Initial mockup</Option>
            <Option value=">Mockup revising">Mockup revising</Option>
            <Option value="Quote sent">Quote sent</Option>
            <Option value="Closed won">Closed won</Option>
            <Option value="Closed lost">Closed lost</Option>
          </Select>
        </div>
      </div>
      <div className={styles['action-content']}>
        <div className={styles['detail-info']}>
          <Row justify="space-between">
            <Col>
              <span className={styles['info-label']}>Amount</span>
              <span className={styles['info-content']}>$690</span>
            </Col>
            <Col>
              <EditOutlined style={{ color: '#2EBEBD', fontSize: '16px' }} />
            </Col>
          </Row>
          <div className={styles.center}>
            <span className={styles['info-label']}>Created</span>
            <span className={styles['info-content']}>5/11/2022</span>
          </div>
          <div>
            <span className={styles['info-label']}>Owner</span>
            <span className={styles['info-content']}>Cathy</span>
          </div>
        </div>
        <div className={styles['goods-info']}>
          <div className={styles.title}>DETAILS</div>
          <div className={styles['info-label']}>Interest Product(s)</div>
          <div className={`${styles['info-content']} ${styles.center}`}>
            Custom Canopy Tent p5 x1
          </div>
          <div className={styles['info-content']}>Kapri Umbrella x2</div>
          <Row className={styles.row}>
            <Col span={12}>
              <div className={styles['info-label']}>Source</div>
              <div className={styles['info-content']}>Facebook</div>
            </Col>
            <Col span={12}>
              <div className={styles['info-label']}>Customer Type</div>
              <div className={styles['info-content']}>Existing</div>
            </Col>
          </Row>
        </div>
        <Row className={styles['contact-info']} gutter={[0, 18]}>
          <Col span={24}>
            <Row
              justify="space-between"
              align="middle"
              className={styles.contact}
            >
              <Col>
                <div className={styles['info-label']}>Contact 1</div>
                <div className={styles['info-content']}>Kevin Bowden</div>
              </Col>
              <Col>
                <Button>Edit</Button>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <div className={styles['info-label']}>Email</div>
            <div className={styles['info-content']}>kevinhb@myemail.com</div>
          </Col>
          <Col span={24}>
            <div className={styles['info-label']}>Phone</div>
            <div className={styles['info-content']}>123 456 7890</div>
          </Col>
          <Col span={24}>
            <div className={styles['info-label']}>Company</div>
            <div className={styles['info-content']}>Great Canyon LLC</div>
          </Col>
          <Col span={24}>
            <Button className={styles.addBtn}>+Add</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DetailAction
