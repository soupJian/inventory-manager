import React from 'react'
// components
import { Table, Row, Col } from 'antd'
import SelectDay from './components/select-day'
// css
import styles from './index.module.less'

// main
const BestSellers = ({ BestSellersList }) => {
  // 切换 时间选择
  const handleChooseSelect = (item) => {
    console.log(item)
  }
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
          <SelectDay handleChooseSelect={handleChooseSelect} />
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
