import { withRouter } from 'next/router'
import { Flex, Tab, Tabs, Wrapper } from '../../components/commons'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import InventoryProduct from '../../sections/inventory/inventoryProduct'
import { defaultInventoryProductsTableHeaders } from '../../constants/pageConstants/products'
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
          <Tab onClick={() => router.push('/inventory')} idx={0}>
            Items
          </Tab>
          <Tab active={true} idx={0}>
            Products
          </Tab>
        </Tabs>
        <Flex styles={{ gap: '9px' }}>
          <Input
            type="text"
            className={styles.searchInput}
            placeholder="Name, SKU, ID, Tag"
            prefix={<SearchOutlined />}
            onPressEnter={(e) =>
              router.push(`/inventory/search-product?search=${e.target.value}`)
            }
          />
        </Flex>
      </Flex>
      <InventoryProduct
        setDialog={() => null}
        selectable={false}
        defaultTableHeaders={defaultInventoryProductsTableHeaders}
      />
    </Wrapper>
  )
}

export default withRouter(Inventory)
