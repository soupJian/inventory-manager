import React, { useState } from 'react'
import { Row, Col, Input, Select, Space, Button, message } from 'antd'
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons'
import { pipelineColors } from '../../../../constants/setting'

import styles from '../index.module.scss'
import PipelineEdit from './pipeline-edit'

const { Option } = Select

const PipelineSales = () => {
  const [supportList, setSupportList] = useState([
    {
      name: 'Waiting on us',
      color: '#FF7B7B'
    },
    {
      name: 'Waiting on contact',
      color: '#FABF66'
    },
    {
      name: 'Resolved',
      color: '#2EBEBD'
    },
    {
      name: 'Closed lost',
      color: '#B7B7B7'
    }
  ])
  const [statusName, setStatusName] = useState('')
  const [afterValue, setAfterValue] = useState(null)
  // 编辑 slaes pipeline
  const updateSalesPipeline = (oldValue, newValue) => {
    setSupportList((list) => {
      const index = supportList.findIndex((item) => item.name == oldValue)
      const newList = [...list]
      newList[index].name = newValue
      return newList
    })
  }
  // 创建 sale pipeline
  const create = () => {
    if (!afterValue) {
      message.error('please select status!')
      return
    }
    const index = supportList.findIndex((item) => item.name == statusName)
    if (index >= 0) {
      message.error(`${statusName} is already exist!`)
      return
    }
    if (supportList.length >= 10) {
      return
    }
    setSupportList((list) => {
      const newList = [...list]
      const newColors = [...pipelineColors]
      // 过滤已经使用过的颜色
      newList.forEach((item) => {
        newColors.splice(
          newColors.findIndex((color) => color == item.color),
          1
        )
      })

      const index = newList.findIndex((item) => item.name == afterValue)
      newList.splice(index + 1, 0, {
        name: statusName,
        color: newColors[0]
      })
      return newList
    })
    setStatusName('')
    setAfterValue(null)
  }
  return (
    <Row gutter={20} className={styles.container}>
      <Col span={8}>
        <Row gutter={[0, 28]} align="middle">
          {supportList
            .filter((_, i) => i < 5)
            .map((item, index) => {
              return (
                <PipelineEdit
                  key={item.name}
                  item={item}
                  supportList={supportList}
                  updatePipeline={updateSalesPipeline}
                  // 最后两个 closed lost 和 closed won 不允许编辑
                  disabled={
                    supportList.findIndex(
                      (current) => current.name == item.name
                    ) ==
                      supportList.length - 1 ||
                    supportList.findIndex(
                      (current) => current.name == item.name
                    ) ==
                      supportList.length - 2
                  }
                />
              )
            })}
        </Row>
      </Col>
      <Col span={8}>
        <Row gutter={[0, 28]} align="middle">
          {supportList.slice(5, 10).map((item) => {
            return (
              <PipelineEdit
                key={item.name}
                item={item}
                supportList={supportList}
                updatePipeline={updateSalesPipeline}
                // 最后两个 closed lost 和 closed won 不允许编辑
                disabled={
                  supportList.findIndex(
                    (current) => current.name == item.name
                  ) ==
                    supportList.length - 1 ||
                  supportList.findIndex(
                    (current) => current.name == item.name
                  ) ==
                    supportList.length - 2
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
              onChange={(e) => setStatusName(e.target.value)}
              className={styles.addInput}
              disabled={supportList.length >= 10}
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
                  value={afterValue}
                  placeholder="Select status"
                  onChange={(value) => setAfterValue(value)}
                >
                  {supportList
                    .filter(
                      (_, i) =>
                        i != supportList.length - 1 &&
                        i != supportList.length - 2
                    )
                    .map((item) => {
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
                      setAfterValue(null)
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
