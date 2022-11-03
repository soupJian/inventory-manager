import React, { useState } from 'react'
// components
import { Row, Col, Select, Switch, Checkbox, Space } from 'antd'
// css
import styles from '../index.module.less'

const { Option } = Select
const CheckboxGroup = Checkbox.Group

// main
const SettingDeal = () => {
  // 是否打开
  const [open, setOpen] = useState(false)
  // 客服
  const [customerList, setCustomerList] = useState([
    { id: 1, name: 'Cathy1' },
    { id: 2, name: 'Neela2' },
    { id: 3, name: 'Theo3' },
    { id: 4, name: 'Trish4' },
    { id: 5, name: 'Cathy5' },
    { id: 6, name: 'Neela6' },
    { id: 7, name: 'Theo7' },
    { id: 8, name: 'Trish8' },
    { id: 9, name: 'Cathy9' },
    { id: 10, name: 'Neela10' },
    { id: 11, name: 'Theo11' },
    { id: 12, name: 'Trish12' }
  ])
  // 自动分配 按照 价格
  const [rulePrice, setRulePrice] = useState([
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
  const [ruleInterest, setRuleInterest] = useState([
    {
      range: 'Canopy tent',
      personName: ['Cathy', 'Neela']
    },
    {
      range: 'Umbrella',
      personName: ['Cathy', 'Neela']
    },
    {
      range: 'Table covers',
      personName: ['Trish']
    },
    {
      range: 'Display products',
      personName: ['Cathy', 'Neela']
    },
    {
      range: 'Inflatables',
      personName: ['Cathy', 'Neela']
    }
  ])
  // 自动分配规则
  const [radioRule, setRadioRule] = useState(0)
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

  // toggle 打开/关闭 自动创建 deal
  const handleChangeSwitch = (checked) => {
    setOpen(checked)
  }
  // radio 选择 分配规则
  const handleChangeRule = (e, value) => {
    setRadioRule(value)
  }
  // 选择 价格 对应的人 radioRule == 1  price
  const handleChangeRulePerson = (values, ruleItem) => {
    setRulePrice((list) => {
      const newList = [...list]
      const index = newList.findIndex((item) => item.range == ruleItem.range)
      newList[index].personName = values
      return newList
    })
  }
  // radioRule == 2 选择 interest
  const handleChangeRuleInterest = (values, ruleItem) => {
    setRuleInterest((list) => {
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
      {open && (
        <>
          <div className={styles.wrap}>
            <div className={styles.subTitle}>Auto create deal in Pipeline</div>
            <Row justify="space-between">
              <Col className={styles.des}>
                Choose a pipeline that the email form will be automatically
                assigned to
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
                Select Customer Representatives who will be dealing with this
                kind of form
              </Col>
              <Col span={24}>
                <Checkbox onChange={handleCheckAll} checked={checkAll}>
                  Select all
                </Checkbox>
              </Col>
              <Col span={24}>
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
                    {rulePrice.map((ruleItem) => {
                      return (
                        <Col span={24} key={ruleItem.range}>
                          <Row align="middle">
                            <Col className={styles.ruleRange}>
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
                                {checkedList.map((item) => {
                                  return (
                                    <Option
                                      value={item}
                                      label={item}
                                      key={item}
                                    >
                                      {item}
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
              <Col>
                {radioRule == 2 && (
                  <Row className={styles.rulePersonWrap} gutter={[0, 24]}>
                    {ruleInterest.map((ruleItem) => {
                      return (
                        <Col span={24} key={ruleItem.range}>
                          <Row align="middle">
                            <Col className={styles.ruleRange}>
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
                                  handleChangeRuleInterest(values, ruleItem)
                                }
                              >
                                {checkedList.map((item) => {
                                  return (
                                    <Option
                                      value={item}
                                      label={item}
                                      key={item}
                                    >
                                      {item}
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
            </Row>
          </div>
        </>
      )}
    </div>
  )
}

export default SettingDeal
