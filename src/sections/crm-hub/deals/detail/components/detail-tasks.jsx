import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Button, Space, Radio } from 'antd'
import { Icon } from '../../../../../components/commons'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import TaskEdit from './task/task-edit'
import RadioContent from './task/radio-content'

import styles from './task.module.scss'

const DetailTasks = () => {
  //  this week
  const [currentWeekList, setCurrentWeekList] = useState([])
  // last week
  const [lastWeekList, setLastWeekList] = useState([])
  // before last week
  const [beforeLastWeekList, setBeforeLastWeekList] = useState({})
  // active
  const [radioValue, setRadioValue] = useState(null)
  // show New Task Modal
  const [showNewTask, setShowNewTask] = useState(false)
  const changeRadioValue = (e) => {
    setRadioValue(e.target.value)
  }
  useEffect(() => {
    const list = [
      {
        id: 1,
        time: '5/13/2022 10:00 AM',
        title: 'Remind the client to check the mockup and quote',
        reminder: '1 day before',
        detail:
          'Remember to make the new mockup based on the suggestions from the client and send it to the client.Remember to make the new mockup based on the suggestions from the client and send it to the client.'
      },
      {
        id: 2,
        time: '28/08/2022 10:00 AM',
        title: 'Remind the client to check the mockup and quote',
        reminder: '1 day before',
        detail:
          'Remember to make the new mockup based on the suggestions from the client and send it to the client.'
      }
    ]
    setCurrentWeekList(list)
  }, [])
  return (
    <div className={styles.taskWrap}>
      <Row justify="space-between" className={styles['task-search-wrap']}>
        <Col>
          <Input
            placeholder="search task"
            prefix={<SearchOutlined />}
            allowClear
          />
        </Col>
        <Col>
          <Button
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={() => setShowNewTask(true)}
          >
            <PlusOutlined />
            New task
          </Button>
        </Col>
      </Row>
      {showNewTask && (
        <div style={{ marginTop: '16px' }}>
          <TaskEdit discount={() => setShowNewTask(false)} type="add" />
        </div>
      )}
      <div className={styles.weekContainer}>
        <div className={styles.weekTitle}>This WEEK</div>
        <div className={styles.weekContainer}>
          <Radio.Group value={radioValue} onChange={changeRadioValue}>
            <Space direction="vertical">
              {currentWeekList.map((item) => {
                return (
                  <Radio value={item.id} key={item.id}>
                    <RadioContent taskItem={item} radioValue={radioValue} />
                  </Radio>
                )
              })}
            </Space>
          </Radio.Group>
        </div>
      </div>
    </div>
  )
}

export default DetailTasks
