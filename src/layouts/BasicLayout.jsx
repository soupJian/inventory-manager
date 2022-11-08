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
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('inventory')
        break
      case '/warehouse' ||
        '/warehouse/item' ||
        '/warehouse/product' ||
        '/warehouse/search-product' ||
        '/warehouse/search-inventory':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('warehouse')
        break
      case '/shipping':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('shipping')
        break
      case '/orders':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('orders')
        break
      case '/crm-hub/form-email':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('crmFormEmail')
        break
      case '/crm-hub/chats':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('crmChats')
        break
      case '/crm-hub/deals' || '/crm-hub/deals/detail':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('crmDeals')
        break
      case '/crm-hub/tickets' || '/crm-hub/tickets/detail':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('crmTickets')
        break
      case '/crm-hub/tasks':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('crmTasks')
        break
      case '/crm-hub/dashboard':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('crmDashDashboard')
        break
      case '/setting/assigning':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('settingAssiging')
        break
      case '/setting/pipeline':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('settingPipeline')
        break
      case '/setting/assets':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('settingAssets')
        break
      case '/setting/users':
        flag = accessName == 'Super Admin'
        break
      case '/setting/reply':
        flag =
          accessName == 'Super Admin' ||
          accessName == 'Admin' ||
          accessList.includes('settingReply')
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
