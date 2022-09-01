import React from 'react'
import { Row, Col, Space } from 'antd'
import { Icon } from '../../../components/commons'
import styles from '../pipeline.module.scss'
import PipelineEdit from './pipeline-edit'

const PipelineSales = ({ salesList, updateSalesPipeline }) => {
  return (
    <Row gutter={20} className={styles.container}>
      <Col span={8}>
        <Row gutter={[0, 28]} align="middle">
          {salesList
            .filter((filterItem, i) => i < 5)
            .map((item) => {
              return (
                <PipelineEdit
                  key={item.name}
                  item={item}
                  salesList={salesList}
                  updatePipeline={updateSalesPipeline}
                />
              )
            })}
        </Row>
      </Col>
      <Col span={8}></Col>
      <Col span={8}></Col>
    </Row>
  )
}

export default PipelineSales
