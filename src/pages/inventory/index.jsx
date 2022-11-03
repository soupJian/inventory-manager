import { withRouter } from 'next/router'
import { useState } from 'react'
import { Flex, Tab, Tabs, Wrapper } from '../../components/commons'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import InventoryTable from '../../sections/inventory/inventoryTable'
import InventoryProduct from '../../sections/inventory/inventoryProduct'
import { defaultInventoryItemsTableHeaders } from '../../constants/pageConstants/inventory'
import { defaultInventoryProductsTableHeaders } from '../../constants/pageConstants/products'
import styles from './index.module.less'

const Inventory = ({ router }) => {
  const [activeTab, setActiveTab] = useState('inventory')
  return (
    <Wrapper
      styles={{ 'min-height': '100%' }}
      height="auto"
      padding="21px 29px"
    >
      <Flex styles={{ 'flex-wrap': 'nowrap' }} justifyContent="space-between">
        <Tabs>
          <Tab
            onClick={() => setActiveTab('inventory')}
            active={'inventory' === activeTab}
            idx={0}
          >
            Items
          </Tab>
          <Tab
            onClick={() => setActiveTab('products')}
            active={'products' === activeTab}
            idx={0}
          >
            Products
          </Tab>
        </Tabs>
        <Flex styles={{ gap: '9px' }}>
          {activeTab == 'inventory' && (
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
          )}
          {activeTab == 'products' && (
            <Input
              type="text"
              className={styles.searchInput}
              placeholder="Name, SKU, ID, Tag"
              prefix={<SearchOutlined />}
              onPressEnter={(e) =>
                router.push(
                  `/inventory/search-product?search=${e.target.value}`
                )
              }
            />
          )}
        </Flex>
      </Flex>

      {activeTab === 'inventory' && (
        <InventoryTable
          setDialog={() => null}
          updataTableData={() => null}
          selectable={false}
          defaultTableHeaders={defaultInventoryItemsTableHeaders}
        />
      )}

      {activeTab === 'products' && (
        <InventoryProduct
          setDialog={() => null}
          updataTableData={() => null}
          selectable={false}
          defaultTableHeaders={defaultInventoryProductsTableHeaders}
        />
      )}
    </Wrapper>
  )
}

export default withRouter(Inventory)
