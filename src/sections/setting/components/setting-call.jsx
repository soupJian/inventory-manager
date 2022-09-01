import React, { useState, useEffect } from 'react'
import { Row, Col, Switch, Checkbox, Space } from 'antd'
import styles from '../assigning.module.scss'
const CheckboxGroup = Checkbox.Group

const SettingCall = () => {
  // 是否打开
  const [open, setOpen] = useState(false)
  // 客服
  const [customerList, setCustomerList] = useState([
    { id: 1, name: 'Cathy' },
    { id: 2, name: 'Neela' },
    { id: 3, name: 'Theo' },
    { id: 4, name: 'Trish' },
    { id: 5, name: 'Cathy' },
    { id: 6, name: 'Neela' },
    { id: 7, name: 'Theo' },
    { id: 8, name: 'Trish' },
    { id: 9, name: 'Cathy' },
    { id: 10, name: 'Neela' },
    { id: 11, name: 'Theo' },
    { id: 12, name: 'Trish' }
  ])
  // 选择的客服
  const [checkedList, setCheckedList] = useState([])
  // 是否全选
  const [checkAll, setCheckAll] = useState(false)
  // checkbox one
  const handleChangeCheckbox = (list) => {
    setCheckedList(list)
    setCheckAll(list.length === customerList.length)
  }
  // checkbox all
  const handleCheckAll = (e) => {
    setCheckedList(
      e.target.checked ? customerList.map((item) => item.name) : []
    )
    setCheckAll(e.target.checked)
  }
  // 自动分配规则
  const [radioRule, setRadioRule] = useState(0)
  // toggle 打开/关闭 自动创建 deal
  const handleChangeSwitch = (checked) => {
    setOpen(checked)
  }
  // radio
  const handleChangeRule = (e, value) => {
    setRadioRule(value)
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>AUTO ASSIGN</div>
      <div className={styles.wrap}>
        <div className={styles.subTitle}>Enable auto assign</div>
        <Row justify="space-between">
          <Col className={styles.des}>
            Turn on this to enable auto-assign, otherwise calls will be assigned
            randomly.
          </Col>
          <Col>
            <Switch checked={open} onChange={handleChangeSwitch} />
          </Col>
        </Row>
      </div>
      <div className={styles.wrap}>
        <div className={styles.subTitle}>Customer Representative</div>
        <Row>
          <Col className={styles.des}>
            Select Customer Representatives who will be answering calls
          </Col>
          <Col span={24}>
            <Checkbox onChange={handleCheckAll} checked={checkAll}>
              Select all
            </Checkbox>
          </Col>
          <Col span={24} style={{ marginTop: '20px' }}>
            <CheckboxGroup
              value={checkedList}
              onChange={handleChangeCheckbox}
              style={{ wudth: '100%' }}
            >
              <Row gutter={[0, 10]}>
                {customerList.map((item) => {
                  return (
                    <Col key={item.id} span={6}>
                      <Checkbox value={item.name}>{item.name}</Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </CheckboxGroup>
          </Col>
        </Row>
      </div>
      <div className={styles.wrap}>
        <div className={styles.subTitle}>Assigning rule</div>
        <Row className={styles.ruleWrap} gutter={[0, 17]}>
          <Col span={24}>
            <Space>
              <Checkbox
                checked={radioRule == 0}
                onChange={(e) => handleChangeRule(e, 0)}
              ></Checkbox>
              <span>
                Assign to the customer representative who has the LEAST calls
                today
              </span>
            </Space>
          </Col>
          <Col>
            <Space>
              <Checkbox
                checked={radioRule == 1}
                onChange={(e) => handleChangeRule(e, 1)}
              ></Checkbox>
              <Row align="middle">
                <Col span={24}>
                  Assign to a customer representative who has the MOST waiting
                  time since last call
                </Col>
              </Row>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <Checkbox
                checked={radioRule == 2}
                onChange={(e) => handleChangeRule(e, 2)}
              ></Checkbox>
              <span>
                Assign to a customer representative who has the LEAST waiting
                time since last call
              </span>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default SettingCall
