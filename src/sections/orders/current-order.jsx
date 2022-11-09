import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// components
import { Button, Table, Select, Space, Modal } from 'antd'
import ModalShipping from './components/modal-shipping'
// js
import { dateList, sortByList } from '../../constants/pageConstants/shipping'
import { ISOStringToReadableDate } from '../../utils/utils'
import { formatMoney } from '../../utils/formatMoney'
import { toggleLoading } from '../../store/slices/globalSlice'
// api
import { getUnShippedOrders } from '../../service/shipping'
// css
import styles from './index.module.less'

const Orders = () => {
  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({
    orderBy: 'asc',
    date: ''
  })
  const [orderData, setOrderData] = useState([])
  const [shippingModal, setShippingModal] = useState({
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
      title: 'Status',
      dataIndex: 'Status',
      render: (_, record) => {
        return (
          <>
            {record.Status == 'Processing' && Processing}
            {/* {record.Status == 'Shipped' && ( */}
            <span
              className={styles.activeText}
              onClick={() => {
                setShippingModal({
                  show: true,
                  info: record
                })
              }}
            >
              Shipped
            </span>
            {/* // )} */}
          </>
        )
      }
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
      <Modal
        open={shippingModal.show}
        footer={null}
        centered
        title="Shipping status"
        onCancel={() =>
          setShippingModal({
            show: false
          })
        }
      >
        {shippingModal.info && <ModalShipping info={shippingModal.info} />}
      </Modal>
    </>
  )
}

export default withRouter(Orders)
