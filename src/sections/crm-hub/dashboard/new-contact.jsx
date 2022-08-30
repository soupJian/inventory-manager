import React from 'react'
import { Row, Col, Dropdown, Space, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
const list = [
  { key: 1, text: 'This Week' },
  { key: 2, text: 'Last week' },
  { key: 3, text: 'This month' },
  { key: 4, text: 'Last month' },
  { key: 5, text: 'This season' },
  { key: 6, text: 'This season' },
  { key: 7, text: 'This Year' },
  { key: 8, text: 'Last Year' }
]
const NewContact = () => {
  const menu = (
    <Menu
      items={list.map((item) => {
        return {
          key: item.key,
          label: (
            <span onClick={() => handleChooseSelect(item)}>{item.text}</span>
          )
        }
      })}
    />
  )
  return (
    <div className={styles['new-contacts']}>
      <Row>
        <Col className={styles.title}>New contacts</Col>
        <Col>
          <div className={styles.num}>153</div>
          <Dropdown overlay={menu} className={styles.dropdown}>
            <Space>
              Hover me
              <DownOutlined />
            </Space>
          </Dropdown>
        </Col>
      </Row>
    </div>
  )
}

export default NewContact
