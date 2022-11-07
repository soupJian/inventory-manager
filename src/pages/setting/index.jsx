import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
// antd -----------------
import { Tabs } from 'antd'
// components --------------
import Assiging from '../../sections/setting/assigning'
import Pipeline from '../../sections/setting/pipeline'
import Assets from '../../sections/setting/assets'
import Users from '../../sections/setting/users'
import Reply from '../../sections/setting/reply'
// css ----------------
import styles from './index.module.less'

const tabslist = [
  {
    label: 'Assigning',
    key: 'Assigning'
  },
  {
    label: 'Pipeline',
    key: 'Pipeline'
  },
  {
    label: 'Assets',
    key: 'Assets'
  },
  {
    label: 'Users',
    key: 'Users'
  },
  {
    label: 'Reply',
    key: 'Reply'
  }
]

// main
const Settings = ({ router }) => {
  const [activeTab, setActiveTab] = useState(tabslist[0].key)
  const handleChangeTabs = (key) => {
    setActiveTab(key)
    router.replace(`/setting?tab=${key}`, null, { shallow: true })
  }
  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab)
    }
  }, [router])
  return (
    <>
      <Head>
        <title>CRM Hub | Settings</title>
      </Head>
      <div className={styles.title}>Settings</div>
      <Tabs
        className={styles.tabs}
        activeKey={activeTab}
        onChange={handleChangeTabs}
        items={tabslist}
      ></Tabs>
      {activeTab == 'Assigning' && <Assiging />}
      {activeTab == 'Pipeline' && <Pipeline />}
      {activeTab == 'Assets' && <Assets />}
      {activeTab == 'Users' && <Users />}
      {activeTab == 'Reply' && <Reply />}
    </>
  )
}
export default withRouter(Settings)
