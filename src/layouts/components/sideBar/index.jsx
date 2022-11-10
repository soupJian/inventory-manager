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
// js
import { accessObject } from '../../../constants/setting'
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
  const [actionItems, setActionItems] = useState([])
  const handleToggleHistory = () => {
    setToggleUserCenter(false)
    setToggleHistory((flag) => {
      return !flag
    })
  }
  // 动态左侧菜单栏 sidebar路由
  useEffect(() => {
    if (!user.isLoggedIn) {
      return
    }
    const accessList = user.user.access.accesses
    setMenuItems(() => {
      const newList = []
      // inventory 模块
      if (accessList.includes(accessObject.inventory)) {
        newList.push(
          getItem(
            'Inventory',
            '/inventory',
            <Icon name="inventory" width="24px" height="24px" />
          )
        )
      }
      // warehouse 模块
      if (accessList.includes(accessObject.warehouse)) {
        newList.push(
          getItem(
            'Warehouse',
            '/warehouse',
            <Icon name="warehouse" width="24px" height="24px" />
          )
        )
      }
      // shipping 模块
      if (accessList.includes(accessObject.shipping)) {
        newList.push(
          getItem(
            'Shipping',
            '/shipping',
            <Icon name="orders" width="24px" height="24px" />
          )
        )
      }
      // orders 模块
      if (accessList.includes(accessObject.orders)) {
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
        accessList.includes(accessObject.crmFormEmail) ||
        accessList.includes(accessObject.crmChats) ||
        accessList.includes(accessObject.crmDeals) ||
        accessList.includes(accessObject.crmTickets) ||
        accessList.includes(accessObject.crmTasks) ||
        accessList.includes(accessObject.crmDashboard)
      ) {
        const crmhubList = []
        if (accessList.includes(accessObject.crmFormEmail)) {
          crmhubList.push(getItem('Forms & Emails', '/crm-hub/form-email'))
        }
        if (accessList.includes(accessObject.crmDeals)) {
          crmhubList.push(getItem('Deals', '/crm-hub/deals'))
        }
        if (accessList.includes(accessObject.crmChats)) {
          crmhubList.push(getItem('Chats', '/crm-hub/chats'))
        }
        if (accessList.includes(accessObject.crmTickets)) {
          crmhubList.push(getItem('Tickets', '/crm-hub/tickets'))
        }
        if (accessList.includes(accessObject.crmTasks)) {
          crmhubList.push(getItem('Task', '/crm-hub/task'))
        }
        if (accessList.includes(accessObject.crmDashboard)) {
          crmhubList.push(getItem('Dashboard', '/crm-hub/dashboard'))
        }
        if (crmhubList.length > 0) {
          newList.push(
            getItem(
              'CRM Hub',
              '/crm-hub',
              <Icon name="crmhub" width="24px" height="24px" />,
              crmhubList
            )
          )
        }
      }
      // setting 模块
      if (
        accessList.includes(accessObject.settingAssiging) ||
        accessList.includes(accessObject.settingPipeline) ||
        accessList.includes(accessObject.settingAssets) ||
        accessList.includes(accessObject.settingReply) ||
        accessList.includes(accessObject.settingUsers)
      ) {
        let settingRouter = '/'
        if (accessList.includes(accessObject.settingAssiging)) {
          settingRouter = '/setting/assigning'
        } else if (accessList.includes(accessObject.settingPipeline)) {
          settingRouter = '/setting/pipeline'
        } else if (accessList.includes(accessObject.settingAssets)) {
          settingRouter = '/setting/assets'
        } else if (accessList.includes(accessObject.settingReply)) {
          settingRouter = '/setting/reply'
        } else if (accessList.includes(accessObject.settingReply)) {
          settingRouter = '/setting/users'
        } else {
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
    setActionItems(() => {
      const newList = [
        {
          key: 'user center',
          icon: <Icon name="user" width="24px" height="24px" />,
          label: 'User Center',
          onClick: () => {
            setToggleHistory(false)
            setToggleUserCenter((flag) => {
              return !flag
            })
          }
        }
      ]
      if (accessList.includes(accessObject.history)) {
        newList.push({
          key: 'Activites',
          label: 'Activites',
          icon: <Icon name="clock" width="24px" height="24px" />,
          onClick: () => handleToggleHistory()
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
      {user.user.access?.accesses.includes(accessObject.history) && (
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
