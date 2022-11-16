import { withRouter } from 'next/router'
// components
import { Flex, Icon, Input, Tab, Tabs, Wrapper } from '@/components/commons'
import ShippingHistory from '@/sections/shipping/shipping-history'

// main
const Shipping = ({ router }) => {
  return (
    <Wrapper
      styles={{ 'min-height': '100%', position: 'relative' }}
      height="auto"
      padding="21px 29px"
    >
      <Flex styles={{ 'flex-wrap': 'nowrap' }} justifyContent="space-between">
        <Tabs>
          <Tab onClick={() => router.push('/shipping')} idx={0}>
            Shipping Orders
          </Tab>
          <Tab active={true} idx={1}>
            Shipping History
          </Tab>
        </Tabs>
        <Input
          type="text"
          placeholder="Search order number"
          startIcon={<Icon name="search" width="30px" height="30px" />}
        />
      </Flex>
      <ShippingHistory />
    </Wrapper>
  )
}

export default withRouter(Shipping)
