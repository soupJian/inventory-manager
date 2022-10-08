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
  // map
  const [warehouseData, setWarehouseData] = useState({})
  const [loadingWarehouse, setLoadingWarehouse] = useState(false)
  const [locatedItem, setLocatedItem] = useState({})
  const [locatedItemInput, setLocatedItemInput] = useState('')
  const [locatedItemError, setLocatedItemError] = useState('')
  const [locateItemLoading, setLocateItemLoading] = useState(false)
  const [showLocationPopover, setShowLocationPopover] = useState(false)
  const [activeLocationKey, setActiveLocationKey] = useState([])

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

  const locateItem = () => {
    setLocateItemLoading(true)
    api
      .getInventory(`barcode=${locatedItemInput}`, {
        Authorization: `Bearer ${user.accessToken}`
      })
      .then((data) => {
        if (data.Items && data.Items?.length === 0) {
          setLocatedItemError("Sorry, We can't find the item!")
        } else if (!data.Items && data.message) {
          setLocatedItemError(data.message)
        }
        setLocateItemLoading(false)
        setLocatedItem(data)
        console.log(data)
      })
      .catch((err) => {
        setLocateItemLoading(false)
      })
  }
  const cancelLocatedItem = () => {
    setLocatedItem({})
    setLocatedItemInput('')
  }

  const handleGridItem = (val) => {
    console.log(warehouseData[val])
    setActiveLocationKey(val)
    setShowLocationPopover(true)
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
  const handleLocateItem = (e) => {
    if (locatedItemInput) {
      locateItem()
    }
    e.preventDefault()
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
        <Wrapper padding="35px 0">
          <Flex
            styles={{ width: 'fit-content' }}
            alignItems="flex-end"
            justifyContent="flex-start"
          >
            <Flex
              as="form"
              onSubmit={handleLocateItem}
              alignItems="flex-end"
              gap="8px"
            >
              <InputGroup>
                <Label htmlFor="warehouse-barcode">Locate item</Label>
                <Input
                  // inputStyles={{ height: '100%' }}
                  startIcon={<Icon name="search" width="30px" height="30px" />}
                  wrapperStyles={{ 'margin-top': '16px', 'min-height': '59px' }}
                  placeholder="Type barcode"
                  value={locatedItemInput}
                  onChange={(e) => setLocatedItemInput(e.target.value)}
                  name="Barcode"
                  type="text"
                  id="warehouse-barcode"
                />
              </InputGroup>
              <Flex
                direction="column"
                justifyContent="flex-end"
                gap="9px"
                alignItems="flex-start"
              >
                {locatedItemError && (
                  <Text
                    styles={{ 'white-space': 'nowrap' }}
                    color="#CB0000"
                    size="15px"
                  >{`"Invalid Barcode"`}</Text>
                )}
                {locateItemLoading && <Loader size={30} />}
                {!locatedItemError &&
                  locatedItem?.Items?.length &&
                  !locateItemLoading && (
                    <>
                      <Text
                        styles={{ 'white-space': 'nowrap' }}
                        color="#000000"
                        size="15px"
                      >
                        {locatedItem?.Items[0]?.Name}
                      </Text>
                      <Text
                        styles={{ 'white-space': 'nowrap' }}
                        weight="500"
                        color="#2EBEBD"
                        size="15px"
                      >
                        {locatedItem?.Items[0]?.Location.join(';')}
                      </Text>
                    </>
                  )}
              </Flex>
              {!locatedItemError &&
                locatedItem?.Items?.length &&
                !locateItemLoading && (
                  <Button
                    onClick={cancelLocatedItem}
                    styles={{ padding: '8px 16px', 'align-self': 'fles-start' }}
                    minWidth="auto"
                    kind="primary"
                  >
                    Cancel
                  </Button>
                )}
            </Flex>
          </Flex>
          <Wrapper
            styles={{
              display: 'flex',
              'flex-direction': 'column',
              'align-items': 'flex-start'
            }}
            padding="41px 0 35px"
          >
            <Flex
              styles={{ 'margin-bottom': '50px', 'max-width': '1100px' }}
              alignItems="flex-start"
              gap="58px"
            >
              <WarehouseUnit
                unit="A"
                label="Against the left wall"
                yLabel={['R1', 'R2', 'R3'].reverse()}
                xLabel={['A1', 'A2', 'A3', 'A4']}
              >
                {['R1', 'R2', 'R3'].reverse().map((row) => (
                  <GridRow key={row + 'A'}>
                    {['A1', 'A2', 'A3', 'A4'].map((col) => (
                      <Popover
                        isOpen={
                          showLocationPopover &&
                          activeLocationKey === [col, row].join('-')
                        }
                        key={[col, row].join('-')}
                        onClose={() => setShowLocationPopover(false)}
                        contentStyles={{
                          'background-color': '#ffffff',
                          padding: '24px',
                          transform: 'translate(50%, 100%)'
                        }}
                        content={
                          <Wrapper
                            padding="0"
                            styles={{ 'min-width': '340px' }}
                          >
                            <Text
                              family="Rubik"
                              weight="500"
                              size="16px"
                              color="#000000"
                            >
                              {[col, row].join('-')}
                            </Text>
                            {warehouseData[[col, row].join('-')]?.length && (
                              <Wrapper padding="20px 0 0">
                                {warehouseData[[col, row].join('-')]?.map(
                                  (item) => (
                                    <Text
                                      key={item.SKU}
                                      styles={{ 'margin-top': '10px' }}
                                      as="div"
                                      family="Rubik"
                                      weight="400"
                                      size="15px"
                                      color="#000000"
                                    >
                                      {item.Name}
                                    </Text>
                                  )
                                )}
                              </Wrapper>
                            )}
                            {warehouseData[[col, row].join('-')]?.length && (
                              <Wrapper padding="16px 0 0">
                                <Text
                                  color="#999999"
                                  as="p"
                                  size="15px"
                                  weight="500"
                                >
                                  Last Settled
                                </Text>
                                <Flex
                                  direction="column"
                                  alignItems="flex-start"
                                  gap="10px"
                                  styles={{ 'margin-top': '10px' }}
                                >
                                  {
                                    <>
                                      <Text
                                        color="#999999"
                                        as="p"
                                        size="15px"
                                        weight="400"
                                      >
                                        {ISOStringToReadableDate(
                                          [
                                            ...warehouseData[
                                              [col, row].join('-')
                                            ]?.sort(
                                              (a, b) =>
                                                -a.SettledTime.localeCompare(
                                                  b.SettledTime
                                                )
                                            )
                                          ][0].SettledTime
                                        )}
                                      </Text>
                                      <Text
                                        color="#000000"
                                        as="p"
                                        size="15px"
                                        weight="400"
                                      >
                                        {
                                          [
                                            ...warehouseData[
                                              [col, row].join('-')
                                            ]?.sort(
                                              (a, b) =>
                                                -a.SettledTime.localeCompare(
                                                  b.SettledTime
                                                )
                                            )
                                          ][0].Name
                                        }
                                      </Text>
                                    </>
                                  }
                                </Flex>
                              </Wrapper>
                            )}
                          </Wrapper>
                        }
                      >
                        <GridItem
                          onMouseLeave={() => setShowLocationPopover(false)}
                          active={
                            (showLocationPopover &&
                              activeLocationKey === [col, row].join('-')) ||
                            (locatedItem?.Items?.length &&
                              locatedItem?.Items[0]?.Location.filter(
                                (val) => val === [col, row].join('-')
                              ).length)
                          }
                          onClick={(e) =>
                            handleGridItem([row, col].reverse().join('-'))
                          }
                          data-location={[row, col].join('-')}
                        ></GridItem>
                      </Popover>
                    ))}
                  </GridRow>
                ))}
              </WarehouseUnit>
              <WarehouseUnit
                unit="B"
                label="In the center facing the left"
                xLabel={['B1', 'B2', 'B3', 'B4']}
                yLabel={['R1', 'R2', 'R3'].reverse()}
              >
                {['R1', 'R2', 'R3'].reverse().map((row) => (
                  <GridRow key={row + 'B'}>
                    {['B1', 'B2', 'B3', 'B4'].map((col) => (
                      <Popover
                        isOpen={
                          showLocationPopover &&
                          activeLocationKey === [col, row].join('-')
                        }
                        key={[col, row].join('-')}
                        onClose={() => setShowLocationPopover(false)}
                        contentStyles={{
                          'background-color': '#ffffff',
                          padding: '24px',
                          transform: 'translate(50%, 100%)'
                        }}
                        content={
                          <Wrapper
                            padding="0"
                            styles={{ 'min-width': '340px' }}
                          >
                            <Text
                              family="Rubik"
                              weight="500"
                              size="16px"
                              color="#000000"
                            >
                              {[col, row].join('-')}
                            </Text>
                            {warehouseData[[col, row].join('-')]?.length && (
                              <Wrapper padding="20px 0 0">
                                {warehouseData[[col, row].join('-')]?.map(
                                  (item) => (
                                    <Text
                                      key={item.SKU}
                                      styles={{ 'margin-top': '10px' }}
                                      as="div"
                                      family="Rubik"
                                      weight="400"
                                      size="15px"
                                      color="#000000"
                                    >
                                      {item.Name}
                                    </Text>
                                  )
                                )}
                              </Wrapper>
                            )}
                            {warehouseData[[col, row].join('-')]?.length && (
                              <Wrapper padding="16px 0 0">
                                <Text
                                  color="#999999"
                                  as="p"
                                  size="15px"
                                  weight="500"
                                >
                                  Last Settled
                                </Text>
                                <Flex
                                  direction="column"
                                  alignItems="flex-start"
                                  gap="10px"
                                  styles={{ 'margin-top': '10px' }}
                                >
                                  {
                                    <>
                                      <Text
                                        color="#999999"
                                        as="p"
                                        size="15px"
                                        weight="400"
                                      >
                                        {ISOStringToReadableDate(
                                          [
                                            ...warehouseData[
                                              [col, row].join('-')
                                            ]?.sort(
                                              (a, b) =>
                                                -a.SettledTime.localeCompare(
                                                  b.SettledTime
                                                )
                                            )
                                          ][0].SettledTime
                                        )}
                                      </Text>
                                      <Text
                                        color="#000000"
                                        as="p"
                                        size="15px"
                                        weight="400"
                                      >
                                        {
                                          [
                                            ...warehouseData[
                                              [col, row].join('-')
                                            ]?.sort(
                                              (a, b) =>
                                                -a.SettledTime.localeCompare(
                                                  b.SettledTime
                                                )
                                            )
                                          ][0].Name
                                        }
                                      </Text>
                                    </>
                                  }
                                </Flex>
                              </Wrapper>
                            )}
                          </Wrapper>
                        }
                      >
                        <GridItem
                          onMouseLeave={() => setShowLocationPopover(false)}
                          active={
                            (showLocationPopover &&
                              activeLocationKey === [col, row].join('-')) ||
                            (locatedItem?.Items?.length &&
                              locatedItem?.Items[0]?.Location.filter(
                                (val) => val === [col, row].join('-')
                              ).length)
                          }
                          onClick={(e) =>
                            handleGridItem([row, col].reverse().join('-'))
                          }
                          data-location={[row, col].join('-')}
                        ></GridItem>
                      </Popover>
                    ))}
                  </GridRow>
                ))}
              </WarehouseUnit>
            </Flex>
            <Flex
              styles={{ 'margin-bottom': '50px', 'max-width': '1100px' }}
              alignItems="flex-start"
              gap="58px"
            >
              <WarehouseUnit
                unit="C"
                label="In the center facing the left"
                xLabel={['C1', 'C2', 'C3', 'C4']}
                yLabel={['R1', 'R2', 'R3', 'R4'].reverse()}
              >
                {['R1', 'R2', 'R3', 'R4'].reverse().map((row) => (
                  <GridRow key={row + 'C'}>
                    {['C1', 'C2', 'C3', 'C4'].map((col) => (
                      <Popover
                        isOpen={
                          showLocationPopover &&
                          activeLocationKey === [col, row].join('-')
                        }
                        key={[col, row].join('-')}
                        onClose={() => setShowLocationPopover(false)}
                        contentStyles={{
                          'background-color': '#ffffff',
                          padding: '24px',
                          transform: 'translate(50%, 100%)'
                        }}
                        content={
                          <Wrapper
                            padding="0"
                            styles={{ 'min-width': '340px' }}
                          >
                            <Text
                              family="Rubik"
                              weight="500"
                              size="16px"
                              color="#000000"
                            >
                              {[col, row].join('-')}
                            </Text>
                            {warehouseData[[col, row].join('-')]?.length && (
                              <Wrapper padding="20px 0 0">
                                {warehouseData[[col, row].join('-')]?.map(
                                  (item) => (
                                    <Text
                                      key={item.SKU}
                                      styles={{ 'margin-top': '10px' }}
                                      as="div"
                                      family="Rubik"
                                      weight="400"
                                      size="15px"
                                      color="#000000"
                                    >
                                      {item.Name}
                                    </Text>
                                  )
                                )}
                              </Wrapper>
                            )}
                            {warehouseData[[col, row].join('-')]?.length && (
                              <Wrapper padding="16px 0 0">
                                <Text
                                  color="#999999"
                                  as="p"
                                  size="15px"
                                  weight="500"
                                >
                                  Last Settled
                                </Text>
                                <Flex
                                  direction="column"
                                  alignItems="flex-start"
                                  gap="10px"
                                  styles={{ 'margin-top': '10px' }}
                                >
                                  {
                                    <>
                                      <Text
                                        color="#999999"
                                        as="p"
                                        size="15px"
                                        weight="400"
                                      >
                                        {ISOStringToReadableDate(
                                          [
                                            ...warehouseData[
                                              [col, row].join('-')
                                            ]?.sort(
                                              (a, b) =>
                                                -a.SettledTime.localeCompare(
                                                  b.SettledTime
                                                )
                                            )
                                          ][0].SettledTime
                                        )}
                                      </Text>
                                      <Text
                                        color="#000000"
                                        as="p"
                                        size="15px"
                                        weight="400"
                                      >
                                        {
                                          [
                                            ...warehouseData[
                                              [col, row].join('-')
                                            ]?.sort(
                                              (a, b) =>
                                                -a.SettledTime.localeCompare(
                                                  b.SettledTime
                                                )
                                            )
                                          ][0].Name
                                        }
                                      </Text>
                                    </>
                                  }
                                </Flex>
                              </Wrapper>
                            )}
                          </Wrapper>
                        }
                      >
                        <GridItem
                          onMouseLeave={() => setShowLocationPopover(false)}
                          active={
                            (showLocationPopover &&
                              activeLocationKey === [col, row].join('-')) ||
                            (locatedItem?.Items?.length &&
                              locatedItem?.Items[0]?.Location.filter(
                                (val) => val === [col, row].join('-')
                              ).length)
                          }
                          onClick={(e) =>
                            handleGridItem([row, col].reverse().join('-'))
                          }
                          data-location={[row, col].join('-')}
                        ></GridItem>
                      </Popover>
                    ))}
                  </GridRow>
                ))}
              </WarehouseUnit>
              <WarehouseUnit
                unit="D"
                label="Against the right wall and near entrance"
                xLabel={['D1', 'D2', 'D3']}
                yLabel={['R1', 'R2', 'R3', 'R4'].reverse()}
              >
                {['R1', 'R2', 'R3', 'R4'].reverse().map((row) => (
                  <GridRow key={row + 'B'}>
                    {['D1', 'D2', 'D3'].map((col) => (
                      <Popover
                        isOpen={
                          showLocationPopover &&
                          activeLocationKey === [col, row].join('-')
                        }
                        key={[col, row].join('-')}
                        onClose={() => setShowLocationPopover(false)}
                        contentStyles={{
                          'background-color': '#ffffff',
                          padding: '24px',
                          transform: 'translate(50%, 100%)'
                        }}
                        content={
                          <Wrapper
                            padding="0"
                            styles={{ 'min-width': '340px' }}
                          >
                            <Text
                              family="Rubik"
                              weight="500"
                              size="16px"
                              color="#000000"
                            >
                              {[col, row].join('-')}
                            </Text>
                            {warehouseData[[col, row].join('-')]?.length && (
                              <Wrapper padding="20px 0 0">
                                {warehouseData[[col, row].join('-')]?.map(
                                  (item) => (
                                    <Text
                                      key={item.SKU}
                                      styles={{ 'margin-top': '10px' }}
                                      as="div"
                                      family="Rubik"
                                      weight="400"
                                      size="15px"
                                      color="#000000"
                                    >
                                      {item.Name}
                                    </Text>
                                  )
                                )}
                              </Wrapper>
                            )}
                            {warehouseData[[col, row].join('-')]?.length && (
                              <Wrapper padding="16px 0 0">
                                <Text
                                  color="#999999"
                                  as="p"
                                  size="15px"
                                  weight="500"
                                >
                                  Last Settled
                                </Text>
                                <Flex
                                  direction="column"
                                  alignItems="flex-start"
                                  gap="10px"
                                  styles={{ 'margin-top': '10px' }}
                                >
                                  {
                                    <>
                                      <Text
                                        color="#999999"
                                        as="p"
                                        size="15px"
                                        weight="400"
                                      >
                                        {ISOStringToReadableDate(
                                          [
                                            ...warehouseData[
                                              [col, row].join('-')
                                            ]?.sort(
                                              (a, b) =>
                                                -a.SettledTime.localeCompare(
                                                  b.SettledTime
                                                )
                                            )
                                          ][0].SettledTime
                                        )}
                                      </Text>
                                      <Text
                                        color="#000000"
                                        as="p"
                                        size="15px"
                                        weight="400"
                                      >
                                        {
                                          [
                                            ...warehouseData[
                                              [col, row].join('-')
                                            ]?.sort(
                                              (a, b) =>
                                                -a.SettledTime.localeCompare(
                                                  b.SettledTime
                                                )
                                            )
                                          ][0].Name
                                        }
                                      </Text>
                                    </>
                                  }
                                </Flex>
                              </Wrapper>
                            )}
                          </Wrapper>
                        }
                      >
                        <GridItem
                          onMouseLeave={() => setShowLocationPopover(false)}
                          active={
                            (showLocationPopover &&
                              activeLocationKey === [col, row].join('-')) ||
                            (locatedItem?.Items?.length &&
                              locatedItem?.Items[0]?.Location.filter(
                                (val) => val === [col, row].join('-')
                              ).length)
                          }
                          onClick={(e) =>
                            handleGridItem([row, col].reverse().join('-'))
                          }
                          data-location={[row, col].join('-')}
                        ></GridItem>
                      </Popover>
                    ))}
                  </GridRow>
                ))}
              </WarehouseUnit>
            </Flex>
            <Flex
              styles={{ 'margin-bottom': '50px' }}
              alignItems="flex-start"
              gap="58px"
            >
              <WarehouseUnit
                unit="E"
                label="Against the right wall"
                xLabel={['E1']}
                yLabel={['R1', 'R2', 'R3'].reverse()}
              >
                {['R1', 'R2', 'R3'].reverse().map((row, idx) => (
                  <GridRow key={row + 'E'}>
                    {['E1'].map((col) => (
                      <Popover
                        isOpen={
                          showLocationPopover &&
                          activeLocationKey === [col, row].join('-')
                        }
                        key={[col, row].join('-')}
                        onClose={() => setShowLocationPopover(false)}
                        contentStyles={{
                          'background-color': '#ffffff',
                          padding: '24px',
                          transform: 'translate(50%, 100%)'
                        }}
                        content={
                          <Wrapper
                            padding="0"
                            styles={{ 'min-width': '340px' }}
                          >
                            <Text
                              family="Rubik"
                              weight="500"
                              size="16px"
                              color="#000000"
                            >
                              {[col, row].join('-')}
                            </Text>
                            {warehouseData[[col, row].join('-')]?.length && (
                              <Wrapper padding="20px 0 0">
                                {warehouseData[[col, row].join('-')]?.map(
                                  (item) => (
                                    <Text
                                      key={item.SKU}
                                      styles={{ 'margin-top': '10px' }}
                                      as="div"
                                      family="Rubik"
                                      weight="400"
                                      size="15px"
                                      color="#000000"
                                    >
                                      {item.Name}
                                    </Text>
                                  )
                                )}
                              </Wrapper>
                            )}
                            {warehouseData[[col, row].join('-')]?.length && (
                              <Wrapper padding="16px 0 0">
                                <Text
                                  color="#999999"
                                  as="p"
                                  size="15px"
                                  weight="500"
                                >
                                  Last Settled
                                </Text>
                                <Flex
                                  direction="column"
                                  alignItems="flex-start"
                                  gap="10px"
                                  styles={{ 'margin-top': '10px' }}
                                >
                                  {
                                    <>
                                      <Text
                                        color="#999999"
                                        as="p"
                                        size="15px"
                                        weight="400"
                                      >
                                        {ISOStringToReadableDate(
                                          [
                                            ...warehouseData[
                                              [col, row].join('-')
                                            ]?.sort(
                                              (a, b) =>
                                                -a.SettledTime.localeCompare(
                                                  b.SettledTime
                                                )
                                            )
                                          ][0].SettledTime
                                        )}
                                      </Text>
                                      <Text
                                        color="#000000"
                                        as="p"
                                        size="15px"
                                        weight="400"
                                      >
                                        {
                                          [
                                            ...warehouseData[
                                              [col, row].join('-')
                                            ]?.sort(
                                              (a, b) =>
                                                -a.SettledTime.localeCompare(
                                                  b.SettledTime
                                                )
                                            )
                                          ][0].Name
                                        }
                                      </Text>
                                    </>
                                  }
                                </Flex>
                              </Wrapper>
                            )}
                          </Wrapper>
                        }
                      >
                        <GridItem
                          onMouseLeave={() => setShowLocationPopover(false)}
                          active={
                            (showLocationPopover &&
                              activeLocationKey === [col, row].join('-')) ||
                            (locatedItem?.Items?.length &&
                              locatedItem?.Items[0]?.Location.filter(
                                (val) => val === [col, row].join('-')
                              ).length)
                          }
                          onClick={(e) =>
                            handleGridItem([row, col].reverse().join('-'))
                          }
                          data-location={[row, col].join('-')}
                        ></GridItem>
                      </Popover>
                    ))}
                  </GridRow>
                ))}
              </WarehouseUnit>
            </Flex>
          </Wrapper>
        </Wrapper>
      )}
    </Wrapper>
  )
}

export default withRouter(Inventory)

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`
const Label = styled.label`
  font-size: ${({ theme }) => theme.font.size.xs};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  color: ${({ theme }) => theme.colors.primaryText};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
`

const ModifiedLabel = styled(Label)`
  font-size: ${({ theme }) => theme.font.size.xsss};
`
const Form = styled.form`
  width: 100%;
  overflow: hidden;
`

const CustomInput = styled.div`
  min-height: 59px;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: #ffffff;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  overflow-x: auto;

  & > input {
    flex: 1 0 auto;
    background: transparent;
    border: none;
    font-size: ${({ theme }) => theme.font.size.s};
    line-height: ${({ theme }) => theme.font.lineHeight.wide};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.primaryText};
    height: 100%;
    outline: none;
  }
`

const Tags = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
`

const Tag = styled.button`
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #000000;
  border-radius: 30px;
  background-color: transparent;
  filter: invert(100%) brightness(0%);
  cursor: pointer;
`
const GridRow = styled.div`
  width: fit-content;
  display: flex;
  flex-wrap: nowrap;
  &:not(:last-of-type) > div > div:first-of-type {
    border-bottom: 1px solid #999999;
  }
  & > div:not(:last-of-type) {
    border-right: 3px solid #999999;
  }
`
const GridItem = styled.div`
  width: 120px;
  height: 90px;
  transition: all 0.3s ease-in;
  background-color: ${({ active }) =>
    active ? 'rgba(46, 190, 189, .4)' : '#D9D9D9'};
  position: relative;

  &:hover {
    background-color: #2ebebd;
  }
`
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
