import React, { useState } from 'react'
import Head from 'next/head'
// antd -----------------
import { Tabs } from 'antd'
// components --------------
import Assiging from '../../sections/setting/assigning'
import Pipeline from '../../sections/setting/pipeline'
import Assets from '../../sections/setting/assets'
import Users from '../../sections/setting/users'
import Reply from '../../sections/setting/reply'

// css ----------------
import styles from './index.module.scss'
//js --------
const { TabPane } = Tabs
const tabslist = ['Assigning', 'Pipeline', 'Assets', 'Users', 'Reply']
const Settings = () => {
  const [active, setActive] = useState('Assigning')
  const handleChangeTabs = (key) => {
    setActive(key)
  }
  return (
    <>
      <Head>
        <title>CRM Hub | Settings</title>
      </Head>
      <div className={styles.title}>Settings</div>
      <Tabs
        className={styles.tabs}
        defaultActiveKey={active}
        onChange={handleChangeTabs}
      >
        {tabslist.map((item) => {
          return <TabPane tab={item} key={item}></TabPane>
        })}
      </Tabs>
      {active == 'Assigning' && <Assiging />}
      {active == 'Pipeline' && <Pipeline />}
      {active == 'Assets' && <Assets />}
      {active == 'Users' && <Users />}
      {active == 'Reply' && <Reply />}
    </>
  )
}

export default Settings
