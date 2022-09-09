import React, { useState } from 'react'
import { Row, Col, Input, Switch, Divider, Button, message } from 'antd'
import styles from '../index.module.scss'

// type string  edit  create
const AccessDrawer = (props) => {
  const {
    type,
    accessInfo,
    handleChangeAccessSwitch,
    handleInputAccess,
    createAccess
  } = props
  console.log(accessInfo)
  return (
    <div className={styles.drawer}>
      <Row gutter={[0, 10]}>
        <Col span={24} className={styles.label}>
          access Name*
        </Col>
        <Col span={24}>
          <Input
            name="accessName"
            value={accessInfo.access.accessName}
            onChange={handleInputAccess}
          />
        </Col>
      </Row>
      {/* inventory */}
      <Row gutter={[0, 10]} style={{ marginTop: '40px' }}>
        <Col span={24} className={styles.label}>
          Short description*
        </Col>
        <Col span={24}>
          <Input
            name="description"
            value={accessInfo.access.description}
            onChange={handleInputAccess}
          />
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
              <Switch
                onChange={(value) =>
                  handleChangeAccessSwitch(value, 'inventory')
                }
                checked={accessInfo.access.inventory}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Warehousing</Col>
            <Col>
              <Switch
                onChange={(value) =>
                  handleChangeAccessSwitch(value, 'warehousing')
                }
                checked={accessInfo.access.warehousing}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Products</Col>
            <Col>
              <Switch
                onChange={(value) =>
                  handleChangeAccessSwitch(value, 'products')
                }
                checked={accessInfo.access.products}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Shipping</Col>
            <Col>
              <Switch
                onChange={(value) =>
                  handleChangeAccessSwitch(value, 'shipping')
                }
                checked={accessInfo.access.shipping}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Orders</Col>
            <Col>
              <Switch
                onChange={(value) => handleChangeAccessSwitch(value, 'orders')}
                checked={accessInfo.access.orders}
              />
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
              <Switch
                onChange={(value) =>
                  handleChangeAccessSwitch(value, 'form-email')
                }
                checked={accessInfo.access['form-email']}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Chats</Col>
            <Col>
              <Switch
                onChange={(value) => handleChangeAccessSwitch(value, 'chats')}
                checked={accessInfo.access.chats}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Deals</Col>
            <Col>
              <Switch
                onChange={(value) => handleChangeAccessSwitch(value, 'deals')}
                checked={accessInfo.access.deals}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Tickets</Col>
            <Col>
              <Switch
                onChange={(value) => handleChangeAccessSwitch(value, 'tickets')}
                checked={accessInfo.access.tickets}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Tasks</Col>
            <Col>
              <Switch
                onChange={(value) => handleChangeAccessSwitch(value, 'tasks')}
                checked={accessInfo.access.tasks}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Dashboard</Col>
            <Col>
              <Switch
                onChange={(value) =>
                  handleChangeAccessSwitch(value, 'dashboard')
                }
                checked={accessInfo.access.dashboard}
              />
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
              <Switch
                onChange={(value) => handleChangeAccessSwitch(value, 'assets')}
                checked={accessInfo.access.assets}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Settings - Fast Reply</Col>
            <Col>
              <Switch
                onChange={(value) =>
                  handleChangeAccessSwitch(value, 'fastReply')
                }
                checked={accessInfo.access.fastReply}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Settings - Other</Col>
            <Col>
              <Switch
                onChange={(value) => handleChangeAccessSwitch(value, 'other')}
                checked={accessInfo.access.other}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col className={styles.subLabel}>Activity history</Col>
            <Col>
              <Switch
                onChange={(value) => handleChangeAccessSwitch(value, 'history')}
                checked={accessInfo.access.history}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <Button className={styles.drawerBtn} onClick={() => createAccess()}>
            {type == 'create' ? 'Create' : 'Save'}
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(AccessDrawer)
