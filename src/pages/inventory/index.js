import { withRouter } from 'next/router'
import { useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  Button,
  Flex,
  Icon,
  // Input,
  Loader,
  Tab,
  Tabs,
  Text,
  Wrapper,
  Popover
} from '../../components/commons'
import WarehouseUnit from '../../sections/inventory/WarehouseUnit'
import { itemTemplate } from '../../constants/pageConstants/inventory'
import {
  Api,
  ISOStringToReadableDate,
  objectsToQueryString
} from '../../utils/utils'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import InventoryTable from '../../sections/inventory/inventoryTable'
import InventoryMap from '../../sections/inventory/inventoryMap'
import styles from './index.module.scss'
const api = new Api()

const inventoryReducer = (state, { type, payload }) => {
  switch (type) {
    case 'changeTab':
      return { ...state, activeTab: payload, page: 1 }
    case 'changeStatus':
      return { ...state, status: payload }
    case 'changePageType':
      return { ...state, pageType: payload, page: 1 }
    case 'changePaginateNumber':
      return { ...state, page: payload }
    default:
      return state
  }
}

const Inventory = ({ router }) => {
  const user = useSelector((state) => state.user)
  const [loadingWarehouse, setLoadingWarehouse] = useState(false)
  const [inventoryState, dispatch] = useReducer(inventoryReducer, {
    page: parseInt(router.query.page) || 1,
    status: [],
    pageType: router.query.pageType ? router.query.pageType : 'inventory'
  })
  const [loadingTable, setLoadingTable] = useState(false)
  const [status, setStatus] = useState([])
  const [inventorySKUs, setInventorySKUs] = useState([])
  const [inventoryData, setInventoryData] = useState(null)
  const [selection, setSelection] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [newItem, setNewItem] = useState({ ...itemTemplate })
  const [newItemModal, setNewItemModal] = useState(false)
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [newItemError, setNewItemError] = useState('')

  const [dialog, setDialog] = useState({
    message: '',
    onConfirm: '',
    show: false
  })

  const handlePage = (page) => {
    router.replace(
      `/inventory?${objectsToQueryString({ ...router.query, page })}`,
      null,
      { shallow: true }
    )
    dispatch({ type: 'changePaginateNumber', payload: page })
  }

  const confirmAction = (cb, message) => {
    setDialog({
      message,
      show: true,
      onConfirm: () => {
        cb()
        return setDialog({ message: '', onConfirm: '', show: false })
      }
    })
  }

  const addSelection = (sku) => {
    const idx = selection.indexOf(sku)
    const newSelection = [...selection]

    if (idx < 0) {
      return setSelection([...selection, sku])
    } else {
      newSelection.splice(idx, 1)
      return setSelection(newSelection)
    }
  }

  const selectAll = () => {
    const skus = inventoryData?.Items?.map((item) => item.SKU)
    if (selection.length === inventoryData?.Items.length) setSelection([])
    else setSelection(skus)
  }

  const clearSelectedItems = () => {
    setLoadingTable(true)
    const itemsToBeCleared = inventoryData.Items.filter((item) =>
      selection.includes(item.SKU)
    )
    Promise.all(
      itemsToBeCleared.map((item) => {
        return api.updateInventory(
          { ...item, Stock: 0, Reserved: 0, Available: 0 },
          { Authorization: `Bearer ${user.accessToken}` }
        )
      })
    )
      .then((values) => {
        setLoadingTable(false)
        setSelection([])
        fetchSKUs()
      })
      .catch((err) => {
        setLoadingTable(false)
      })
  }
  const deleteSelectedItems = () => {
    setLoadingTable(true)
    Promise.all(
      selection.map((item) => {
        return api.deleteInventory(item, {
          Authorization: `Bearer ${user.accessToken}`
        })
      })
    )
      .then((values) => {
        setLoadingTable(false)
        setSelection([])
        fetchSKUs()
      })
      .catch((err) => {
        console.log(err)
        setLoadingTable(false)
      })
  }

  const handleStatus = (val) => {
    console.log(val)
    dispatch({ type: 'changeStatus', payload: val })
  }
  const newItemHandler = (e, nestedKey) => {
    console.log(e.target.name, e.target.type)
    if (nestedKey) {
      return setNewItem({
        ...newItem,
        Cost: { ...newItem.Cost, [e.target.name]: parseInt(e.target.value) }
      })
    } else if (e.target.name === 'Tags') {
      let newTags = [...newItem.Tags]
      if (e.target.value[e.target.value.length - 1] == ',') {
        newTags.push(e.target.value.slice(0, -1))
        setNewItem({ ...newItem, TagsInput: '', Tags: newTags })
      } else {
        setNewItem({ ...newItem, TagsInput: e.target.value })
      }
    } else {
      if (e.target.type === 'number') {
        return setNewItem({
          ...newItem,
          [e.target.name]: parseInt(e.target.value)
        })
      } else {
        return setNewItem({ ...newItem, [e.target.name]: e.target.value })
      }
    }
  }
  const removeTag = (tag) => {
    const idx = newItem.Tags.indexOf(tag)
    if (idx >= 0) {
      let newTags = [...newItem.Tags]
      newTags.splice(idx, 1)
      setNewItem({ ...newItem, TagsInput: newTags.join(','), Tags: newTags })
    }
  }

  const handleNewLocationList = (name, val) => {
    console.log({ name })
    const idx = newItem.Location.findIndex((loc) => loc === val)
    let newLocationList = [...newItem.Location]
    if (idx >= 0) {
      newLocationList.splice(idx, 1)
      setNewItem({ ...newItem, [name]: newLocationList })
    } else {
      setNewItem({ ...newItem, [name]: [...newLocationList, val] })
    }
  }

  const submitNewItem = (e) => {
    setNewItemLoading(true)
    setNewItemError('')
    e.preventDefault()
    if (!newItem.Name || !newItem.Barcode) {
      setNewItemLoading(false)
      setNewItemError('Required')
    } else {
      const TotalCost = Object.values(newItem.Cost).reduce(
        (total, cost) => total + parseInt(cost),
        0
      )
      const settledInfo = {
        Settled: !!newItem.Location.length,
        SettledTime: newItem.Location.length ? new Date() : ''
      }
      let data = {
        ...newItem,
        ...settledInfo,
        Updated: new Date(),
        Recieved: new Date(),
        Created: new Date(),
        TotalCost
      }
      delete data['TagsInput']
      api
        .updateInventory(data, { Authorization: `Bearer ${user.accessToken}` })
        .then((data) => {
          fetchSKUs()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setNewItemLoading(false)
          setNewItemModal(false)
          setNewItemError('')
          setNewItem({ ...itemTemplate })
        })
    }
  }

  const fetchSKUs = () => {
    setLoadingTable(true)
    api
      .getAllInventory(
        `projectionExpression=SKU${
          inventoryState.status.length
            ? `&status=${inventoryState.status.join(',')}`
            : ''
        }`,
        { Authorization: `Bearer ${user.accessToken}` }
      )
      .then((data) => {
        setInventorySKUs(data.Items)
        setLoadingTable(false)
      })
      .catch((err) => {
        console.log(err)
        setLoadingTable(false)
      })
  }
  const fetchItems = () => {
    setLoadingWarehouse(true)
    api
      .getAllInventory(`projectionExpression=SKU,Location,Name,SettledTime`, {
        Authorization: `Bearer ${user.accessToken}`
      })
      .then((data) => {
        let dataObj = {}
        data.Items.forEach((item) => {
          item.Location.forEach((loc) => {
            if (!(loc in dataObj)) {
              dataObj[loc] = [item]
            } else {
              dataObj[loc] = [...dataObj[loc], item]
            }
            return
          })
        })
        console.log(dataObj)
        setWarehouseData(dataObj)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoadingWarehouse(false)
      })
  }
  useEffect(() => {
    if (inventoryState.pageType === 'inventory') {
      router.replace(`/inventory?pageType=inventory`, null, { shallow: true })
      fetchSKUs()
    } else {
      router.replace('/inventory?pageType=warehouse', null, { shallow: true })
      fetchItems()
    }
  }, [inventoryState.pageType])

  useEffect(() => {
    const skusToShow = inventorySKUs?.slice(
      inventoryState.page * itemsPerPage - itemsPerPage,
      inventoryState.page * itemsPerPage
    )
    if (skusToShow?.length) {
      setLoadingTable(true)
      let str = ''
      skusToShow.forEach((i) => {
        Object.values(i).map((val) => {
          str += val + ','
        })
      })
      api
        .getMultipleInventory(`skus=${str}`, {
          Authorization: `Bearer ${user.accessToken}`
        })
        .then((data) => {
          setInventoryData(data)
          setLoadingTable(false)
        })
        .catch((err) => {
          console.log(err)
          setLoadingTable(false)
        })
    } else {
      setInventoryData({})
    }
  }, [inventoryState.page, inventorySKUs])

  return (
    <Wrapper
      styles={{ 'min-height': '100%' }}
      height="auto"
      padding="21px 29px"
    >
      <Flex styles={{ 'flex-wrap': 'nowrap' }} justifyContent="space-between">
        <Tabs>
          <Tab
            onClick={() =>
              dispatch({ type: 'changePageType', payload: 'inventory' })
            }
            active={'inventory' === inventoryState.pageType}
            idx={0}
          >
            Items
          </Tab>
          <Tab
            onClick={() => dispatch({ type: 'changePageType', payload: 'map' })}
            active={'map' === inventoryState.pageType}
            idx={1}
          >
            Map
          </Tab>
        </Tabs>
        {inventoryState.pageType === 'inventory' && (
          <Flex styles={{ gap: '9px' }}>
            {/* <Button
              onClick={() => setNewItemModal(true)}
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
            >
              New
            </Button> */}
            <Input
              type="text"
              className={styles.searchInput}
              placeholder="Search name or SKU"
              prefix={<SearchOutlined />}
            />
          </Flex>
        )}
      </Flex>
      {loadingWarehouse && (
        <LoadingWrapper>
          <Loader size={100} />
          <Text>Loading warehouse data...</Text>
        </LoadingWrapper>
      )}
      {inventoryState.pageType === 'inventory' ? (
        <InventoryTable
          loadingTable={loadingTable}
          inventorySKUs={inventorySKUs}
          inventoryState={inventoryState}
          handleStatus={handleStatus}
          inventoryData={inventoryData}
          itemsPerPage={itemsPerPage}
          handlePage={handlePage}
          dialog={dialog}
          selection={selection}
          newItemModal={newItemModal}
          newItemLoading={newItemLoading}
          submitNewItem={submitNewItem}
          newItemErro={newItemError}
          newItem={newItem}
          handleNewLocationList={handleNewLocationList}
          newItemHandler={newItemHandler}
          setNewItemModal={setNewItemModal}
          removeTag={removeTag}
        />
      ) : (
        <InventoryMap user={user} />
      )}
    </Wrapper>
  )
}

export default withRouter(Inventory)

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 5;
`
