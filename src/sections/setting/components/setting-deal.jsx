import React, { useState, useEffect } from 'react'
import { Row, Col, Select, Switch, Checkbox, Radio, Space } from 'antd'
const { Option } = Select
import styles from '../assigning.module.scss'

const SettingDeal = () => {
  // 是否打开
  const [open, setOpen] = useState(false)
  // 客服
  const [customerList, setCustomerList] = useState([
    { id: 1, name: 'Cathy', checked: true },
    { id: 2, name: 'Neela', checked: false },
    { id: 3, name: 'Theo', checked: true },
    { id: 4, name: 'Trish', checked: false }
  ])
  // 自动分配规则
  const [radioRule, setRadioRule] = useState(0)
  // 自动分配 按照 价格
  const [rulePerson, setRulePerson] = useState([
    {
      range: '$0 - $400',
      personName: ['Cathy', 'Neela']
    },
    {
      range: '$401 - $999',
      personName: ['Cathy', 'Neela']
    },
    {
      range: 'Over $999',
      personName: ['Trish']
    }
  ])
  // toggle 打开/关闭 自动创建 deal
  const handleChangeSwitch = (checked) => {
    setOpen(checked)
  }
  // checkbox 选择 客服
  const handleChangeCustomer = (e, select) => {
    const index = customerList.findIndex((item) => item.id == select.id)
    setCustomerList((list) => {
      const newList = [...list]
      newList[index].checked = e.target.checked
      return newList
    })
    setRulePerson((list) => {
      const newList = [...list]
      newList.forEach((item) => (item.personName = []))
      return newList
    })
  }
  // radio
  const handleChangeRule = (e, value) => {
    setRadioRule(value)
  }
  // 选择 价格 对应的人
  const handleChangeRulePerson = (values, ruleItem) => {
    setRulePerson((list) => {
      const newList = [...list]
      const index = newList.findIndex((item) => item.range == ruleItem.range)
      newList[index].personName = values
      return newList
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>AUTO ASSIGN</div>
      <div className={styles.wrap}>
        <div className={styles.subTitle}>Enable auto assign</div>
        <Row justify="space-between">
          <Col className={styles.des}>
            Turn on this to enable auto-assign, otherwise the email form will
            appear in the email list and be treated by a customer representative
            manually
          </Col>
          <Col>
            <Switch checked={open} onChange={handleChangeSwitch} />
          </Col>
        </Row>
      </div>
      <div className={styles.wrap}>
        <div className={styles.subTitle}>Auto create deal in Pipeline</div>
        <Row justify="space-between">
          <Col className={styles.des}>
            Choose a pipeline that the email form will be automatically assigned
            to
          </Col>
          <Col>
            <div className={styles.pipelineWrap}>Sales pipeline</div>
          </Col>
        </Row>
      </div>
      <div className={styles.wrap}>
        <div className={styles.subTitle}>Customer Representative</div>
        <Row gutter={[0, 24]}>
          <Col span={24} className={styles.des}>
            Select Customer Representatives who will be dealing with this kind
            of form
          </Col>
          {customerList.map((item) => {
            return (
              <Col span={24} key={item.id}>
                <Checkbox
                  checked={item.checked}
                  onChange={(e) => handleChangeCustomer(e, item)}
                >
                  {item.name}
                </Checkbox>
              </Col>
            )
          })}
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
                Assign to the customer representative who has the LEAST open
                deals
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
                  Assign to a customer representative based on the price
                </Col>
                <Col className={styles.ruleSubTitle}>
                  Set up a rule to determine who should be assigned. If more
                  than one representative in a category, assign to the one
                  having the LEAST open deals
                </Col>
              </Row>
            </Space>
          </Col>
          <Col>
            {radioRule == 1 && (
              <Row className={styles.rulePersonWrap} gutter={[0, 24]}>
                {rulePerson.map((ruleItem) => {
                  return (
                    <Col span={24} key={ruleItem.range}>
                      <Row align="middle">
                        <Col span={3} className={styles.ruleRange}>
                          {ruleItem.range}
                        </Col>
                        <Col>
                          <Select
                            mode="multiple"
                            style={{
                              minWidth: '300px',
                              marginLeft: '20px'
                            }}
                            value={ruleItem.personName}
                            onChange={(values) =>
                              handleChangeRulePerson(values, ruleItem)
                            }
                          >
                            {customerList
                              .filter((item) => item.checked)
                              .map((item) => {
                                return (
                                  <Option
                                    value={item.name}
                                    label={item.name}
                                    key={item.id}
                                  >
                                    {item.name}
                                  </Option>
                                )
                              })}
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                  )
                })}
              </Row>
            )}
          </Col>
          <Col span={24}>
            <Space>
              <Checkbox
                checked={radioRule == 2}
                onChange={(e) => handleChangeRule(e, 2)}
              ></Checkbox>
              <span>
                Assign to a customer representative based on the interest
              </span>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default SettingDeal
