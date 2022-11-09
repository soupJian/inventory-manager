import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useSelector, useDispatch } from 'react-redux'
// components
const SideBar = dynamic(() => import('./components/sideBar'))
const Loading = dynamic(() => import('../components/loading'))
import { Layout } from 'antd'
// js
import { logoutUser } from '../store/slices/userSlice'
// css
import styles from './BasicLayout.module.less'
// js
const { Content, Sider } = Layout

// main
const BasicLayout = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const global = useSelector((store) => store.global)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const currentVersion = JSON.parse(
      JSON.stringify(localStorage.getItem('version'))
    )
    if (!currentVersion || currentVersion != process.env.version) {
      dispatch(logoutUser())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Layout className={styles.mainLayout}>
      <Sider
        className={styles.sider}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={collapsed ? 104 : 231}
        style={{
          zIndex: 99
        }}
      >
        <SideBar collapsed={collapsed} user={user} />
      </Sider>
      <Layout
        style={{ marginLeft: collapsed ? '104px' : '231px' }}
        className={styles.siteLayout}
      >
        <Content>{children}</Content>
        {global.loading && (
          <Loading collapsed={collapsed} left={collapsed ? '104px' : '231px'} />
        )}
      </Layout>
    </Layout>
  )
}

export default BasicLayout
