import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// components
import { Button, Table, Select, Space, Modal, Drawer } from 'antd'
import ModalShipping from './components/modal-shipping'
import DrawerOrder from './components/drawer-order'
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
  const [drawerInfo, setDrawerInfo] = useState({
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
            showTotal: (total, range) => {
              return `Showing ${range[1] - range[0] + 1} of ${total} items`
            }
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
        <DrawerOrder type="current" />
      </Drawer>
    </>
  )
}

export default withRouter(Orders)
