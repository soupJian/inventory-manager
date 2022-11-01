import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// redux
import { useSelector } from 'react-redux'
// components
const SideBar = dynamic(()=>import('./components/sideBar'))
const Loading = dynamic(()=>import('../components/loading'))
import { Layout } from 'antd'
// api
import Login from './components/login'

import styles from './BasicLayout.module.scss'
import 'antd/lib/tooltip/style/index.css'

const { Content, Sider } = Layout

const BasicLayout = ({ children }) => {
  const user = useSelector((store) => store.user)
  const global = useSelector((store) => store.global)
  const [collapsed, setCollapsed] = useState(false)
  return (
    <>
      {user.isLoggedIn ? (
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
              <Loading
                collapsed={collapsed}
                left={collapsed ? '104px' : '231px'}
              />
            )}
          </Layout>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  )
}

export default BasicLayout
