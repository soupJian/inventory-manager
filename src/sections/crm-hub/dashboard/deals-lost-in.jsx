import React, { useState } from 'react'
// components
import SelectDay from './components/select-day'
import {
  DownOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons'
import { Row, Col, Progress, Dropdown, Menu, Space, Checkbox } from 'antd'
// css
import styles from './index.module.less'

// main
const LostInItem = ({ item }) => {
  return (
    <>
      {item && (
        <Space>
          <Progress
            type="circle"
            percent={item.precent}
            width={58}
            format={(precent) => `${precent}%`}
          />
          {item.name}
          <span>
            {item.isup ? (
              <ArrowUpOutlined style={{ color: '#77D755' }} />
            ) : (
              <ArrowDownOutlined style={{ color: '#FF7B7B' }} />
            )}
            <span style={{ marginLeft: '6px' }}>{item.value}%</span>
          </span>
        </Space>
      )}
    </>
  )
}
const DealsLostIn = ({ lostIn }) => {
  // 只允许选择 两个
  const [typeSelect, setTypeSelect] = useState([
    'Interest showed',
    'Initial mockup'
  ])
  // 切换 select 选择
  const changeTypeSelect = (e, item) => {
    const checked = e.target.checked
    const newTypeSelect = [...typeSelect]
    if (checked) {
      newTypeSelect.push(item.name)
      console.log(newTypeSelect)
    } else {
      const index = newTypeSelect[0].name == item.name ? 0 : 1
      newTypeSelect.splice(index - 1, 1)
    }
    console.log(typeSelect)
    setTypeSelect(newTypeSelect)
  }
  // 切换 时间选择
  const handleChooseSelect = (item) => {
    console.log(item)
  }
  const typeMenu = (
    <Menu
      items={lostIn.map((item) => {
        return {
          key: item.name,
          label: (
            <Checkbox
              checked={typeSelect.includes(item.name)}
              onChange={(e) => changeTypeSelect(e, item)}
              disabled={
                typeSelect.length == 2 && !typeSelect.includes(item.name)
              }
            >
              {item.name}
            </Checkbox>
          )
        }
      })}
    />
  )
  return (
    <div className={styles['deal-lost-in']}>
      <Row>
        <Col className={styles.title}>Deals lost in:</Col>
        <Col className={styles.dropdown} flex={1}>
          <Row justify="end">
            <Col>
              <Dropdown overlay={typeMenu} className={styles.dropdown}>
                <Space>
                  Select
                  <DownOutlined />
                </Space>
              </Dropdown>
            </Col>
            <Col style={{ marginLeft: '20px' }}>
              <SelectDay handleChooseSelect={handleChooseSelect} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={styles.content}>
        {lostIn.map((item) => {
          return (
            <Col
              span={12}
              key={item.name}
              style={{
                display: typeSelect.includes(item.name) ? 'block' : 'none'
              }}
            >
              <LostInItem item={item} />
            </Col>
          )
        })}
        {/* 如果勾选的少于两个，默认补充 前两个 */}
        {typeSelect.length < 2 && typeSelect.indexOf(lostIn[0].name) < 0 && (
          <Col span={12}>
            <LostInItem item={lostIn[0]} />
          </Col>
        )}
        {typeSelect.length < 2 && typeSelect.indexOf(lostIn[1].name) < 0 && (
          <Col span={12}>
            <LostInItem item={lostIn[1]} />
          </Col>
        )}
      </Row>
    </div>
  )
}

export default DealsLostIn
