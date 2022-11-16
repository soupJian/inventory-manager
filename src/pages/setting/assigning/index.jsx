import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'next/router'
import Head from 'next/head'
// antd -----------------
import { Tabs } from 'antd'
// components --------------
import Assiging from '@/sections/setting/assigning'
// js
import { compluteTabList } from '@/constants/setting'
// css ----------------
import styles from '../index.module.less'

// main
const Settings = ({ router }) => {
  const user = useSelector((state) => state.user)
  const [tabslist, setTabsList] = useState([])
  const handleChangeTabs = (key) => {
    router.push(`/setting/${key}`)
  }
  useEffect(() => {
    if (!user.isLoggedIn) return
    setTabsList((list) => {
      return compluteTabList(user, list)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Head>
        <title>CRM Hub | Settings</title>
      </Head>
      <div className={styles.title}>Settings</div>
      <Tabs
        className={styles.tabs}
        activeKey="assigning"
        onChange={handleChangeTabs}
        items={tabslist}
      ></Tabs>
      <Assiging />
    </>
  )
}
export default withRouter(Settings)
