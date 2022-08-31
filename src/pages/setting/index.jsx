import React, { useState } from 'react'
import Head from 'next/head'
// antd -----------------
import { Row, Col, Tabs } from 'antd'
// css ----------------
import styles from './index.module.scss'
//js --------
const { TabPane } = Tabs

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
        <TabPane tab="Assigning" key="Assigning"></TabPane>
        <TabPane tab="Pipeline" key="Pipeline"></TabPane>
        <TabPane tab="Assets" key="Assets"></TabPane>
        <TabPane tab="Users" key="Users"></TabPane>
        <TabPane tab="Reply" key="Reply"></TabPane>
      </Tabs>
      1234
    </>
  )
}

export default Settings
