import { withRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  BaseButton,
  Dialog,
  Flex,
  Tab,
  Tabs,
  Text,
  Wrapper
} from '../../components/commons'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import InventoryTable from '../../sections/inventory/inventoryTable'
import InventoryProduct from '../../sections/inventory/inventoryProduct'
import InventoryMap from '../../sections/inventory/inventoryMap'
import AddANewItem from '../../components/add-a-new-Item'
import styles from './index.module.scss'

const Inventory = () => {
  const user = useSelector((state) => state.user)
  const [activeTab, setActiveTab] = useState('inventory')
  const [dialog, setDialog] = useState({
    message: '',
    onConfirm: '',
    show: false
  })
  const [newItemModal, setNewItemModal] = useState(false)
  const [updataTableData, setUpdateTableData] = useState(false)
  const submitNewItemFinally = () => {
    setUpdateTableData((update) => {
      return !update
    })
  }
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
          <Tab
            onClick={() => setActiveTab('map')}
            active={'map' === activeTab}
            idx={1}
          >
            Map
          </Tab>
        </Tabs>
        <Flex styles={{ gap: '9px' }}>
          {activeTab == 'inventory' && (
            <Input
              type="text"
              className={styles.searchInput}
              placeholder="Name, SKU, ID, Barcode"
              prefix={<SearchOutlined />}
            />
          )}
          {activeTab == 'products' && (
            <Input
              type="text"
              className={styles.searchInput}
              placeholder="Name, SKU, ID, Tag"
              prefix={<SearchOutlined />}
            />
          )}
        </Flex>
      </Flex>

      {activeTab === 'inventory' && (
        <InventoryTable
          user={user}
          setDialog={setDialog}
          updataTableData={updataTableData}
          selectable={false}
        />
      )}

      {activeTab === 'products' && (
        <InventoryProduct
          user={user}
          setDialog={setDialog}
          updataTableData={updataTableData}
          selectable={false}
        />
      )}
      {activeTab === 'map' && <InventoryMap user={user} />}
      {dialog.message && dialog.show && (
        <Dialog>
          <Wrapper padding="60px 54px">
            <Text size="20px">{dialog.message}</Text>
            <Flex
              gap="16px"
              styles={{
                width: '100%',
                'max-width': '416px',
                'margin-top': '24px'
              }}
            >
              <BaseButton
                styles={{ flex: '1', 'border-radius': '8px' }}
                minWidth="auto"
                kind="primary"
                onClick={() => dialog.onConfirm()}
              >
                Yes
              </BaseButton>
              <BaseButton
                styles={{
                  flex: '1',
                  'background-color': '#ffffff',
                  'border-radius': '8px'
                }}
                minWidth="auto"
                onClick={() =>
                  setDialog({
                    message: '',
                    onConfirm: '',
                    show: false
                  })
                }
              >
                No
              </BaseButton>
            </Flex>
          </Wrapper>
        </Dialog>
      )}
      {newItemModal && (
        <AddANewItem
          setNewItemModal={setNewItemModal}
          submitNewItemFinally={submitNewItemFinally}
        />
      )}
    </Wrapper>
  )
}

export default withRouter(Inventory)
