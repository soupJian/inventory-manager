import React, { useState } from 'react'
import Head from 'next/head'
// antd -----------------
import { Tabs } from 'antd'
// components --------------
import Assiging from '../../sections/setting/assigning/index'
import Pipeline from '../../sections/setting/pipeline/index'
import Assets from '../../sections/setting/assets/index'
import Users from '../../sections/setting/users/index'

// css ----------------
import styles from './index.module.scss'
//js --------
const { TabPane } = Tabs
const tabslist = ['Assigning', 'Pipeline', 'Assets', 'Users', 'Reply']
const Settings = () => {
  const [active, setActive] = useState('Users')
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
    </>
  )
}

export default Settings
