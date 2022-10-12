import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Login from './components/login'
import { Layout } from 'antd'
import SideBar from './components/sideBar'
import Loading from '../components/loading'
// import LayoutHeader from './components/header'
import styles from './BasicLayout.module.scss'
import 'antd/lib/tooltip/style/index.css'

const { Content, Sider } = Layout

const BasicLayout = ({ children }) => {
  const user = useSelector((store) => store.user)
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
            {/* <Header>
              <LayoutHeader user={user} />
            </Header> */}
            <Content>{children}</Content>
            <Loading collapsed={collapsed} />
          </Layout>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  )
}

export default BasicLayout
