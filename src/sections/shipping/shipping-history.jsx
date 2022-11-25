import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
// components
import { Select, Space } from "antd"

// js
import { dateList } from "@/constants/pageConstants/shipping"
import { toggleLoading } from "@/store/slices/globalSlice"
// api
import { getAllShippingHistory } from "@/service/orders"
// css
import styles from "./index.module.less"
import ShippingHistoryTable from "./components/shipping-history-table"

// main
const Orders = () => {
  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({
    date: ""
  })
  const [orderData, setOrderData] = useState([])

  const getData = async () => {
    dispatch(toggleLoading(true))
    const data = await getAllShippingHistory({
      date: orderState.date
    })
    dispatch(toggleLoading(false))
    setOrderData(data.Items)
  }

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
      <ShippingHistoryTable orderData={orderData} />
    </>
  )
}

export default Orders
