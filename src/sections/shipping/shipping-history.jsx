import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import dynamic from "next/dynamic"
// components
import { Button, Drawer, Table, Select, Space } from "antd"
const DrawerDetailHistory = dynamic(() =>
  import("./components/drawer-detail-history")
)
// js
import { dateList } from "@/constants/pageConstants/shipping"
import { ISOStringToReadableDate } from "@/utils/utils"
import { toggleLoading } from "@/store/slices/globalSlice"
// api
import { getAllShippingHistory, getOrder } from "@/service/orders"
// css
import styles from "./index.module.less"

// main
const Orders = () => {
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
  const getData = async () => {
    dispatch(toggleLoading(true))
    const data = await getAllShippingHistory({
      date: orderState.date
    })
    dispatch(toggleLoading(false))
    setOrderData(data.Items)
  }
  const showDetail = async (id) => {
    if (id != drawerDetailInfo.id) {
      const { Item } = await getOrder(id)
      setDrawerDetailInfo({
        show: true,
        id,
        info: Item
      })
    } else {
      setDrawerDetailInfo({
        ...drawerDetailInfo,
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
      title: "DESTINATION",
      render: (_, record) => record.customerInfo.address1
    },
    {
      title: "SHIP DATE",
      render: (_, record) => ISOStringToReadableDate(record.created)
    },
    {
      title: "ORDER DATE",
      render: (_, record) => ISOStringToReadableDate(record.created)
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
          setDrawerDetailInfo({
            show: false
          })
        }
        open={drawerDetailInfo.show}
        key="detail"
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
