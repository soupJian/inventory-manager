import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Menu } from 'antd'
import styled from 'styled-components'
import logo from '../../../../public/images/company-logo.png'
import Icon from '../icons/Icon'
import styles from './SideBar.module.scss'

function getMenuItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  }
}

const SideBar = ({ user }) => {
  const router = useRouter()
  // 默认展示的 menuItem
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState('')
  // 匹配路由 默认展开 cubHub
  const [isCubHub, setIsCubHub] = useState(false)
  // 点击侧边栏 crm hub 事件
  function getSubItem(label, key, path) {
    return {
      key,
      label,
      onClick: () => {
        router.push(path)
      }
    }
  }
  // 侧边栏 menu
  const menuItems = [
    getMenuItem(
      'CRM Hub',
      '/crm-hub',
      <SpanLogo disabled={!user} active={user && router.pathname === '/crmhub'}>
        <Icon name="crmhub" />
      </SpanLogo>,
      [
        getSubItem(
          'Forms & Emails',
          '/crm-hub/form-email',
          '/crm-hub/form-email'
        ),
        getSubItem('Chats', '/crm-hub/chats', '/crm-hub/chats'),
        getSubItem('Deals', '/crm-hub/deals', '/crm-hub/deals'),
        getSubItem('Tickets', '/crm-hub/tickets', '/crm-hub/tickets'),
        getSubItem('Dashboard', '/crm-hub/dashboard', '/crm-hub/dashboard')
      ]
    )
  ]
  // 路由改变 需要判断是否展开 menu
  useEffect(() => {
    const menuList = [
      '/crm-hub/form-email',
      '/crm-hub/chats',
      '/crm-hub/deals',
      '/crm-hub/tickets',
      '/crm-hub/dashboard'
    ]
    if (menuList.indexOf(router.route) >= 0) {
      setIsCubHub(true)
      setDefaultSelectedKeys(router.route)
    } else {
      setIsCubHub(false)
    }
  }, [router.route])
  return (
    <SideBarWrapper className={styles.SideBarWrapper}>
      <Content className={styles.content}>
        <CompanyLogo onClick={() => router.push('/')}>
          <Image
            src={logo}
            alt="logo"
            layout="responsive"
            objectFit="contain"
            priority={true}
          />
        </CompanyLogo>
        <NavItems>
          <NavItem
            disabled={!user}
            onClick={() => router.push('/inventory')}
            active={user && router.pathname === '/inventory'}
          >
            <SpanLogo
              disabled={!user}
              active={user && router.pathname === '/inventory'}
            >
              <Icon name="inventory" />{' '}
            </SpanLogo>
            <SpanText disabled={!user}>Inventory</SpanText>
          </NavItem>
          <NavItem
            disabled={!user}
            onClick={() => router.push('/warehouse')}
            active={user && router.pathname === '/warehouse'}
          >
            <SpanLogo
              disabled={!user}
              active={user && router.pathname === '/warehouse'}
            >
              <Icon name="warehouse" />{' '}
            </SpanLogo>
            <SpanText disabled={!user}>Warehousing</SpanText>
          </NavItem>
          <NavItem
            disabled={!user}
            onClick={() => router.push('/products')}
            active={user && router.pathname.includes('/products')}
          >
            <SpanLogo
              disabled={!user}
              active={user && router.pathname.includes('/products')}
            >
              <Icon name="product" />{' '}
            </SpanLogo>
            <SpanText disabled={!user}>Products</SpanText>
          </NavItem>
          <NavItem
            disabled={!user}
            onClick={() => router.push('/orders')}
            active={user && router.pathname === '/orders'}
          >
            <SpanLogo
              disabled={!user}
              active={user && router.pathname === '/orders'}
            >
              <Icon name="orders" />{' '}
            </SpanLogo>
            <SpanText disabled={!user}>Orders</SpanText>
          </NavItem>
          {/* 如果当前路由是 cubHub 中的 需要默认展开 menu */}
          {isCubHub ? (
            <Menu
              openKeys={`${defaultSelectedKeys}`}
              defaultSelectedKeys={[`${defaultSelectedKeys}`]}
              selectedKeys={[`${defaultSelectedKeys}`]}
              mode="inline"
              items={menuItems}
            />
          ) : (
            <Menu mode="inline" items={menuItems} />
          )}
        </NavItems>
      </Content>
    </SideBarWrapper>
  )
}

export default SideBar

const SideBarWrapper = styled.aside`
  flex: 1 0 auto;
  max-width: 231px;
  background-color: #ffffff;
`

const Content = styled.div`
  height: 100%;
  padding: 39px 16px;
`

const CompanyLogo = styled.div`
  width: 160px;
  cursor: pointer;
`

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-top: 84px;
`
const SpanText = styled.span`
  margin-left: 15px;
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.secondaryText : 'inherit'};
`
const SpanLogo = styled.span`
  filter: ${({ active, disabled }) =>
    disabled ? 'none' : active ? 'invert(100%) brightness(0%)' : 'none'};
`

const NavItem = styled.li`
  width: 100%;
  padding: 14px 24px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  color: #000;
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: ${({ theme, active }) =>
    active ? theme.font.weight.bold : theme.font.weight.normal};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.menuBackground : 'transparent'};
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:not(:last-of-type) {
    margin-bottom: 32px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.menuBackground};
  }
`
