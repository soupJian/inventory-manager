import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Table, Select, Space } from 'antd'
// js
import { dateList, sortByList } from '../../constants/pageConstants/shipping'
import { ISOStringToReadableDate } from '../../utils/utils'
import { formatMoney } from '../../utils/formatMoney'
import { toggleLoading } from '../../store/slices/globalSlice'
// api
import { getShippedOrders } from '../../service/shipping'
// css
import styles from './index.module.less'

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
    title: 'Payment',
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
      <Button type="primary" className={styles.Btn}>
        Detail
      </Button>
    )
  }
]

const Orders = () => {
  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({
    sortBy: 'asc',
    date: ''
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
  useEffect(() => {
    fetchShippedOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderState.date, orderState.sortBy])

  return (
    <>
      <div className={styles.container}>
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
            showTotal: (total) =>
              `Showing ${total} of ${orderData.length} items`
          }}
        />
      </div>
    </>
  )
}

export default withRouter(Orders)
