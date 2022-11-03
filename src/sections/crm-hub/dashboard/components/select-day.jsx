import React, { useState } from 'react'
// components
import { Menu, Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
// css
import styles from '../index.module.less'
// js
// 选择时间的数组
const DayList = [
  { key: 1, text: 'This Week' },
  { key: 2, text: 'Last week' },
  { key: 3, text: 'This month' },
  { key: 4, text: 'Last month' },
  { key: 5, text: 'This season' },
  { key: 6, text: 'This season' },
  { key: 7, text: 'This Year' },
  { key: 8, text: 'Last Year' }
]

// main
const SelectDay = ({ handleChooseSelect }) => {
  const [dayKey, setDayKey] = useState('This Month')
  // 切换 展示 状态类型
  const DayMenu = (
    <Menu
      items={DayList.map((item) => {
        return {
          key: item.key,
          label: (
            <span
              onClick={() => {
                setDayKey(item.text)
                handleChooseSelect(item)
              }}
            >
              {item.text}
            </span>
          )
        }
      })}
    />
  )
  return (
    <Dropdown overlay={DayMenu} className={styles.dropdown}>
      <Space>
        {dayKey}
        <DownOutlined />
      </Space>
    </Dropdown>
  )
}

export default SelectDay
