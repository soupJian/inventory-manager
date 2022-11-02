import React, { useEffect, useState } from 'react'
// components
import { Row, Col, Input, Button } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import TaskEdit from './task/task-edit'
import TaskContent from './task/task-content'
// css
import styles from './task.module.scss'

// main
const DetailTasks = () => {
  //  this week
  const [currentWeekList, setCurrentWeekList] = useState([])
  // last week
  const [lastWeekList, setLastWeekList] = useState([])
  // before last week
  const [beforeLastWeekList, setBeforeLastWeekList] = useState({})
  // show New Task Modal
  const [showNewTask, setShowNewTask] = useState(false)
  const handleChangeStatus = (e, item) => {
    console.log(e)
    console.log(item)
    // setRadioValue(e.target.value)
  }
  useEffect(() => {
    const list = [
      {
        id: 1,
        time: '5/13/2022 10:00 AM',
        title: 'Remind the client to check the mockup and quote',
        reminder: '1 day before',
        detail:
          'Remember to make the new mockup based on the suggestions from the client and send it to the client.Remember to make the new mockup based on the suggestions from the client and send it to the client.',
        taskStatus: 0 // 0 表示已完成 1 未完成
      },
      {
        id: 2,
        time: '28/08/2022 10:00 AM',
        title: 'Remind the client to check the mockup and quote',
        reminder: '1 day before',
        detail:
          'Remember to make the new mockup based on the suggestions from the client and send it to the client.',
        taskStatus: 1 // 0 表示已完成 1 未完成
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
        <div className={styles.weekContent}>
          {currentWeekList.map((item) => {
            return (
              <TaskContent
                taskItem={item}
                key={item.id}
                handleChangeStatus={handleChangeStatus}
              />
            )
          })}
        </div>
      </div>
      <div className={styles.weekContainer}>
        <div className={styles.weekTitle}>Last WEEK</div>
        <div className={styles.weekContent}>
          {currentWeekList.map((item) => {
            return (
              <TaskContent
                taskItem={item}
                key={item.id}
                handleChangeStatus={handleChangeStatus}
              />
            )
          })}
        </div>
      </div>
      <div className={styles.weekContainer}>
        <div className={styles.weekTitle}>Before last WEEK</div>
        <div className={styles.weekContent}>
          {currentWeekList.map((item) => {
            return (
              <TaskContent
                taskItem={item}
                key={item.id}
                handleChangeStatus={handleChangeStatus}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DetailTasks
