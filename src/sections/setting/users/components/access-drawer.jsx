import React from 'react'
import { Row, Col, Input, Switch, Divider, Button } from 'antd'
import styles from '../index.module.scss'
import { useState } from 'react'

// type string view , add , disabled
const AccessDrawer = ({ type }) => {
  const [defaultAccess, setDefaultAccess] = useState({
    accessName: '',
    description: '',
    inventory: {
      inventory: false,
      warehousing: false,
      products: false,
      shipping: false,
      orders: false
    },
    customerServices: {
      'form-email': false,
      chats: false,
      deals: false,
      tickets: false,
      tasks: false,
      dashboard: false
    },
    general: {
      assets: false,
      fastReply: false,
      other: false,
      history: false
    }
  })
  return (
    <div className={styles.drawer}>
      <Row gutter={[0, 10]}>
        <Col span={24} className={styles.label}>
          access Name*
        </Col>
        <Col span={24}>
          <Input />
        </Col>
      </Row>
      {/* inventory */}
      <Row gutter={[0, 10]} style={{ marginTop: '40px' }}>
        <Col span={24} className={styles.label}>
          Short description*
        </Col>
        <Col span={24}>
          <Input />
        </Col>
      </Row>
      <Row style={{ margin: '40px 0 23px' }}>
        <Col span={24} className={styles.subLabel}>
          Inventory
        </Col>
      </Row>
      <Row gutter={[0, 30]}>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Inventory</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Warehousing</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Products</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Shipping</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Orders</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider></Divider>
      {/* Customer Services */}
      <Row style={{ margin: '40px 0 23px' }}>
        <Col span={24} className={styles.subLabel}>
          Customer Services
        </Col>
      </Row>
      <Row gutter={[0, 30]}>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Forms & Emails</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Chats</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Deals</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Tickets</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Tasks</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Dashboard</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      {/* GENERAL */}
      <Row style={{ margin: '40px 0 23px' }}>
        <Col span={24} className={styles.subLabel}>
          GENERAL
        </Col>
      </Row>
      <Row gutter={[0, 30]}>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Settings - Assets</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Settings - Fast Reply</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Settings - Other</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Activity history</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <Button className={styles.drawerBtn}>Create</Button>
        </Col>
      </Row>
    </div>
  )
}

export default AccessDrawer
