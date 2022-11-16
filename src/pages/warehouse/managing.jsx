import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
// components
import { Flex, Tab, Tabs, Wrapper } from '@/components/commons'
const Managing = dynamic(() => import('@/sections/warehouse/Managing'))

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
          <Tab onClick={() => router.push('/warehouse')} idx={0}>
            Receiving
          </Tab>
          <Tab onClick={() => router.push('/warehouse/settling')} idx={1}>
            Settling
          </Tab>
          <Tab
            onClick={() => router.push('/warehouse/managing')}
            active={true}
            idx={2}
          >
            Managing
          </Tab>
          <Tab onClick={() => router.push('/warehouse/map')} idx={3}>
            Map
          </Tab>
        </Tabs>
      </Flex>
      <Managing />
    </Wrapper>
  )
}

export default withRouter(Warehouse)
