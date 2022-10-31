import { withRouter } from 'next/router'
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
  UnShippedTableHeaders
} from '../../constants/pageConstants/shipping'
import { ISOStringToReadableDate } from '../../utils/utils'
import { toggleLoading } from '../../store/slices/globalSlice'
import { useDispatch } from 'react-redux'
import { Button, Drawer } from 'antd'
import DrawerDetail from './drawer-detail'
import styles from './index.module.scss'
import { getUnShippedOrders } from '../../service/shipping'
const itemsPerPage = 10
const Orders = () => {
  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({
    page: 1,
    date: ''
  })
  const [unShippedOrdersToShow, setUnShippedOrdersToShow] = useState([])
  const [unShippedOrders, setUnShippedOrders] = useState([])
  // const [itemsPerPage, setItemsPerPage] = useState(10)
  const [detailDrawerInfo, setDetailDrawerInfo] = useState({
    show: false,
    info: null
  })
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
  const handleUnShippedOrdersToShow = (unShippedOrders) => {
    if (unShippedOrders.length == 0) {
      return
    }
    const dataToShow = unShippedOrders.slice(
      orderState.page * 10 - 10,
      orderState.page * 10
    )
    setUnShippedOrdersToShow(dataToShow)
  }

  const fetchUnShippedOrders = async () => {
    try {
      dispatch(toggleLoading(true))
      const data = await getUnShippedOrders({
        date: orderState.date
      })
      setUnShippedOrders(data.Items)
      handleUnShippedOrdersToShow(data.Items)
      dispatch(toggleLoading(false))
    } catch (err) {
      dispatch(toggleLoading(false))
      console.log(err)
    }
  }
  useEffect(() => {
    handleUnShippedOrdersToShow(unShippedOrders)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderState.page])
  useEffect(() => {
    fetchUnShippedOrders()
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
          label="Order date"
          list={dateList}
          onSelect={handleDate}
        />
      </Flex>
      <Wrapper styles={{ position: 'relative' }} padding="23px 0px 0px">
        <Table
          name="shipped-items"
          headers={UnShippedTableHeaders}
          paginationComponent={
            <Wrapper padding="32px 0 0">
              <Pagination
                itemsInPage={unShippedOrdersToShow?.length}
                totalItems={unShippedOrders?.length}
                totalPages={Math.ceil(unShippedOrders?.length / itemsPerPage)}
                onPageChange={handlePage}
                currentPage={orderState.page}
              />
            </Wrapper>
          }
        >
          {unShippedOrdersToShow.map((item, idx) => (
            <TableRow idx={idx} dataId={item.Id} key={item.Id}>
              {UnShippedTableHeaders.map((cell, idx) => (
                <TableCell key={cell.key + idx + 'unshipped'}>
                  {cell.key === 'Address' ? (
                    `${item.City}, ${item.State.toUpperCase()}`
                  ) : cell.key === 'Fullname' ? (
                    `${item.FirstName}, ${item.LastName}`
                  ) : cell.key === 'Created' ? (
                    ISOStringToReadableDate(item['Created'])
                  ) : cell.key === 'Detail' ? (
                    <span
                      className={styles.activeText}
                      onClick={() =>
                        setDetailDrawerInfo({
                          show: true,
                          info: item
                        })
                      }
                    >
                      Detail
                    </span>
                  ) : cell.key === 'ShipBtn' ? (
                    <Button className={styles.Btn}>Ship</Button>
                  ) : (
                    item[cell.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </Table>
      </Wrapper>
      <Drawer
        title={`Order #${detailDrawerInfo.info?.Id}`}
        placement="left"
        closable={false}
        onClose={() =>
          setDetailDrawerInfo({
            show: false
          })
        }
        open={detailDrawerInfo.show}
        key="left"
        width={612}
      >
        {detailDrawerInfo.info && <DrawerDetail info={detailDrawerInfo.info} />}
      </Drawer>
    </>
  )
}

export default withRouter(Orders)
