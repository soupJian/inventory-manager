import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../../../store/slices/globalSlice'
import { Row, Col, Input, Select, Space, Button, message } from 'antd'
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons'
import { pipelineColors } from '../../../../constants/setting'
import {
  postSalesPipeline,
  postSupportPipeline,
  postReturnPipeline,
  postReplacePipeline,
  postReturnReplacePipeline
} from '../../../../service/setting/setting-pipeline'
import styles from '../index.module.scss'
import PipelineEdit from './pipeline-edit'
import { v4 as uuidv4 } from 'uuid'

const { Option } = Select

const PipelineSales = ({ list, getData, type }) => {
  const dispatch = useDispatch()
  const [statusName, setStatusName] = useState('')
  const [afterValue, setAfterValue] = useState(null)
  // 编辑 slaes pipeline
  const updateSalesPipeline = async (oldValue, newValue) => {
    const index = list.findIndex((item) => item.salesStatus == oldValue)
    const newList = JSON.parse(JSON.stringify(list))
    newList[index].salesStatus = newValue
    // 开启loading
    dispatch(toggleLoading())
    if (type == 'sales') {
      await postSalesPipeline(newList)
    } else if (type == 'support') {
      await postSupportPipeline(newList)
    } else if (type == 'Return') {
      await postReturnPipeline(newList)
    } else if (type == 'Replace') {
      await postReplacePipeline(newList)
    } else {
      // type == Return & Replace
      await postReturnReplacePipeline(newList)
    }
    await getData()
    // // 关闭loading
    dispatch(toggleLoading())
  }
  // 创建 sale pipeline
  const create = async () => {
    // 校验
    if (!afterValue) {
      message.error('please select status!')
      return
    }
    const index = list.findIndex((item) => item.salesStatus == statusName)
    if (index >= 0) {
      message.error(`${statusName} is already exist!`)
      return
    }
    if (list.length >= 10) {
      return
    }
    // 更新
    const newList = [...list]
    const newColors = [...pipelineColors]
    // 过滤已经使用过的颜色
    newList.forEach((item) => {
      newColors.splice(
        newColors.findIndex((color) => color == item.color),
        1
      )
    })
    const i = newList.findIndex((item) => item.salesStatus == afterValue)
    newList.splice(i + 1, 0, {
      color: newColors[0],
      editable: true,
      salesStatus: statusName
    })
    // 开启loading
    dispatch(toggleLoading())
    if (type == 'sales') {
      await postSalesPipeline(newList)
    } else if (type == 'support') {
      await postSupportPipeline(newList)
    } else if (type == 'Return') {
      await postReturnPipeline(newList)
    } else if (type == 'Replace') {
      await postReplacePipeline(newList)
    } else {
      // type == Return & Replace
      await postReturnReplacePipeline(newList)
    }
    await getData()
    // 关闭loading
    dispatch(toggleLoading())
    setStatusName('')
    setAfterValue(null)
  }
  return (
    <Row gutter={20} className={styles.container}>
      <Col span={8}>
        <Row gutter={[0, 28]} align="middle">
          {list
            .filter((_, i) => i < 5)
            .map((item) => {
              return (
                <PipelineEdit
                  key={item.salesStatus}
                  item={item}
                  list={list}
                  updatePipeline={updateSalesPipeline}
                  disabled={!item.editable}
                />
              )
            })}
        </Row>
      </Col>
      <Col span={8}>
        <Row gutter={[0, 28]} align="middle">
          {list.slice(5, 10).map((item) => {
            return (
              <PipelineEdit
                key={item.salesStatus}
                item={item}
                list={list}
                updatePipeline={updateSalesPipeline}
                disabled={!item.editable}
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
              disabled={list.length >= 10}
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
                  {list
                    .filter((current) => current.editable)
                    .map((item) => {
                      return (
                        <Option key={item.salesStatus} value={item.salesStatus}>
                          {item.salesStatus}
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
