import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import HomeProviders from '../components/providers'
import BasicLayout from '../layouts/BasicLayout'
import NoAccess from '../components/no-access'
// js
import { store } from '../store/store'
import { accessObject } from '../constants/setting'

// css
import '../styles/global.css'
import '../styles/reset-antd.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const user = store.getState().user
  const [hasAccess, setHasAccess] = useState(false)
  useEffect(() => {
    const accessList = user.user?.access?.accesses || []
    const pathname = router.pathname
    let flag = false
    switch (pathname) {
      case '':
      case '/':
      case '/login':
      case '/register':
        flag = true
        break
      case '/inventory':
      case '/inventory/search-inventory':
      case '/inventory/search-product':
        flag = accessList.includes(accessObject.inventory)
        break
      case '/warehouse':
      case '/warehouse/item':
      case '/warehouse/product':
      case '/warehouse/search-product':
      case '/warehouse/search-inventory':
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
      case '/crm-hub/deals':
      case '/crm-hub/deals/detail':
        flag = accessList.includes(accessObject.crmDeals)
        break
      case '/crm-hub/tickets':
      case '/crm-hub/tickets/detail':
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
    <HomeProviders store={store}>
      {/* 注册页面不需要布局 */}
      {router.route == '/register' || router.route == '/login' ? (
        <>
          <Component {...pageProps} />
        </>
      ) : (
        <BasicLayout>
          {hasAccess ? <Component {...pageProps} /> : <NoAccess />}
        </BasicLayout>
      )}
    </HomeProviders>
  )
}

export default MyApp
