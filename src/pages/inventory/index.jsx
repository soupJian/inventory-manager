import { withRouter } from 'next/router'
import { Flex, Tab, Tabs, Wrapper } from '../../components/commons'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import InventoryTable from '../../sections/inventory/inventoryTable'
import { defaultInventoryItemsTableHeaders } from '../../constants/pageConstants/inventory'
import styles from './index.module.less'

const Inventory = ({ router }) => {
  return (
    <Wrapper
      styles={{ 'min-height': '100%' }}
      height="auto"
      padding="21px 29px"
    >
      <Flex styles={{ 'flex-wrap': 'nowrap' }} justifyContent="space-between">
        <Tabs>
          <Tab active={true} idx={0}>
            Items
          </Tab>
          <Tab onClick={() => router.push('/inventory/products')} idx={0}>
            Products
          </Tab>
        </Tabs>
        <Flex styles={{ gap: '9px' }}>
          <Input
            type="text"
            className={styles.searchInput}
            placeholder="Name, SKU, ID, Barcode"
            prefix={<SearchOutlined />}
            onPressEnter={(e) =>
              router.push(
                `/inventory/search-inventory?search=${e.target.value}`
              )
            }
          />
        </Flex>
      </Flex>

      <InventoryTable
        setDialog={() => null}
        selectable={false}
        defaultTableHeaders={defaultInventoryItemsTableHeaders}
      />
    </Wrapper>
  )
}

export default withRouter(Inventory)
