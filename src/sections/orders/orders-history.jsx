import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Table, Select, Space, Drawer } from 'antd'
import DrawerOrder from './components/drawer-order'
// js
import { dateList, sortByList } from '../../constants/pageConstants/shipping'
import { ISOStringToReadableDate } from '../../utils/utils'
import { formatMoney } from '../../utils/formatMoney'
import { toggleLoading } from '../../store/slices/globalSlice'
import { formatTimeStr } from 'antd/lib/statistic/utils'
// api
import { getShippedOrders } from '../../service/shipping'
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
  const fetchShippedOrders = async () => {
    try {
      dispatch(toggleLoading(true))
      const data = await getShippedOrders({
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
      dataIndex: 'Id'
    },
    {
      title: 'CUSTOMER',
      render: (_, record) => `${record.FirstName}, ${record.LastName}`
    },
    {
      title: 'PAYMENT',
      dataIndex: 'Payment',
      render: (_, record) => `$${formatMoney(Number(record.Payment))}`
    },
    {
      title: 'ORDER DATE',
      dataIndex: 'Created',
      render: (_, record) => ISOStringToReadableDate(record.Created)
    },
    {
      title: 'COMPLETED ON',
      dataIndex: 'Status',
      render: (_, record) => ISOStringToReadableDate(record.Created)
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
    fetchShippedOrders()
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
          rowKey="Id"
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
