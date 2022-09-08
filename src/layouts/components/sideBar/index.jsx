import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Menu } from 'antd'
import styled from 'styled-components'
import logo from '../../../../public/images/company-logo.png'
import { Icon } from '../../../components/commons'
// 有时候本地加载 menu 样式 加载不成功，故手动导入
import 'antd/lib/menu/style/index.css'
import styles from './index.module.scss'

const SideBar = ({ user }) => {
  const router = useRouter()
  // 默认展示的 menuItem
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState('')
  const [openKeys, setOpenKeys] = useState('')
  // 点击侧边栏 crm hub 事件
  function getItem(label, key, icon, children) {
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
  // 侧边栏 menu
  const menuItems = [
    getItem(
      'Inventory',
      '/inventory',
      <SpanLogo
        disabled={!user}
        active={user && router.pathname === '/inventory'}
      >
        <Icon name="inventory" />
      </SpanLogo>
    ),
    getItem(
      'Warehousing',
      '/warehouse',
      <SpanLogo
        disabled={!user}
        active={user && router.pathname === '/warehouse'}
      >
        <Icon name="warehouse" />
      </SpanLogo>
    ),
    getItem(
      'Products',
      '/products',
      <SpanLogo
        disabled={!user}
        active={user && router.pathname.includes('/products')}
      >
        <Icon name="product" />
      </SpanLogo>
    ),
    getItem(
      'Orders',
      '/orders',
      <SpanLogo disabled={!user} active={user && router.pathname === '/orders'}>
        <Icon name="orders" />
      </SpanLogo>
    ),
    getItem('CRM Hub', '/crm-hub', <Icon name="crmhub" />, [
      getItem('Forms & Emails', '/crm-hub/form-email'),
      getItem('Deals', '/crm-hub/deals'),
      getItem('Chats', '/crm-hub/chats'),
      getItem('Tickets', '/crm-hub/tickets'),
      getItem('Task', '/crm-hub/task'),
      getItem('Dashboard', '/crm-hub/dashboard')
    ]),
    getItem(
      'Setting',
      '/setting',
      <SpanLogo
        disabled={!user}
        active={user && router.pathname === '/setting'}
      >
        <Icon name="setting" />
      </SpanLogo>
    )
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
    <SideBarWrapper className={styles.SideBarWrapper}>
      <CompanyLogo onClick={() => router.push('/')}>
        <Image
          src={logo}
          alt="logo"
          layout="responsive"
          objectFit="contain"
          priority={true}
        />
      </CompanyLogo>
      <Menu
        openKeys={[`${openKeys}`]}
        selectedKeys={[`${defaultSelectedKeys}`]}
        mode="inline"
        items={menuItems}
        onOpenChange={(key) => {
          setOpenKeys(key[1])
        }}
      />
    </SideBarWrapper>
  )
}

export default SideBar

const SideBarWrapper = styled.aside`
  flex: 1 0 auto;
  background-color: #ffffff;
`

const CompanyLogo = styled.div`
  width: 160px;
  cursor: pointer;
`

const SpanLogo = styled.span`
  filter: ${({ active, disabled }) =>
    disabled ? 'none' : active ? 'invert(100%) brightness(0%)' : 'none'};
`
