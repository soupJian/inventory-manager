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

const SideBar = ({ collapsed }) => {
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
      <Icon name="inventory" width="24px" height="24px" />
    ),
    getItem(
      'Warehousing',
      '/warehouse',
      <Icon name="warehouse" width="24px" height="24px" />
    ),
    getItem(
      'Products',
      '/products',
      <Icon name="product" width="24px" height="24px" />
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
          objectFit="contain"
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
    </SideBarWrapper>
  )
}

export default SideBar

const SideBarWrapper = styled.aside`
  flex: 1 0 auto;
  background-color: #ffffff;
`
