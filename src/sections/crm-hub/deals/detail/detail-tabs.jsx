import React, { useState } from 'react'
// antd -------------
import { Tabs, Row, Col } from 'antd'
// components
import DetailHistory from './components/detail-history'
import DetailEmails from './components/detail-emails'
import DetailCalls from './components/detail-calls'
import DetailChats from './components/detali-chats'
import DetailTasks from './components/detail-tasks'
import DetailNotes from './components/detail-notes'

// css ---------
import styles from './index.module.scss'
//js ------------
const { TabPane } = Tabs

const DetailTabs = (props) => {
  const dealInfo = props.dealInfo
  const [active, setActive] = useState('History')
  const onChange = (key) => {
    setActive(key)
  }
  return (
    <div className={styles['detail-tabs']}>
      <Tabs defaultActiveKey="Emails" onChange={onChange}>
        <TabPane tab="History" key="History">
          <DetailHistory />
        </TabPane>
        <TabPane tab="Emails" key="Emails">
          <DetailEmails dealInfo={dealInfo} />
        </TabPane>
        <TabPane tab="Calls" key="Calls">
          <DetailCalls />
        </TabPane>
        <TabPane tab="Chats" key="Chats">
          <DetailChats />
        </TabPane>
        <TabPane tab="Task" key="Task">
          <DetailTasks />
        </TabPane>
        <TabPane tab="Repository" key="Repository">
          <DetailNotes />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default DetailTabs
