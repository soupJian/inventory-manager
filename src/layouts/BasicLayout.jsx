import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
// components
const SideBar = dynamic(() => import('./components/sideBar'))
const Loading = dynamic(() => import('../components/loading'))
import NoAccess from './components/no-access'
import { Layout } from 'antd'
// js
import { logoutUser } from '../store/slices/userSlice'
import { accessObject } from '../constants/setting'
// css
import styles from './BasicLayout.module.less'
// js
const { Content, Sider } = Layout

// main
const BasicLayout = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const global = useSelector((store) => store.global)
  const [collapsed, setCollapsed] = useState(false)
  // 是否有权限进入
  const [hasAccess, setHasAccess] = useState(true)
  useEffect(() => {
    const currentVersion = JSON.parse(
      JSON.stringify(localStorage.getItem('version'))
    )
    if (!currentVersion || currentVersion != process.env.version) {
      dispatch(logoutUser())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 权限路由
  useEffect(() => {
    if (!user.isLoggedIn) {
      router.replace('/login')
      return
    }
    const accessList = user.user.access.accesses
    const accessName = user.user.access.accessName
    const pathname = router.pathname
    let flag = false
    switch (pathname) {
      case '' || '/':
        flag = true
        break
      case '/inventory' ||
        '/inventory/search-inventory' ||
        '/inventory/search-product':
        flag = accessList.includes(accessObject.inventory)
        break
      case '/warehouse' ||
        '/warehouse/item' ||
        '/warehouse/product' ||
        '/warehouse/search-product' ||
        '/warehouse/search-inventory':
        flag = accessList.includes(accessObject.warehouse)
        break
      case '/shipping':
        flag = accessList.includes(accessObject.shipping)
        break
      case '/orders':
        flag = accessList.includes(accessObject.orders)
        break
      case '/crm-hub/form-email':
        flag = accessList.includes(accessObject.crmFormEmail)
        break
      case '/crm-hub/chats':
        flag = accessList.includes(accessObject.crmChats)
        break
      case '/crm-hub/deals' || '/crm-hub/deals/detail':
        flag = accessList.includes(accessObject.crmDeals)
        break
      case '/crm-hub/tickets' || '/crm-hub/tickets/detail':
        flag = accessList.includes(accessObject.crmTickets)
        break
      case '/crm-hub/tasks':
        flag = accessList.includes(accessObject.crmTasks)
        break
      case '/crm-hub/dashboard':
        flag = accessList.includes(accessObject.crmDashboard)
        break
      case '/setting/assigning':
        flag = accessList.includes(accessObject.settingAssiging)
        break
      case '/setting/pipeline':
        flag = accessList.includes(accessObject.settingPipeline)
        break
      case '/setting/assets':
        flag = accessList.includes(accessObject.settingAssets)
        break
      case '/setting/users':
        flag = accessList.includes(accessObject.settingUsers)
        break
      case '/setting/reply':
        flag = accessList.includes(accessObject.settingReply)
        break
      default:
        flag = false
        break
    }
    setHasAccess(flag)
  }, [router, user])
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
        <Content>{hasAccess ? children : <NoAccess />}</Content>
        {global.loading && (
          <Loading collapsed={collapsed} left={collapsed ? '104px' : '231px'} />
        )}
      </Layout>
    </Layout>
  )
}

export default BasicLayout
