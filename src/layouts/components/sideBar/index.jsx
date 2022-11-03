import React, { useEffect, useState } from 'react'
// next
import Image from 'next/image'
// hooks
import { useRouter } from 'next/router'
// antd
import { Menu } from 'antd'
// components
import { Icon } from '../../../components/commons'
import History from '../history'
import UserCenter from '../user-center'
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
  const getItem = (label, key, icon, children) => {
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
  }
  // 侧边栏 menu 路由等...
  const menuItems = [
    getItem(
      'Inventory',
      '/inventory',
      <Icon name="inventory" width="24px" height="24px" />
    ),
    getItem(
      'Warehouse',
      '/warehouse',
      <Icon name="warehouse" width="24px" height="24px" />
    ),
    getItem(
      'Shipping',
      '/shipping',
      <Icon name="orders" width="24px" height="24px" />
    ),
    getItem(
      'CRM Hub',
      '/crm-hub',
      <Icon name="crmhub" width="24px" height="24px" />,
      [
        getItem('Forms & Emails', '/crm-hub/form-email'),
        getItem('Deals', '/crm-hub/deals'),
        getItem('Chats', '/crm-hub/chats'),
        getItem('Tickets', '/crm-hub/tickets'),
        getItem('Task', '/crm-hub/task'),
        getItem('Dashboard', '/crm-hub/dashboard')
      ]
    ),
    getItem(
      'Setting',
      '/setting',
      <Icon name="setting" width="24px" height="24px" />
    )
  ]
  const actionItems = [
    {
      key: 'user cebter',
      icon: <Icon name="user" width="24px" height="24px" />,
      label: 'User Center',
      onClick: () => {
        setToggleHistory(false)
        setToggleUserCenter(!toggleUserCenter)
      }
    },
    {
      key: 'Activites',
      label: 'Activites',
      icon: <Icon name="clock" width="24px" height="24px" />,
      onClick: () => {
        setToggleUserCenter(false)
        setToggleHistory(!toggleHistory)
      }
    }
  ]
  // 路由改变 需要判断是否展开 menu
  useEffect(() => {
    const key = `/${router.route.split('/')[1]}`
    if (key == '/crm-hub') {
      setDefaultSelectedKeys(
        `/${router.route.split('/')[1]}/${router.route.split('/')[2]}`
      )
    } else {
      setDefaultSelectedKeys(`/${router.route.split('/')[1]}`)
    }
    setOpenKeys(`/${router.route.split('/')[1]}`)
  }, [router.route])
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
      <History
        user={user}
        show={toggleHistory}
        onClose={() => setToggleHistory(false)}
      />
      <UserCenter
        user={user}
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
