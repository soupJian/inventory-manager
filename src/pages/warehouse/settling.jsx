import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
// components
import { Flex, Tab, Tabs, Wrapper } from '../../components/commons'
const Settling = dynamic(() => import('../../sections/warehouse/Settling'))
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
          <Tab active={true} idx={1}>
            Settling
          </Tab>
          <Tab onClick={() => router.push('/warehouse/managing')} idx={2}>
            Managing
          </Tab>
          <Tab onClick={() => router.push('/warehouse/map')} idx={3}>
            Map
          </Tab>
        </Tabs>
        {/* <Input
            type="text"
            placeholder="Search name or SKU"
            startIcon={<Icon name="search" width="30px" height="30px" />}
          /> */}
      </Flex>
      <Settling />
    </Wrapper>
  )
}

export default withRouter(Warehouse)
