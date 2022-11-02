import React, { useState, useEffect } from 'react'
// components
import { Tabs, Table, Row, Col, Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  MyActiveTasksColumns,
  MyOverDueTasksColumns,
  MyCompletedTasksColumns,
  AllTasksColumns
} from './util'
// css
import styles from './index.module.scss'

const { TabPane } = Tabs
const { Option } = Select

const TaskTabs = () => {
  // table 数据
  const [data, setData] = useState([])
  // tabs key
  const [key, setKey] = useState('My active tasks')
  // 头部pipeline类型
  const [pipelineType, setPipelineType] = useState('Sales pipeline')
  // 表格 选择框更新
  const handleChangeCheckbox = (e, record) => {
    setData((data) => {
      const newData = [...data]
      const index = newData.findIndex((item) => item.id == record.id)
      newData[index].step = e.target.checked ? 0 : 1
      return newData
    })
  }
  // 更改 pipeline 类型
  const handleChangePipeline = (value) => {
    setPipelineType(value)
  }
  const handleChangeTabs = (key) => {
    setKey(key)
  }

  useEffect(() => {
    // 根绝 completed 判断是否选中
    const list = [
      {
        id: 1,
        step: 0,
        description: 'Revise mockup and send it',
        assignedDeal: 'KevinBowen',
        dueTime: '5/14/2022 10:30',
        reminder: '1 day before',
        timeCompleted: '5/14/2022 10:30',
        status: 'Overdue',
        assignee: 'Theo'
      },
      {
        id: 2,
        step: 1,
        description: 'Revise mockup and send it',
        assignedDeal: 'Derrick Person',
        dueTime: '2022/08/23',
        reminder: '30 mins before',
        timeCompleted: '5/14/2022 10:30',
        status: 'Active',
        assignee: 'Cathy'
      },
      {
        id: 3,
        step: 1,
        description: 'Revise mockup and send it',
        assignedDeal: 'Derrick Person',
        dueTime: '2022/08/23',
        reminder: '30 mins before',
        timeCompleted: '5/14/2022 10:30',
        status: 'Completed',
        assignee: 'Neela'
      }
    ]
    setData(list)
    // 当 pipeline 类型 和 tabs 改变时候 需要 更新数据
  }, [pipelineType, key])
  return (
    <div className={styles.taskContent}>
      {/* 选择搜索区域 */}
      <Row justify="space-between" className={styles.taskHeader}>
        <Col>
          <span className={styles.title}>Tasks</span>
          <Select
            defaultValue={['Sales pipeline']}
            style={{
              minWidth: 200
            }}
            size="large"
            onChange={handleChangePipeline}
          >
            <Option value="Sales pipeline">Sales pipeline</Option>
            <Option value="Sales pipeline">Sales pipeline</Option>
          </Select>
        </Col>
        <Col>
          <Input
            size="large"
            placeholder="Search tasks"
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
      <Tabs onChange={handleChangeTabs} type="card" className={styles.tabs}>
        <TabPane tab="My active tasks" key="My active tasks"></TabPane>
        <TabPane tab="My overdue tasks" key="My overdue tasks"></TabPane>
        <TabPane tab="My completed tasks" key="My completed tasks"></TabPane>
        <TabPane tab="All tasks" key="All tasks"></TabPane>
      </Tabs>
      {/* 为了 实现切换 tabs 时候 重置 表格筛选过滤 */}
      {/* 此处 columns 表达式别乱动，动了会导致选择 checkbox 失效，只能每次更新返回新的 columns 才可以生效 */}
      <Table
        className={styles['tabs-table']}
        columns={
          key == 'My active tasks'
            ? MyActiveTasksColumns(handleChangeCheckbox, pipelineType)
            : key == 'My overdue tasks'
            ? MyOverDueTasksColumns(handleChangeCheckbox, pipelineType)
            : key == 'My completed tasks'
            ? MyCompletedTasksColumns(handleChangeCheckbox, pipelineType)
            : AllTasksColumns(pipelineType)
        }
        dataSource={data}
        rowKey="id"
        pagination={{
          showTotal: (total) => `Showing ${total} tasks`
        }}
        key={key}
      />
    </div>
  )
}

export default TaskTabs
