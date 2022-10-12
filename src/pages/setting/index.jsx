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
import styles from './index.module.scss'
//js --------
const { TabPane } = Tabs
const tabslist = ['Assigning', 'Pipeline', 'Assets', 'Users', 'Reply']
const Settings = ({ router }) => {
  const hash = router.asPath.split('#')[1]
  const [active, setActive] = useState(hash || tabslist[0])
  const handleChangeTabs = (key) => {
    setActive(key)
  }
  useEffect(() => {
    router.replace(`/setting#${active}`, null, { shallow: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
  return (
    <>
      <Head>
        <title>CRM Hub | Settings</title>
      </Head>
      <div className={styles.title}>Settings</div>
      <Tabs
        className={styles.tabs}
        activeKey={active}
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
export default withRouter(Settings)
