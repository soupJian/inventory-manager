import React, { useEffect, useState } from 'react'
// next
import Image from 'next/image'
// hooks
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
// antd
import { Menu, Popover } from 'antd'
// components
import { Icon } from '../../../components/commons'
import History from '../header/history'
// redux
import { logoutUser } from '../../../store/slices/userSlice'
// css ----------
import 'antd/lib/menu/style/index.css'
import styled from 'styled-components'
import styles from './index.module.scss'

const SideBar = ({ collapsed, user }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  // 默认展示的 menuItem
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState('')
  const [openKeys, setOpenKeys] = useState('')
  const [toggleHistory, setToggleHistory] = useState(false)
  const Logout = () => {
    dispatch(logoutUser())
  }
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
      'Orders',
      '/orders',
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
      icon: (
        <Popover
          placement="rightTop"
          content={
            <PopoverConent>
              <Label>Account Info</Label>
              <DisplayName>{user.info.displayName}</DisplayName>
              <UserName>Username: {user.info.email}</UserName>
              <SignoutBtn onClick={Logout}>Sign out</SignoutBtn>
            </PopoverConent>
          }
        >
          <Icon name="user" width="24px" height="24px" />
        </Popover>
      ),
      label: (
        <Popover
          placement="rightTop"
          content={
            <PopoverConent>
              <Label>Account Info</Label>
              <DisplayName>{user.info.displayName}</DisplayName>
              <UserName>Username: {user.info.email}</UserName>
              <SignoutBtn onClick={Logout}>Sign out</SignoutBtn>
            </PopoverConent>
          }
        >
          User Center
        </Popover>
      )
    },
    {
      key: 'Activites',
      label: 'Activites',
      icon: <Icon name="clock" width="24px" height="24px" />,
      onClick: () => {
        setToggleHistory(!toggleHistory)
      }
    }
  ]
  // 路由改变 需要判断是否展开 menu
  useEffect(() => {
    setDefaultSelectedKeys(router.route)
    setOpenKeys(router.route)
    const list = [
      '/crm-hub/form-email',
      '/crm-hub/deals',
      '/crm-hub/chats',
      '/crm-hub/tickets',
      '/crm-hub/task',
      '/crm-hub/dashboard'
    ]
    if (list.indexOf(router.route) >= 0) {
      setOpenKeys('/crm-hub')
    }
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
      />
      <div className={styles.userAction}>
        <Menu mode="inline" items={actionItems} />
      </div>
      <History
        user={user}
        show={toggleHistory}
        onClose={() => setToggleHistory(false)}
      />
    </SideBarWrapper>
  )
}

export default React.memo(SideBar)

const SideBarWrapper = styled.aside`
  flex: 1 0 auto;
  background-color: #ffffff;
`
const PopoverConent = styled.div`
  padding: 20px 16px;
  background-color: #ffffff;
  line-height: 20px;
  z-index: 999;
`

const Label = styled.div`
  font-size: ${({ theme }) => theme.font.size.xsss};
  color: ${({ theme }) => theme.colors.secondaryText};
`
const DisplayName = styled.div`
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primaryText};
  margin-top: 16px;
  white-space: nowrap;
`
const UserName = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  font-family: ${({ theme }) => theme.font.family.secondary};
  color: #000000;
  margin-top: 6px;
  white-space: nowrap;
`
const SignoutBtn = styled.button`
  margin-top: 16px;
  min-width: auto;
  color: ${({ theme }) => theme.colors.accentText};
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: 400;
  background-color: transparent;
  border: none;
  cursor: pointer;
`
