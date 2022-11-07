import { useState } from 'react'
// components
import { Flex, Icon, Input, Tab, Tabs, Wrapper } from '../../components/commons'
import ShippingHistory from '../../sections/shipping/shipping-history'
import ShippingOrder from '../../sections/shipping/shipping-order'

// main
const Shipping = () => {
  const [activeTab, setActiveTab] = useState('current')
  return (
    <Wrapper
      styles={{ 'min-height': '100%', position: 'relative' }}
      height="auto"
      padding="21px 29px"
    >
      <Flex styles={{ 'flex-wrap': 'nowrap' }} justifyContent="space-between">
        <Tabs>
          <Tab
            onClick={() => setActiveTab('current')}
            active={'current' === activeTab}
            idx={0}
          >
            Shipping Orders
          </Tab>
          <Tab
            onClick={() => setActiveTab('history')}
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
      {activeTab === 'current' ? <ShippingOrder /> : <ShippingHistory />}
    </Wrapper>
  )
}

export default Shipping
