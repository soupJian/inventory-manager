import React, { useState } from 'react'
import { Row, Col, Select, Space, Button } from 'antd'
import styles from './index.module.scss'
const { Option } = Select

const ModalMerge = () => {
  // assign list
  const [assignList, setAssignList] = useState([])
  // assgin value
  const [assignValue, setAssignValue] = useState('')
  // 搜素输入框的 assign
  const handleSearchAssign = (newValue) => {
    if (newValue) {
      // 输入数值，调用接口搜索 注意防抖
      console.log(newValue)
      setAssignList([
        {
          value: '1',
          text: '1234'
        }
      ])
      // fetch(newValue)
    } else {
      setAssignList([])
    }
  }
  // 点击 search assign 的 option
  const handleChangeAssign = (newValue) => {
    setAssignValue(newValue)
  }
  return (
    <div className={styles['modal-merge']}>
      <Row>
        <Col span={24} style={{ fontWeight: '500', marginBottom: '10px' }}>
          deal to be merged*
        </Col>
        <Col span={24}>
          <Select
            style={{ width: '100%' }}
            size="large"
            showSearch
            value={assignValue}
            placeholder="Type and select"
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearchAssign}
            onChange={handleChangeAssign}
            notFoundContent={null}
          >
            {assignList.map((d) => (
              <Option key={d.value}>{d.text}</Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <Space>
            <Button className={styles.cancelBtn}>Cancel</Button>
            <Button className={styles.mergeBtn} disabled={assignValue == ''}>
              Merge
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default ModalMerge
