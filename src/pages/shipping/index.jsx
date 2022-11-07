import { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
// components
import { Flex, Icon, Input, Tab, Tabs, Wrapper } from '../../components/commons'
import ShippingHistory from '../../sections/shipping/shipping-history'
import ShippingOrder from '../../sections/shipping/shipping-order'

// main
const Shipping = ({ router }) => {
  const [activeTab, setActiveTab] = useState('orders')
  const handleChangeTab = (key) => {
    setActiveTab(key)
    router.replace(`/shipping?tab=${key}`, null, { shallow: true })
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
            onClick={() => handleChangeTab('orders')}
            active={'orders' === activeTab}
            idx={0}
          >
            Shipping Orders
          </Tab>
          <Tab
            onClick={() => handleChangeTab('history')}
            active={'history' === activeTab}
            idx={1}
          >
            Shipping History
          </Tab>
        </Tabs>
        <Input
          type="text"
          placeholder="Search order number"
          startIcon={<Icon name="search" width="30px" height="30px" />}
        />
      </Flex>
      {activeTab === 'orders' ? <ShippingOrder /> : <ShippingHistory />}
    </Wrapper>
  )
}

export default withRouter(Shipping)
