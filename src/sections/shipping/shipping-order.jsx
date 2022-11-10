import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import { Button, Drawer, Table, Select, Space } from 'antd'
const DrawerDetail = dynamic(() => import('./components/drawer-detail'))
const DrawerShip = dynamic(() => import('./components/drawer-ship'))

// js
import { dateList } from '../../constants/pageConstants/shipping'
import { ISOStringToReadableDate } from '../../utils/utils'
import { toggleLoading } from '../../store/slices/globalSlice'
// api
import { getUnShippedOrders } from '../../service/shipping'
// css
import styles from './index.module.less'

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
  const [drawerShipInfo, setDrawerShipInfo] = useState({
    show: false,
    info: null
  })
  const fetchUnShippedOrders = async () => {
    try {
      dispatch(toggleLoading(true))
      const data = await getUnShippedOrders({
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
      title: 'DESTINATION',
      render: (_, record) => `${record.City}, ${record.State.toUpperCase()}`
    },
    {
      title: 'ORDER DATE',
      render: (_, record) => ISOStringToReadableDate(record.Created)
    },
    {
      title: 'DETAIL',
      render: (_, record) => (
        <span
          className={styles.activeText}
          onClick={() =>
            setDrawerDetailInfo({
              show: true,
              info: record
            })
          }
        >
          Detail
        </span>
      )
    },
    {
      title: '',
      render: (_, record) => (
        <Button
          className={styles.Btn}
          onClick={() => {
            setDrawerShipInfo({
              show: true,
              info: record
            })
          }}
        >
          Ship
        </Button>
      )
    }
  ]

  useEffect(() => {
    fetchUnShippedOrders()
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
        {drawerDetailInfo.info && <DrawerDetail info={drawerDetailInfo.info} />}
      </Drawer>
      <Drawer
        placement="left"
        closable={false}
        onClose={() =>
          setDrawerShipInfo({
            show: false
          })
        }
        open={drawerShipInfo.show}
        key="2"
        width={612}
        className={styles.drawerWrap}
      >
        <DrawerShip />
      </Drawer>
    </>
  )
}

export default withRouter(Orders)
