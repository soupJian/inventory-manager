import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
// components
import { Flex, Tab, Tabs, Wrapper } from '@/components/commons'
const Receiving = dynamic(() => import('@/sections/warehouse/Receiving'))
// main
const Warehouse = ({ router }) => {
  return (
    <Wrapper
      styles={{ 'min-height': '100%' }}
      height="auto"
      padding="21px 29px"
    >
      <Flex justifyContent="space-between">
        <Tabs>
          <Tab active={true} idx={0}>
            Receiving
          </Tab>
          <Tab onClick={() => router.push('/warehouse/settling')} idx={1}>
            Settling
          </Tab>
          <Tab onClick={() => router.push('/warehouse/managing')} idx={2}>
            Managing
          </Tab>
          <Tab onClick={() => router.push('/warehouse/map')} idx={3}>
            Map
          </Tab>
        </Tabs>
      </Flex>
      <Receiving />
    </Wrapper>
  )
}

export default withRouter(Warehouse)
