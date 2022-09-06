import React, { useState } from 'react'
import { Row, Col, Input, Switch, Divider, Button, message } from 'antd'
import styles from '../index.module.scss'

// type string  edit  create
const AccessDrawer = (props) => {
  const {
    type,
    access,
    handleChangeAccessSwitch,
    handleInputAccess,
    createAccess
  } = props

  return (
    <div className={styles.drawer}>
      <Row gutter={[0, 10]}>
        <Col span={24} className={styles.label}>
          access Name*
        </Col>
        <Col span={24}>
          <Input
            name="accessName"
            value={access.accessName}
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
            value={access.description}
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
                checked={access.inventory}
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
                checked={access.warehousing}
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
                checked={access.products}
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
                checked={access.shipping}
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
                checked={access.orders}
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
                checked={access['form-email']}
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
                checked={access.chats}
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
                checked={access.deals}
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
                checked={access.tickets}
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
                checked={access.tasks}
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
                checked={access.dashboard}
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
                checked={access.assets}
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
                checked={access.fastReply}
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
                checked={access.other}
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
                checked={access.history}
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
