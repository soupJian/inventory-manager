import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'next/router'
import Head from 'next/head'
// antd -----------------
import { Tabs } from 'antd'
// components --------------
import Assets from '../../../sections/setting/assets'
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
    const accessList = user.user.access.accesses
    setTabsList((list) => {
      const newList = [...list]
      if (
        accessList.includes('settingAssiging') ||
        user.userRole == 'Super Admin' ||
        user.user.Role == 'Admin'
      ) {
        newList.push({
          label: 'Assigning',
          key: 'assigning'
        })
      }
      if (
        accessList.includes('settingPipeline') ||
        user.userRole == 'Super Admin' ||
        user.user.Role == 'Admin'
      ) {
        newList.push({
          label: 'Pipeline',
          key: 'pipeline'
        })
      }
      if (
        accessList.includes('settingAssets') ||
        user.userRole == 'Super Admin' ||
        user.user.Role == 'Admin'
      ) {
        newList.push({
          label: 'Assets',
          key: 'assets'
        })
      }
      if (
        accessList.includes('settingUsers') ||
        user.userRole == 'Super Admin' ||
        user.user.Role == 'Admin'
      ) {
        newList.push({
          label: 'Users',
          key: 'users'
        })
      }
      if (
        accessList.includes('settingReply') ||
        user.userRole == 'Super Admin' ||
        user.user.Role == 'Admin'
      ) {
        newList.push({
          label: 'Reply',
          key: 'reply'
        })
      }
      return newList
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
        activeKey="assets"
        onChange={handleChangeTabs}
        items={tabslist}
      ></Tabs>
      <Assets />
    </>
  )
}
export default withRouter(Settings)
