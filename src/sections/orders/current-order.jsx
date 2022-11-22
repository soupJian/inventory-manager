import { withRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
// components
import { Button, Table, Select, Space, Modal, Drawer } from "antd"
import ModalShipping from "./components/modal-shipping"
import DrawerOrder from "./components/drawer-order"
// js
import { dateList, sortByList } from "@/constants/pageConstants/shipping"
import { ISOStringToReadableDate } from "@/utils/utils"
import { formatMoney } from "@/utils/formatMoney"
import { toggleLoading } from "@/store/slices/globalSlice"
// api
import { getAllCurrentOrders, getOrder } from "@/service/orders"
// css
import styles from "./index.module.less"

const Orders = () => {
  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({
    orderBy: "asc",
    date: ""
  })
  const [orderData, setOrderData] = useState([])
  const [shippingModal, setShippingModal] = useState({
    show: false,
    id: null,
    info: null
  })
  const [drawerInfo, setDrawerInfo] = useState({
    show: false,
    id: null,
    info: null
  })
  const getData = async () => {
    try {
      dispatch(toggleLoading(true))
      const data = await getAllCurrentOrders({
        date: orderState.date
      })
      setOrderData(data.Items)
      console.log(data)
      dispatch(toggleLoading(false))
    } catch (err) {
      dispatch(toggleLoading(false))
      console.log(err)
    }
  }
  // detail
  const showDetail = async (id) => {
    if (id != drawerInfo.id) {
      const { Item } = await getOrder(id)
      setDrawerInfo({
        show: true,
        id,
        info: Item
      })
    } else {
      setDrawerInfo({
        ...drawerInfo,
        show: true
      })
    }
  }
  // status为shipped时候，点击查看详情
  const showShipped = async (id) => {
    if (id != shippingModal.id) {
      const { Item } = await getOrder(id)
      setShippingModal({
        show: true,
        id,
        info: Item
      })
    } else {
      setShippingModal({
        ...drawerInfo,
        show: true
      })
    }
  }
  const columns = [
    {
      title: "ORDER NO.",
      dataIndex: "id"
    },
    {
      title: "CUSTOMER",
      render: (_, record) => record.customerInfo.fullName
    },
    {
      title: "PAYMENT",
      render: (_, record) => `$${formatMoney(Number(record.totalAmount))}`
    },
    {
      title: "ORDER DATE",
      render: (_, record) => ISOStringToReadableDate(record.created)
    },
    {
      title: "Status",
      render: (_, record) => {
        return (
          <>
            {record.orderStatus == "Shipped" ? (
              <span
                className={styles.activeText}
                onClick={() => showShipped(record.id)}
              >
                {record.orderStatus}
              </span>
            ) : (
              record.orderStatus
            )}
          </>
        )
      }
    },
    {
      title: "",
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.Btn}
          onClick={() => showDetail(record.id)}
        >
          Detail
        </Button>
      )
    }
  ]
  useEffect(() => {
    getData()
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
          rowKey="id"
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
        key="detail"
        width={700}
        className={styles.drawerWrap}
      >
        {drawerInfo.info && (
          <DrawerOrder type="current" info={drawerInfo.info} />
        )}
      </Drawer>
    </>
  )
}

export default withRouter(Orders)
