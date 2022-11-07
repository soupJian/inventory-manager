import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { withRouter } from 'next/router'
// antd -----------------
import { Tabs } from 'antd'
// components --------------
import Pipeline from '../../../sections/setting/pipeline'
// js
import { compluteTabList } from '../../../constants/setting'
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
    if (!user.user) return
    const accessList = user.user.access.accesses
    setTabsList((list) => {
      return compluteTabList(accessList, user, list)
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
        activeKey="pipeline"
        onChange={handleChangeTabs}
        items={tabslist}
      ></Tabs>
      <Pipeline />
    </>
  )
}
export default withRouter(Settings)
