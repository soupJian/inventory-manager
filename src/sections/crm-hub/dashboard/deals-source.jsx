import React from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Row, Col, Dropdown, Menu, Space } from 'antd'
import styles from './index.module.scss'

const list = [
  { key: 1, text: 'This Week' },
  { key: 2, text: 'Last week' },
  { key: 3, text: 'This month' },
  { key: 4, text: 'Last month' },
  { key: 5, text: 'This season' },
  { key: 6, text: 'This season' },
  { key: 7, text: 'This Year' },
  { key: 8, text: 'Last Year' }
]
const DealsSource = () => {
  const handleChooseSelect = (item) => {
    console.log(item)
  }
  const menu = (
    <Menu
      items={list.map((item) => {
        return {
          key: item.key,
          label: (
            <span onClick={() => handleChooseSelect(item)}>{item.text}</span>
          )
        }
      })}
    />
  )
  return (
    <div className={styles['deals-source']}>
      <Row justify="space-between">
        <Col className={styles.title}>Deals source</Col>
        <Col className={styles.dropdown}>
          <Dropdown overlay={menu}>
            <Space>
              Hover me
              <DownOutlined />
            </Space>
          </Dropdown>
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
