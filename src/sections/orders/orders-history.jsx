import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Table, Select, Space, Drawer } from 'antd'
import DrawerOrder from './components/drawer-order'
// js
import { dateList, sortByList } from '@/constants/pageConstants/shipping'
import { ISOStringToReadableDate } from '@/utils/utils'
import { formatMoney } from '@/utils/formatMoney'
import { toggleLoading } from '@/store/slices/globalSlice'
// api
import { getAllOrders } from '@/service/orders'
// css
import styles from './index.module.less'

const Orders = () => {
  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({
    sortBy: 'asc',
    date: ''
  })
  const [drawerInfo, setDrawerInfo] = useState({
    show: false,
    info: null
  })
  const [orderData, setOrderData] = useState([])
  const getData = async () => {
    try {
      dispatch(toggleLoading(true))
      const data = await getAllOrders({
        date: orderState.date
      })
      setOrderData(data.Items)
      dispatch(toggleLoading(false))
    } catch (err) {
      dispatch(toggleLoading(false))
      console.log(err)
    }
  }
  const columns = [
    {
      title: 'ORDER NO.',
      dataIndex: 'id'
    },
    {
      title: 'CUSTOMER',
      render: (_, record) => record.customerInfo.fullName
    },
    {
      title: 'PAYMENT',
      render: (_, record) => `$${formatMoney(Number(record.totalAmount))}`
    },
    {
      title: 'ORDER DATE',
      render: (_, record) => ISOStringToReadableDate(record.created)
    },
    {
      title: 'COMPLETED ON',
      render: (_, record) => ISOStringToReadableDate(record.created)
    },
    {
      title: '',
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.Btn}
          onClick={() =>
            setDrawerInfo({
              show: true,
              info: record
            })
          }
        >
          Detail
        </Button>
      )
    }
  ]
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderState.date, orderState.sortBy])

  return (
    <>
      <div className={styles.userSelectWrap}>
        <Space>
          <span>Order date</span>
          <Select
            size="large"
            defaultValue={orderState.date}
            onChange={(value) =>
              setOrderState({
                ...orderState,
                date: value
              })
            }
            options={dateList}
          />
          <span>Sort by</span>
          <Select
            size="large"
            defaultValue={orderState.sortBy}
            onChange={(value) =>
              setOrderState({
                ...orderState,
                sortBy: value
              })
            }
            options={sortByList}
          />
        </Space>
      </div>
      <div className={styles.tableWrap}>
        <Table
          columns={columns}
          dataSource={orderData}
          rowKey="id"
          pagination={{
            showTotal: (total, range) => {
              return `Showing ${range[1] - range[0] + 1} of ${total} items`
            }
          }}
        />
      </div>
      <Drawer
        placement="left"
        closable={false}
        onClose={() =>
          setDrawerInfo({
            ...drawerInfo,
            show: false
          })
        }
        open={drawerInfo.show}
        key="2"
        width={700}
        className={styles.drawerWrap}
      >
        <DrawerOrder type="history" />
      </Drawer>
    </>
  )
}

export default withRouter(Orders)
