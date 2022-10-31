import { useEffect, useState } from 'react'
import {
  Filter,
  Flex,
  Pagination,
  Table,
  TableCell,
  TableRow,
  Wrapper
} from '../../components/commons'
import {
  dateList,
  ShippedTableHeaders
} from '../../constants/pageConstants/shipping'
import { ISOStringToReadableDate } from '../../utils/utils'
import { toggleLoading } from '../../store/slices/globalSlice'
import { useDispatch } from 'react-redux'
import { getShippedOrders } from '../../service/shipping'
const itemsPerPage = 10
const Orders = () => {
  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({
    page: 1,
    date: ''
  })
  const [shippedOrders, setShippedOrders] = useState([])
  const [shippedOrdersToShow, setShippedOrdersToShow] = useState([])
  // const [itemsPerPage, setItemsPerPage] = useState(10)

  const handlePage = (page) => {
    setOrderState({
      ...orderState,
      page
    })
  }
  const handleDate = (val) => {
    setOrderState({
      ...orderState,
      date: val
    })
  }

  const handleShippedOrdersToShow = (shippedOrders) => {
    if (shippedOrders.length == 0) {
      return
    }
    const dataToShow = shippedOrders.slice(
      orderState.page * 10 - 10,
      orderState.page * 10
    )
    setShippedOrdersToShow(dataToShow)
  }

  const fetchShippedOrders = async () => {
    dispatch(toggleLoading(true))
    const data = await getShippedOrders({
      date: orderState.date
    })
    dispatch(toggleLoading(false))
    setShippedOrders(data.Items)
    handleShippedOrdersToShow(data.Items)
  }

  useEffect(() => {
    handleShippedOrdersToShow(shippedOrders)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderState.page])
  useEffect(() => {
    fetchShippedOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderState.date])

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="flex-end"
        styles={{ 'margin-top': '27px', gap: '12px' }}
      >
        <Filter
          value={orderState.date}
          label="Ship date"
          list={dateList}
          onSelect={handleDate}
        />
      </Flex>
      <Wrapper styles={{ position: 'relative' }} padding="23px 0px 0px">
        <Table
          name="shipped-items"
          headers={ShippedTableHeaders}
          paginationComponent={
            <Wrapper padding="32px 0 0">
              <Pagination
                itemsInPage={shippedOrdersToShow?.length}
                totalItems={shippedOrders?.length}
                totalPages={Math.ceil(shippedOrders?.length / itemsPerPage)}
                onPageChange={handlePage}
                currentPage={orderState.page}
              />
            </Wrapper>
          }
        >
          {shippedOrdersToShow.map((item, idx) => (
            <TableRow idx={idx} dataId={item.Id} key={item.Id}>
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
  )
}

export default Orders
