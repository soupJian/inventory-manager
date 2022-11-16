import { withRouter } from 'next/router'
// components
import { Flex, Icon, Input, Tab, Tabs, Wrapper } from '@/components/commons'
import ShippingOrder from '@/sections/shipping/shipping-order'

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
          <Tab active={true} idx={0}>
            Shipping Orders
          </Tab>
          <Tab onClick={() => router.push('/shipping/history')} idx={1}>
            Shipping History
          </Tab>
        </Tabs>
        <Input
          type="text"
          placeholder="Search order number"
          startIcon={<Icon name="search" width="30px" height="30px" />}
        />
      </Flex>
      <ShippingOrder />
    </Wrapper>
  )
}

export default withRouter(Shipping)
