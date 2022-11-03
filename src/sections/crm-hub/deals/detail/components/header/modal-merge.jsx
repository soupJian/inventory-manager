import React, { useState } from 'react'
// components
import { Row, Col, Select, Space, Button } from 'antd'
// css
import styles from './index.module.less'
// js
const { Option } = Select

// main
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
        <Col span={24} className={styles.title}>
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
      {assignValue != '' && (
        <>
          <Row style={{ marginTop: '24px' }}>
            <Col span={24} className={styles.title}>
              primary Deal*
            </Col>
            <Col className={styles.description}>
              Choose which deal should be the primary deal. The primary deal’s
              info will be used for the new merged deal. All history activities,
              emails, calls, chats, tasks, and repository of the two deals will
              be transferred to the merged deal.
            </Col>
          </Row>
          <Row className={styles['switchBtn-wrap']} gutter={24}>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <div className={styles.primaryText}></div>
                </Col>
                <Col span={24}>
                  <Button>Cecilia Smith</Button>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <div className={styles.primaryText}>PRIMARY</div>
                </Col>
                <Col span={24}>
                  <Button className={styles.active}>Kevin Bowden</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[0, 20]} className={styles.container}>
            <Col span={24}>
              <span className={styles.label}>Status</span>
              <span className={styles.labelValue}>Mockup revising</span>
            </Col>
            <Col span={24}>
              <span className={styles.label}>Interest</span>
              <span className={styles.labelValue}>Custom Canopy Tent p5</span>
            </Col>
            <Col span={24}>
              <span className={styles.label}>Amount</span>
              <span className={styles.labelValue}>$690</span>
            </Col>
            <Col span={24}>
              <span className={styles.label}>Created</span>
              <span className={styles.labelValue}>5/11/2022</span>
            </Col>
            <Col span={24}>
              <span className={styles.label}>Owner</span>
              <span className={styles.labelValue}>Cathy</span>
            </Col>
          </Row>
        </>
      )}
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
