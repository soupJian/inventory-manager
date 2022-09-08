import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Login from '../components/login'
import { Layout, Menu } from 'antd'
import { SideBar, Header as LayoutHeader } from '../components/commons'
import styles from './BasicLayout.module.scss'
const { Header, Content, Footer, Sider } = Layout
import 'antd/lib/tooltip/style/index.css'
const BasicLayout = ({ children }) => {
  const user = useSelector((store) => store.user)
  console.log(user)
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
          >
            <SideBar />
          </Sider>
          <Layout
            style={{ marginLeft: collapsed ? '80px' : '200px' }}
            className={styles.siteLayout}
          >
            <Header>
              <LayoutHeader user={user} />
            </Header>
            <Content>{children}</Content>
          </Layout>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  )
}

export default BasicLayout
