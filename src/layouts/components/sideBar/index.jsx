import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
// hooks
import { useRouter } from 'next/router'
// antd
import { Menu } from 'antd'
// components
import { Icon } from '../../../components/commons'
const History = dynamic(() => import('../history'))
const UserCenter = dynamic(() => import('../user-center'))
// css ----------
import styled from 'styled-components'
import styles from './index.module.less'

// main
const SideBar = ({ collapsed, user }) => {
  const router = useRouter()
  // 默认展示的 menuItem
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState('')
  const [openKeys, setOpenKeys] = useState('')
  const [toggleHistory, setToggleHistory] = useState(false)
  const [toggleUserCenter, setToggleUserCenter] = useState(false)

  // 点击侧边栏 crm hub 事件
  const getItem = useCallback(
    (label, key, icon, children) => {
      return {
        key,
        icon,
        children,
        label,
        onClick: () => {
          if (!children) {
            router.push(key)
          }
        }
      }
    },
    [router]
  )
  // 侧边栏 menu 路由等...
  const [menuItems, setMenuItems] = useState([])
  const [actionItems, setActionItems] = useState([
    {
      key: 'user center',
      icon: <Icon name="user" width="24px" height="24px" />,
      label: 'User Center',
      onClick: () => {
        setToggleHistory(false)
        setToggleUserCenter(!toggleUserCenter)
      }
    }
  ])
  // 动态左侧菜单栏 sidebar路由
  useEffect(() => {
    if (!user.isLoggedIn) {
      return
    }
    console.log(user)
    const accessList = user.user.access.accesses
    const accessName = user.user.access.accessName
    setMenuItems((list) => {
      const newList = [...list]
      // inventory 模块
      if (
        accessList.includes('inventory') ||
        accessName == 'Super Admin' ||
        accessName == 'Admin'
      ) {
        newList.push(
          getItem(
            'Inventory',
            '/inventory',
            <Icon name="inventory" width="24px" height="24px" />
          )
        )
      }
      // warehouse 模块
      if (
        accessList.includes('warehouse') ||
        accessName == 'Super Admin' ||
        accessName == 'Admin'
      ) {
        newList.push(
          getItem(
            'Warehouse',
            '/warehouse',
            <Icon name="warehouse" width="24px" height="24px" />
          )
        )
      }
      // shipping 模块
      if (
        accessList.includes('shipping') ||
        accessName == 'Super Admin' ||
        accessName == 'Admin'
      ) {
        newList.push(
          getItem(
            'Shipping',
            '/shipping',
            <Icon name="orders" width="24px" height="24px" />
          )
        )
      }
      // orders 模块
      if (
        accessList.includes('orders') ||
        accessName == 'Super Admin' ||
        accessName == 'Admin'
      ) {
        newList.push(
          getItem(
            'Orders',
            '/orders',
            <Icon name="bill" width="24px" height="24px" />
          )
        )
      }
      // crm-hub
      if (
        accessList.includes('crmFormEmail') ||
        accessList.includes('crmChats') ||
        accessList.includes('crmDeals') ||
        accessList.includes('crmTickets') ||
        accessList.includes('crmTasks') ||
        accessList.includes('crmDashDashboard') ||
        accessName == 'Super Admin' ||
        accessName == 'Admin'
      ) {
        const crmhubList = []
        if (accessList.includes('crmFormEmail')) {
          crmhubList.push(getItem('Forms & Emails', '/crm-hub/form-email'))
        }
        if (accessList.includes('crmDeals')) {
          crmhubList.push(getItem('Deals', '/crm-hub/deals'))
        }
        if (accessList.includes('crmChats')) {
          crmhubList.push(getItem('Deals', '/crm-hub/deals'))
        }
        if (accessList.includes('Tickets')) {
          crmhubList.push(getItem('Tickets', '/crm-hub/tickets'))
        }
        if (accessList.includes('Task')) {
          crmhubList.push(getItem('Task', '/crm-hub/task'))
        }
        if (accessList.includes('Dashboard')) {
          crmhubList.push(getItem('Dashboard', '/crm-hub/dashboard'))
        }
        newList.push(
          getItem(
            'CRM Hub',
            '/crm-hub',
            <Icon name="crmhub" width="24px" height="24px" />,
            crmhubList
          )
        )
      }
      // setting 模块
      if (
        accessList.includes('settingAssiging') ||
        accessList.includes('settingPipeline') ||
        accessList.includes('settingAssets') ||
        accessList.includes('settingReply') ||
        accessName == 'Super Admin' ||
        accessName == 'Admin'
      ) {
        let settingRouter = '/'
        if (accessList.includes('settingAssiging')) {
          settingRouter = '/setting/assigning'
        } else if (accessList.includes('settingPipeline')) {
          settingRouter = '/setting/pipeline'
        } else if (accessList.includes('settingAssets')) {
          settingRouter = '/setting/assets'
        } else if (accessList.includes('settingReply')) {
          settingRouter = '/setting/reply'
        } else {
          // super admin
          settingRouter = '/'
        }
        newList.push(
          getItem(
            'Setting',
            settingRouter,
            <Icon name="setting" width="24px" height="24px" />
          )
        )
      }
      return newList
    })
    setActionItems((list) => {
      const newList = [...list]
      if (
        accessList.includes('history') ||
        accessName == 'Super Admin' ||
        accessName == 'Admin'
      ) {
        newList.push({
          key: 'Activites',
          label: 'Activites',
          icon: <Icon name="clock" width="24px" height="24px" />,
          onClick: () => {
            setToggleUserCenter(false)
            setToggleHistory(!toggleHistory)
          }
        })
      }
      return newList
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 路由改变 需要判断是否展开 menu
  useEffect(() => {
    const key = `/${router.route.split('/')[1]}`
    if (key == '/crm-hub') {
      setDefaultSelectedKeys(
        `/${router.route.split('/')[1]}/${router.route.split('/')[2]}`
      )
      setOpenKeys(`/${router.route.split('/')[1]}`)
    } else {
      setDefaultSelectedKeys(`/${router.route.split('/')[1]}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SideBarWrapper
      className={styles.SideBarWrapper}
      style={{ width: collapsed ? 'unset' : '200px', margin: 'auto' }}
    >
      <div
        className={styles.companyLogo}
        onClick={() => router.push('/')}
        style={{ width: collapsed ? '87px' : '166px' }}
      >
        <Image
          src={
            collapsed
              ? '/images/company-logo-collapsed.png'
              : '/images/company-logo.png'
          }
          alt="logo"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
      <Menu
        openKeys={[`${openKeys}`]}
        selectedKeys={[`${defaultSelectedKeys}`]}
        mode="inline"
        items={menuItems}
        onOpenChange={(key) => {
          setOpenKeys(key[1])
        }}
        onSelect={({ key }) => setDefaultSelectedKeys(key)}
      />
      <div className={styles.userAction}>
        <Menu mode="inline" items={actionItems} />
      </div>
      {user.user?.access?.accesses.includes('history') && (
        <History show={toggleHistory} onClose={() => setToggleHistory(false)} />
      )}

      <UserCenter
        show={toggleUserCenter}
        onClose={() => setToggleUserCenter(false)}
      />
    </SideBarWrapper>
  )
}

export default React.memo(SideBar)

const SideBarWrapper = styled.aside`
  flex: 1 0 auto;
  background-color: #ffffff;
`
