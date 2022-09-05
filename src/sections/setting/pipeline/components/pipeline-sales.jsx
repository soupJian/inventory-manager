import React, { useState } from 'react'
import { Row, Col, Input, Select, Space, Button, message } from 'antd'
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons'

import styles from '../index.module.scss'
import PipelineEdit from './pipeline-edit'

const { Option } = Select

const PipelineSales = ({
  salesList,
  updateSalesPipeline,
  createSalesPipeline
}) => {
  const [statusName, setStatusName] = useState('')
  const [selectValue, setSelectValue] = useState(null)

  const addNewValue = (e) => {
    setStatusName(e.target.value)
  }
  const create = () => {
    if (!selectValue) {
      message.error('please select status!')
      return
    }
    const index = salesList.findIndex((item) => item.name == statusName)
    if (index >= 0) {
      message.error(`${statusName} is already exist!`)
      return
    }
    createSalesPipeline(statusName, selectValue)
    setStatusName('')
    setSelectValue(null)
  }
  return (
    <Row gutter={20} className={styles.container}>
      <Col span={8}>
        <Row gutter={[0, 28]} align="middle">
          {salesList
            .filter((_, i) => i < 5)
            .map((item, index) => {
              return (
                <PipelineEdit
                  key={item.name}
                  item={item}
                  salesList={salesList}
                  updatePipeline={updateSalesPipeline}
                  // 最后两个 closed lost 和 closed won 不允许编辑
                  disabled={
                    salesList.findIndex(
                      (current) => current.name == item.name
                    ) ==
                      salesList.length - 1 ||
                    salesList.findIndex(
                      (current) => current.name == item.name
                    ) ==
                      salesList.length - 2
                  }
                />
              )
            })}
        </Row>
      </Col>
      <Col span={8}>
        <Row gutter={[0, 28]} align="middle">
          {salesList.slice(5, 10).map((item) => {
            return (
              <PipelineEdit
                key={item.name}
                item={item}
                salesList={salesList}
                updatePipeline={updateSalesPipeline}
                // 最后两个 closed lost 和 closed won 不允许编辑
                disabled={
                  salesList.findIndex((current) => current.name == item.name) ==
                    salesList.length - 1 ||
                  salesList.findIndex((current) => current.name == item.name) ==
                    salesList.length - 2
                }
              />
            )
          })}
        </Row>
      </Col>
      <Col span={8}>
        <Row gutter={[0, 14]}>
          <Col span={24} className={styles.labelTitle}>
            Add new status
          </Col>
          <Col span={24}>
            <Input
              value={statusName}
              placeholder="Type status name"
              onChange={addNewValue}
              className={styles.addInput}
            />
          </Col>
          {statusName != '' && (
            <>
              <Col span={24} className={styles.labelTitle}>
                Add after
              </Col>
              <Col span={24}>
                <Select
                  style={{
                    width: '268px'
                  }}
                  size="large"
                  value={selectValue}
                  placeholder="Select status"
                  onChange={(value) => setSelectValue(value)}
                >
                  {salesList.map((item) => {
                    return (
                      <Option key={item.name} value={item.name}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              </Col>
              <Col>
                <Space>
                  <Button
                    className={styles.cancelBtn}
                    onClick={() => {
                      setStatusName('')
                      setSelectValue(null)
                    }}
                  >
                    <Space>
                      <DeleteOutlined />
                      Discard
                    </Space>
                  </Button>
                  <Button className={styles.saveBtn} onClick={() => create()}>
                    <Space>
                      <CheckOutlined />
                      Create
                    </Space>
                  </Button>
                </Space>
              </Col>
            </>
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default PipelineSales
