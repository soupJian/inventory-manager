import React from 'react'
import { Table, Row, Col, Dropdown, Menu, Space } from 'antd'
import {
  DownOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons'

import styles from './index.module.scss'
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
const BestSellers = ({ BestSellersList }) => {
  // 切换 时间选择
  const handleChooseSelect = (e) => {
    // console.log(item)
  }
  // 切换 展示 状态类型
  const DayMenu = (
    <Menu
      items={DayList.map((item) => {
        return {
          key: item.key,
          label: (
            <span onClick={() => handleChooseSelect(item)}>{item.text}</span>
          )
        }
      })}
    />
  )
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales',
      render: (_, record) => (
        <span className={styles.sales}>{record.sales}</span>
      )
    }
  ]
  return (
    <div className={styles['best-sellers']}>
      <Row justify="space-between">
        <Col>Best sellers</Col>
        <Col>
          <Dropdown overlay={DayMenu} className={styles.dropdown}>
            <Space>
              This month
              <DownOutlined />
            </Space>
          </Dropdown>
        </Col>
      </Row>
      <Table
        className={styles.table}
        columns={columns}
        dataSource={BestSellersList}
        pagination={false}
        rowKey="rank"
      ></Table>
    </div>
  )
}

export default BestSellers
