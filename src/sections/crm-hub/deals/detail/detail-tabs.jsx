import React, { useState } from 'react'
// antd -------------
import { Tabs, Row, Col } from 'antd'
// components
import DetailHistor from './detail-history'
import DetailEmails from './detail-emails'
import DetailCalls from './detail-calls'
import DetailChats from './detali-chats'
import DetailTasks from './detail-tasks'
import DetailNotes from './detail-notes'

// css ---------
import styles from './index.module.scss'
//js ------------
const { TabPane } = Tabs

const DetailTabs = () => {
  const [active, setActive] = useState('History')
  const onChange = (key) => {
    setActive(key)
  }
  return (
    <div className={styles['detail-tabs']}>
      <Tabs defaultActiveKey="History" onChange={onChange}>
        <TabPane tab="History" key="History">
          Historys
        </TabPane>
        <TabPane tab="Emails" key="Emails">
          Emails
        </TabPane>
        <TabPane tab="Calls" key="Calls">
          Calls
        </TabPane>
        <TabPane tab="Chats" key="Chats">
          Chats
        </TabPane>
        <TabPane tab="Task" key="Task">
          Tasks
        </TabPane>
        <TabPane tab="Repository" key="Repository">
          Repository
        </TabPane>
      </Tabs>
    </div>
  )
}

export default DetailTabs
