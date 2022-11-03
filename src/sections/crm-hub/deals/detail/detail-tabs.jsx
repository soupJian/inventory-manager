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
import styles from './detail-tabs.module.less'

// main
const DetailTabs = (props) => {
  const dealInfo = props.dealInfo
  const [active, setActive] = useState('History')
  const onChange = (key) => {
    setActive(key)
  }
  return (
    <div className={styles['detail-tabs']}>
      <Tabs
        defaultActiveKey={active}
        onChange={onChange}
        items={[
          {
            label: 'Timeline',
            key: 'Timeline',
            children: <DetailTimeLine />
          },
          {
            label: 'Emails',
            key: 'Emails',
            children: <DetailEmails dealInfo={dealInfo} />
          },
          // {
          //   label: 'Calls',
          //   key:'Calls',
          //   children: <DetailCalls /
          // },
          // {
          //   label: 'Chats',
          //   key:'Chats',
          //   children:  <DetailChats />
          // },
          {
            label: 'Tasks',
            key: 'Tasks',
            children: <DetailTasks />
          },
          {
            label: 'Repository',
            key: 'Repository',
            children: <DetailRepository />
          }
        ]}
      ></Tabs>
    </div>
  )
}

export default DetailTabs
