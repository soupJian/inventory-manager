import { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
// components
import { Flex, Icon, Input, Tab, Tabs, Wrapper } from '../../components/commons'
import OrdersHistory from '../../sections/orders/orders-history'
import CurrentOrder from '../../sections/orders/current-order'

// main
const Orders = ({ router }) => {
  const [activeTab, setActiveTab] = useState('current')
  const handleChangeTab = (key) => {
    setActiveTab(key)
    router.replace(`/orders?tab=${key}`, null, { shallow: true })
  }
  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab)
    }
  }, [router])
  return (
    <Wrapper
      styles={{ 'min-height': '100%', position: 'relative' }}
      height="auto"
      padding="21px 29px"
    >
      <Flex styles={{ 'flex-wrap': 'nowrap' }} justifyContent="space-between">
        <Tabs>
          <Tab
            onClick={() => handleChangeTab('current')}
            active={'current' === activeTab}
            idx={0}
          >
            Current Orders
          </Tab>
          <Tab
            onClick={() => handleChangeTab('history')}
            active={'history' === activeTab}
            idx={1}
          >
            Order History
          </Tab>
        </Tabs>
        <Input
          type="text"
          placeholder="Search order number"
          startIcon={<Icon name="search" width="30px" height="30px" />}
        />
      </Flex>
      {activeTab === 'current' ? <CurrentOrder /> : <OrdersHistory />}
    </Wrapper>
  )
}

export default withRouter(Orders)
