import React from 'react'
import { Row, Col } from 'antd'
import SelectDay from './components/select-day'

import styles from './index.module.scss'

const DealsSource = () => {
  const handleChooseSelect = (item) => {
    console.log(item)
  }
  return (
    <div className={styles['deals-source']}>
      <Row justify="space-between">
        <Col className={styles.title}>Deals source</Col>
        <Col className={styles.dropdown}>
          <SelectDay handleChooseSelect={handleChooseSelect} />
        </Col>
      </Row>
      <Row className={styles.wrap}>
        <Col span={8}>
          <Row wrap={false}>
            <Col className={styles.leftBar}></Col>
            <Col>
              <Row className={styles.content}>
                <Col span={24} className={styles.name}>
                  FaceBook
                </Col>
                <Col span={24}>
                  <span className={styles.precentNum}>45</span>
                  <span className={styles.precent}>%</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col className={styles.leftBar}></Col>
            <Col>
              <Row className={styles.content}>
                <Col span={24} className={styles.name}>
                  Google
                </Col>
                <Col span={24}>
                  <span className={styles.precentNum}>45</span>
                  <span className={styles.precent}>%</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={8} className={styles.others}>
          <Row>
            <Col className={styles.leftBar}></Col>
            <Col>
              <Row className={styles.content}>
                <Col span={24} className={styles.name}>
                  Others
                </Col>
                <Col span={24}>
                  <span className={styles.precentNum}>45</span>
                  <span className={styles.precent}>%</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default DealsSource
