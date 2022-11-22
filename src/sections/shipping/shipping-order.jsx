import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import dynamic from "next/dynamic"
import { Button, Drawer, Table, Select, Space } from "antd"
const DrawerDetail = dynamic(() => import("./components/drawer-detail"))
const DrawerShip = dynamic(() => import("./components/drawer-ship"))
// js
import { dateList } from "@/constants/pageConstants/shipping"
import { ISOStringToReadableDate } from "@/utils/utils"
import { toggleLoading } from "@/store/slices/globalSlice"
// api
import { getAllShippingOrders, getOrder } from "@/service/orders"
// css
import styles from "./index.module.less"

const ShippingOrders = () => {
  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({
    date: ""
  })
  const [orderData, setOrderData] = useState([])
  const [drawerDetailInfo, setDrawerDetailInfo] = useState({
    show: false,
    id: null, // 根据 id 变化，设置对应的 info 信息
    info: null
  })
  const [drawerShipInfo, setDrawerShipInfo] = useState({
    show: false,
    info: null
  })
  const fetchData = async () => {
    try {
      dispatch(toggleLoading(true))
      dispatch(toggleLoading(true))
      const data = await getAllShippingOrders({
        date: orderState.date
      })
      setOrderData(data.Items)
      dispatch(toggleLoading(false))
    } catch (err) {
      dispatch(toggleLoading(false))
      console.log(err)
    }
  }
  const showDetail = async (id) => {
    const { Item } = await getOrder(id)
    setDrawerDetailInfo({
      show: true,
      id,
      info: Item
    })
  }
  const showShip = async (id) => {
    const { Item } = await getOrder(id)
    setDrawerShipInfo({
      show: true,
      id,
      info: Item
    })
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
      title: "DESTINATION",
      render: (_, record) => record.customerInfo.address1
    },
    {
      title: "ORDER DATE",
      render: (_, record) => ISOStringToReadableDate(record.created)
    },
    {
      title: "DETAIL",
      render: (_, record) => (
        <span
          className={styles.activeText}
          onClick={() => showDetail(record.id)}
        >
          Detail
        </span>
      )
    },
    {
      title: "",
      render: (_, record) => (
        <Button className={styles.Btn} onClick={() => showShip(record.id)}>
          Ship
        </Button>
      )
    }
  ]

  useEffect(() => {
    fetchData()
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
        onClose={() => {
          setDrawerDetailInfo({
            ...drawerDetailInfo,
            show: false
          })
        }}
        open={drawerDetailInfo.show}
        key="detail"
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
            ...drawerShipInfo,
            show: false
          })
        }
        open={drawerShipInfo.show}
        key="ship"
        width={612}
        className={styles.drawerWrap}
      >
        {drawerShipInfo.info && (
          <DrawerShip
            info={drawerShipInfo.info}
            closedDrawer={() => {
              setDrawerShipInfo({
                id: null,
                info: null,
                show: false
              })
              fetchData()
            }}
          />
        )}
      </Drawer>
    </>
  )
}

export default ShippingOrders
