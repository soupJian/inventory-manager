import { withRouter } from 'next/router'
// components
import { Flex, Icon, Input, Tab, Tabs, Wrapper } from '@/components/commons'
import CurrentOrder from '@/sections/orders/current-order'

// main
const Orders = ({ router }) => {
  return (
    <Wrapper
      styles={{ 'min-height': '100%', position: 'relative' }}
      height="auto"
      padding="21px 29px"
    >
      <Flex styles={{ 'flex-wrap': 'nowrap' }} justifyContent="space-between">
        <Tabs>
          <Tab active={true} idx={0}>
            Current Orders
          </Tab>
          <Tab idx={1} onClick={() => router.push('/orders/history')}>
            Order History
          </Tab>
        </Tabs>
        <Input
          type="text"
          placeholder="Search order number"
          startIcon={<Icon name="search" width="30px" height="30px" />}
        />
      </Flex>
      <CurrentOrder />
    </Wrapper>
  )
}

export default withRouter(Orders)
