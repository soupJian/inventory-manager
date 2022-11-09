import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
// components
import { Button, Drawer, Table, Select, Space } from 'antd'
const DrawerDetailHistory = dynamic(() =>
  import('./components/drawer-detail-history')
)
// js
import { dateList } from '../../constants/pageConstants/shipping'
import { ISOStringToReadableDate } from '../../utils/utils'
import { toggleLoading } from '../../store/slices/globalSlice'
// api
import { getShippedOrders } from '../../service/shipping'
// css
import styles from './index.module.less'

// main
const Orders = () => {
  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({
    date: ''
  })
  const [orderData, setOrderData] = useState([])
  const [drawerDetailInfo, setDrawerDetailInfo] = useState({
    show: false,
    info: null
  })
  const fetchShippedOrders = async () => {
    dispatch(toggleLoading(true))
    const data = await getShippedOrders({
      date: orderState.date
    })
    dispatch(toggleLoading(false))
    setOrderData(data.Items)
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
      title: 'DESTINATION',
      render: (_, record) => `${record.City}, ${record.State.toUpperCase()}`
    },
    {
      title: 'SHIP DATE',
      render: (_, record) => ISOStringToReadableDate(record.Created)
    },
    {
      title: 'ORDER DATE',
      render: (_, record) => ISOStringToReadableDate(record.Created)
    },
    {
      title: '',
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.Btn}
          onClick={() =>
            setDrawerDetailInfo({
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
  }, [orderState.date])

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
        title={`Order #${drawerDetailInfo.info?.Id}`}
        placement="left"
        closable={false}
        onClose={() =>
          setDrawerDetailInfo({
            show: false
          })
        }
        open={drawerDetailInfo.show}
        key="1"
        width={612}
        className={styles.drawerWrap}
      >
        {drawerDetailInfo.info && (
          <DrawerDetailHistory info={drawerDetailInfo.info} />
        )}
      </Drawer>
    </>
  )
}

export default Orders
