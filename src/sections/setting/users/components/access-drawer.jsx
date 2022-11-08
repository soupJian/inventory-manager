import React from 'react'
// components
import { Row, Col, Input, Switch, Divider, Button } from 'antd'
// js
import { accessObject } from '../../../../constants/setting'
// css
import styles from '../index.module.less'

// main
// type string  edit  create
const AccessDrawer = (props) => {
  const {
    type,
    accessInfo,
    handleChangeAccessSwitch,
    handleInputAccess,
    createAccess
  } = props
  const SwitchItem = ({ label, name }) => {
    return (
      <Col span={24}>
        <Row justify="space-between">
          <Col className={styles.subLabel}>{label}</Col>
          <Col>
            <Switch
              onChange={(value) => handleChangeAccessSwitch(name, value)}
              checked={accessInfo.access.accesses.includes(name)}
            />
          </Col>
        </Row>
      </Col>
    )
  }
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
        <SwitchItem label="Inventory" name={accessObject.inventory} />
        <SwitchItem label="Warehouse" name={accessObject.warehouse} />
        <SwitchItem label="Shipping" name={accessObject.shipping} />
        <SwitchItem label="Orders" name={accessObject.orders} />
      </Row>
      <Divider></Divider>
      {/* Customer Services */}
      <Row style={{ margin: '40px 0 23px' }}>
        <Col span={24} className={styles.subLabel}>
          Customer Services
        </Col>
      </Row>
      <Row gutter={[0, 30]}>
        <SwitchItem label="Forms & Emails" name={accessObject.crmFormEmail} />
        <SwitchItem label="Chats" name={accessObject.crmChats} />
        <SwitchItem label="Deals" name={accessObject.crmDeals} />
        <SwitchItem label="Tickets" name={accessObject.crmTickets} />
        <SwitchItem label="Tasks" name={accessObject.crmTasks} />
        <SwitchItem label="Dashboard" name={accessObject.crmDashboard} />
      </Row>
      <Divider />
      {/* GENERAL */}
      <Row style={{ margin: '40px 0 23px' }}>
        <Col span={24} className={styles.subLabel}>
          GENERAL
        </Col>
      </Row>
      <Row gutter={[0, 30]}>
        <SwitchItem
          label="Settings - Assiging"
          name={accessObject.settingAssiging}
        />
        <SwitchItem
          label="Settings - Pipeline"
          name={accessObject.settingPipeline}
        />
        <SwitchItem
          label="Settings - Assets"
          name={accessObject.settingAssets}
        />
        {/* <SwitchItem label="Settings - Users" name="settingUsers" /> */}
        <SwitchItem label="Settings - Reply" name={accessObject.settingReply} />
        <SwitchItem label="Activity history" name={accessObject.history} />
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
