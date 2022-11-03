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
  const hash = router.asPath.split('#')[1]
  const [active, setActive] = useState(hash || tabslist[0].key)
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
        items={tabslist}
      ></Tabs>
      {active == 'Assigning' && <Assiging />}
      {active == 'Pipeline' && <Pipeline />}
      {active == 'Assets' && <Assets />}
      {active == 'Users' && <Users />}
      {active == 'Reply' && <Reply />}
    </>
  )
}
export default withRouter(Settings)
