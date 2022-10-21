import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Button,
  Icon,
  BaseButton,
  Dialog,
  Flex,
  Text,
  Wrapper
} from '../../components/commons'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import InventoryTable from '../inventory/inventoryTable'
import InventoryProduct from '../inventory/inventoryProduct'
import AddANewItem from '../../components/add-a-new-Item'
import AddProduct from '../../components/add-a-new-product'

import styles from './index.module.scss'

const Managing = ({ router }) => {
  const user = useSelector((state) => state.user)
  const [activeTab, setActiveTab] = useState('Items')
  const [dialog, setDialog] = useState({
    message: '',
    onConfirm: '',
    show: false
  })
  const [newItemModal, setNewItemModal] = useState(false)
  const [newProductModal, setNewProductModal] = useState(false)
  const [updataTableData, setUpdateTableData] = useState(false)
  const submitNewFinally = () => {
    setUpdateTableData((update) => {
      return !update
    })
  }
  return (
    <Wrapper styles={{ 'min-height': '100%' }} height="auto" padding=" 0 ">
      <Flex
        styles={{ gap: '22px', position: 'absolute', right: '0', top: '-80px' }}
      >
        <Button
          onClick={() => {
            if (activeTab == 'Items') {
              setNewItemModal(true)
            } else {
              setNewProductModal(true)
            }
          }}
          minWidth="auto"
          kind="primary"
          startIcon={
            <Icon
              name="add"
              width="18px"
              height="19px"
              styles={{ 'margin-right': '12px' }}
            />
          }
          style={{ height: '45px' }}
        >
          New
        </Button>
        {activeTab == 'Items' && (
          <Input
            type="text"
            className={styles.searchInput}
            placeholder="Name, SKU, ID, Barcode"
            prefix={<SearchOutlined />}
            onPressEnter={(e) =>
              router.push(
                `/warehouse/search-inventory?search=${e.target.value}`
              )
            }
          />
        )}
        {activeTab == 'Products' && (
          <Input
            type="text"
            className={styles.searchInput}
            placeholder="Name, SKU, ID, Tag"
            prefix={<SearchOutlined />}
            onPressEnter={(e) =>
              router.push(`/warehouse/search-product?search=${e.target.value}`)
            }
          />
        )}
      </Flex>
      <Flex
        styles={{
          'flex-wrap': 'nowrap',
          position: 'absolute',
          height: '45px',
          zIndex: 1,
          gap: '24px',
          fontSize: '20px',
          lineHeight: '20px',
          fontWeight: '500'
        }}
        justifyContent="space-between"
      >
        <div
          onClick={() => setActiveTab('Items')}
          style={{
            color: activeTab == 'Items' ? '#000000' : '#999999',
            cursor: 'pointer'
          }}
        >
          Items
        </div>
        <div
          onClick={() => setActiveTab('Products')}
          style={{
            color: activeTab == 'Products' ? '#000000' : '#999999',
            cursor: 'pointer'
          }}
        >
          Products
        </div>
      </Flex>

      {activeTab === 'Items' && (
        <InventoryTable
          user={user}
          setDialog={setDialog}
          updataTableData={updataTableData}
          selectable={true}
          noShowExpand={true}
          rowClick={(SKU) => {
            router.push(`/warehouse/item?sku=${SKU}`)
          }}
        />
      )}
      {activeTab === 'Products' && (
        <InventoryProduct
          user={user}
          setDialog={setDialog}
          updataTableData={updataTableData}
          selectable={true}
          noShowExpand={true}
          rowClick={(SKU) => {
            router.push(`/warehouse/product?sku=${SKU}`)
          }}
        />
      )}
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
          submitNewItemFinally={submitNewFinally}
        />
      )}
      {newProductModal && (
        <AddProduct
          setNewProductModal={setNewProductModal}
          submitnewProductFinally={submitNewFinally}
        />
      )}
    </Wrapper>
  )
}

export default Managing
