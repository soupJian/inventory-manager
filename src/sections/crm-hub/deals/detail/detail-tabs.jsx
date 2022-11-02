import React, { useState } from 'react'
// antd -------------
import { Tabs } from 'antd'
// components
import DetailTimeLine from './components/detail-timeline'
import DetailEmails from './components/detail-emails'
// import DetailCalls from './components/detail-calls'
// import DetailChats from './components/detali-chats'
import DetailTasks from './components/detail-tasks'
import DetailRepository from './components/detail-repository'
// css ---------
import styles from './detail-tabs.module.scss'

const { TabPane } = Tabs

// main
const DetailTabs = (props) => {
  const dealInfo = props.dealInfo
  const [active, setActive] = useState('History')
  const onChange = (key) => {
    setActive(key)
  }
  return (
    <div className={styles['detail-tabs']}>
      <Tabs defaultActiveKey={active} onChange={onChange}>
        <TabPane tab="Timeline" key="Timeline">
          <DetailTimeLine />
        </TabPane>
        <TabPane tab="Emails" key="Emails">
          <DetailEmails dealInfo={dealInfo} />
        </TabPane>
        {/* <TabPane tab="Calls" key="Calls">
          <DetailCalls />
        </TabPane> */}
        {/* <TabPane tab="Chats" key="Chats">
          <DetailChats />
        </TabPane> */}
        <TabPane tab="Tasks" key="Tasks">
          <DetailTasks />
        </TabPane>
        <TabPane tab="Repository" key="Repository">
          <DetailRepository />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default DetailTabs
