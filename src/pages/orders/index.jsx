import { withRouter } from 'next/router'
import { useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Alert,
  Box,
  Button,
  Filter,
  Flex,
  Icon,
  Input,
  Loader,
  Pagination,
  Tab,
  Table,
  TableCell,
  TableRow,
  Tabs,
  Text,
  Wrapper
} from '../../components/commons'
import {
  dateList,
  ShippedTableHeaders,
  UnShippedTableHeaders
} from '../../constants/pageConstants/orders'
import {
  Api,
  ISOStringToReadableDate,
  objectsToQueryString
} from '../../utils/utils'
import styles from './index.module.scss'

const api = new Api()
const orderReducer = (state, { type, payload }) => {
  switch (type) {
    case 'changeTab':
      return { ...state, activeTab: payload, page: 1 }
    case 'changePageType':
      return { ...state, pageType: payload, page: 1, date: '365' }
    case 'changePaginateNumber':
      return { ...state, page: payload }
    case 'changedate':
      return { ...state, date: payload }
    default:
      return state
  }
}

const Orders = ({ router }) => {
  const user = useSelector((state) => state.user)
  const [orderState, dispatch] = useReducer(orderReducer, {
    page: parseInt(router.query.page) || 1,
    pageType: router.query.pageType || 'current',
    date: router.query.date || '365'
  })
  const [loadingTable, setLoadingTable] = useState(false)
  const [shippedOrders, setShippedOrders] = useState([])
  const [shippedOrdersToShow, setShippedOrdersToShow] = useState([])
  const [unShippedOrdersToShow, setUnShippedOrdersToShow] = useState([])
  const [unShippedOrders, setUnShippedOrders] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [syncLoading, setSyncLoading] = useState(false)

  const handlePage = (page) => {
    router.replace(
      `/orders?${objectsToQueryString({ ...router.query, page })}`,
      null,
      { shallow: true }
    )
    dispatch({ type: 'changePaginateNumber', payload: page })
  }

  const handleDate = (val) => {
    console.log('handle date', val)
    dispatch({ type: 'changedate', payload: val })
    router.replace(
      `/orders?${objectsToQueryString({ ...router.query, date: val })}`,
      null,
      { shallow: true }
    )
  }

  const handleShippedOrdersToShow = () => {
    setLoadingTable(true)
    const dataToShow = shippedOrders.slice(
      orderState.page * 10 - 10,
      orderState.page * 10
    )
    setShippedOrdersToShow(dataToShow)
    setLoadingTable(false)
  }
  const handleUnShippedOrdersToShow = () => {
    setLoadingTable(true)
    const dataToShow = unShippedOrders.slice(
      orderState.page * 10 - 10,
      orderState.page * 10
    )
    setUnShippedOrdersToShow(dataToShow)
    setLoadingTable(false)
  }

  const fetchShippedOrders = () => {
    return api
      .getShippedOrders(`date=${orderState.date}`, {
        Authorization: `Bearer ${user.accessToken}`
      })
      .then((data) => {
        setShippedOrders(data.Items)
      })
  }

  const fetchUnShippedOrders = () => {
    return api
      .getUnShippedOrders(`date=${orderState.date}`, {
        Authorization: `Bearer ${user.accessToken}`
      })
      .then((data) => {
        setUnShippedOrders(data.Items)
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const syncData = () => {
    setSyncLoading(true)
    api
      .syncOrdersInventory({ Authorization: `Bearer ${user.accessToken}` })
      .then((data) => {
        setSyncLoading(false)
      })
  }

  useEffect(() => {
    setLoadingTable(true)
    const dataFetcher = Promise.all(
      fetchShippedOrders(),
      fetchUnShippedOrders()
    )
    dataFetcher
      .then((data) => {
        setLoadingTable(false)
      })
      .catch((err) => {
        console.log(err)
        setLoadingTable(false)
      })
  }, [orderState.pageType, orderState.date])

  useEffect(() => {
    if (orderState.pageType === 'current') {
      handleUnShippedOrdersToShow()
    } else if (orderState.pageType === 'history') {
      handleShippedOrdersToShow()
    }
  }, [shippedOrders, unShippedOrders, orderState.page])

  useEffect(() => {
    if (!router.query.pageType) {
      router.replace(`/orders?pageType=current&date=${orderState.date}`)
      handleShippedOrdersToShow()
    } else if (router.query.pageType !== orderState.pageType) {
      router.replace(
        `/orders?pageType=${orderState.pageType}&date=${orderState.date}`,
        null,
        { shallow: true }
      )
      handleShippedOrdersToShow()
    }
  }, [orderState.pageType])

  return (
    <Wrapper
      styles={{ 'min-height': '100%', position: 'relative' }}
      height="auto"
      padding="21px 29px"
    >
      <Flex styles={{ 'flex-wrap': 'nowrap' }} justifyContent="space-between">
        <Tabs>
          <Tab
            onClick={() =>
              dispatch({ type: 'changePageType', payload: 'current' })
            }
            active={'current' === orderState.pageType}
            idx={0}
          >
            Current Orders
          </Tab>
          <Tab
            onClick={() =>
              dispatch({ type: 'changePageType', payload: 'history' })
            }
            active={'history' === orderState.pageType}
            idx={1}
          >
            Order History
          </Tab>
        </Tabs>
        <Input
          type="text"
          placeholder="Search order number"
          startIcon={<Icon name="search" width="30px" height="30px" />}
        />
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="flex-end"
        styles={{ 'margin-top': '27px', gap: '12px' }}
      >
        <Button onClick={syncData} minWidth="70px" kind="primary">
          Sync
        </Button>
        <Filter
          value={orderState.date}
          label={orderState.pageType === 'history' ? 'Ship date' : 'Order date'}
          list={dateList}
          onSelect={handleDate}
        />
      </Flex>
      {orderState.pageType === 'current' ? (
        <Wrapper styles={{ position: 'relative' }} padding="23px 0px 0px">
          <Table
            loading={loadingTable}
            name="shipped-items"
            headers={UnShippedTableHeaders}
            className={styles.tableWarp}
            paginationComponent={
              <Wrapper padding="32px 0 0">
                <Pagination
                  itemsInPage={unShippedOrdersToShow?.length}
                  totalItems={unShippedOrders?.length}
                  totalPages={Math.ceil(unShippedOrders?.length / itemsPerPage)}
                  onPageChange={handlePage}
                  currentPage={orderState.page}
                />{' '}
              </Wrapper>
            }
          >
            {unShippedOrdersToShow.map((item, idx) => (
              <TableRow idx={idx} height="72px" dataId={item.Id} key={item.Id}>
                {UnShippedTableHeaders.map((cell, idx) => (
                  <TableCell key={cell.key + idx + 'unshipped'}>
                    {cell.key === 'Address'
                      ? `${item.City}, ${item.State.toUpperCase()}`
                      : cell.key === 'Fullname'
                      ? `${item.FirstName}, ${item.LastName}`
                      : cell.key === 'Payment'
                      ? '$' + item['Payment']
                      : cell.key === 'Created'
                      ? ISOStringToReadableDate(item['Created'])
                      : cell.key === 'Status'
                      ? item.Shipped
                        ? 'Shipped'
                        : 'Unshipped'
                      : item[cell.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </Table>
        </Wrapper>
      ) : (
        <>
          <Wrapper styles={{ position: 'relative' }} padding="23px 0px 0px">
            <Table
              loading={loadingTable}
              name="shipped-items"
              headers={ShippedTableHeaders}
              className={styles.tableWarp}
              paginationComponent={
                <Wrapper padding="32px 0 0">
                  <Pagination
                    itemsInPage={shippedOrdersToShow?.length}
                    totalItems={shippedOrders?.length}
                    totalPages={Math.ceil(shippedOrders?.length / itemsPerPage)}
                    onPageChange={handlePage}
                    currentPage={orderState.page}
                  />{' '}
                </Wrapper>
              }
            >
              {shippedOrdersToShow.map((item, idx) => (
                <TableRow
                  idx={idx}
                  height="72px"
                  dataId={item.Id}
                  key={item.Id}
                >
                  {ShippedTableHeaders.map((cell, idx) => (
                    <TableCell key={cell.key + idx}>
                      {cell.key === 'Address'
                        ? `${item.City}, ${item.State.toUpperCase()}`
                        : cell.key === 'Fullname'
                        ? `${item.FirstName}, ${item.LastName}`
                        : cell.key === 'Payment'
                        ? '$' + item['Payment']
                        : cell.key === 'Created'
                        ? ISOStringToReadableDate(item['Created'])
                        : cell.key === 'Status'
                        ? item.Shipped
                          ? 'Shipped'
                          : 'Unshipped'
                        : item[cell.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </Table>
          </Wrapper>
        </>
      )}
      {syncLoading && (
        <Wrapper
          styles={{
            position: 'absolute',
            top: '0%',
            left: '0%',
            width: '100%',
            height: '100%',
            'background-color': 'rgba(255,255,255,.8)'
          }}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            direction="column"
            gap="10px"
            styles={{ height: '100%' }}
          >
            <Loader size={100} />
            <Text>Syncing data, this may take a couple of seconds...</Text>
          </Flex>
        </Wrapper>
      )}
    </Wrapper>
  )
}

export default withRouter(Orders)
