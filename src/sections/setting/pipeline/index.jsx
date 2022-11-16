import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// components -----------
import { Row, Col, Select } from 'antd'
import PipelineItem from './components/pipeline-item.jsx'
// api
import {
  getSalesPipeline,
  getSupportPipeline,
  getReturnPipeline,
  getReplacePipeline,
  getReturnReplacePipeline
} from '@/service/setting/setting-pipeline'
// js
import { pipelineReturn, headerSelectOption } from '@/constants/setting'
import { toggleLoading } from '@/store/slices/globalSlice'
// css
import styles from './index.module.less'

const { Option } = Select

const Pipeline = () => {
  const dispatch = useDispatch()
  const [headerSelect, setHeaderSelect] = useState('Sales pipeline')
  const [reverseActive, setReverseActive] = useState('Return')
  const [list, setList] = useState([])
  // 获取数据
  const getData = async () => {
    dispatch(toggleLoading(true))
    let res = null
    if (headerSelect == 'Sales pipeline') {
      res = await getSalesPipeline()
    } else if (headerSelect == 'Support pipeline') {
      res = await getSupportPipeline()
    } else {
      // headerSelect == 'Reverse logistics'
      if (reverseActive == 'Return') {
        res = await getReturnPipeline()
      } else if (reverseActive == 'Replace') {
        res = await getReplacePipeline()
      } else {
        // reverseActive == 'Return & Replace'
        res = await getReturnReplacePipeline()
      }
    }
    // 开启loading
    setList(res.Item.pipelines)
    // 关闭loading
    dispatch(toggleLoading(false))
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerSelect, reverseActive])
  return (
    <div>
      {/* header-search */}
      <Row className={styles['header-select']} align="middle" gutter={10}>
        <Col className={styles.selectText}>Select</Col>
        <Col>
          <Select
            className={styles.selectWrap}
            value={headerSelect}
            style={{
              width: 200
            }}
            onChange={(value) => {
              setHeaderSelect(value)
            }}
          >
            {headerSelectOption.map((item) => {
              return (
                <Option value={item} key={item}>
                  {item}
                </Option>
              )
            })}
          </Select>
        </Col>
      </Row>
      {/* container */}
      {headerSelect == 'Sales pipeline' && (
        <PipelineItem list={list} getData={getData} type="sales" />
      )}
      {headerSelect == 'Support pipeline' && (
        <PipelineItem list={list} getData={getData} type="support" />
      )}
      {headerSelect == 'Reverse logistics' && (
        <>
          <div className={styles['header-tabs']}>
            {pipelineReturn.map((item) => {
              return (
                <div
                  key={item}
                  className={`${reverseActive == item ? styles.active : ''}`}
                  onClick={() => {
                    setReverseActive(item)
                  }}
                >
                  {item}
                </div>
              )
            })}
          </div>
          <PipelineItem list={list} getData={getData} type={reverseActive} />
        </>
      )}
    </div>
  )
}

export default Pipeline
