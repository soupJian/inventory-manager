import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Select, Space } from "antd"
// js
import { dateList } from "@/constants/pageConstants/shipping"
import { toggleLoading } from "@/store/slices/globalSlice"
// api
import { getAllShippingOrders } from "@/service/orders"
// css
import styles from "./index.module.less"
import ShippingCurrentTable from "./components/shipping-current-table"

const ShippingOrders = () => {
  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({
    date: ""
  })
  const [orderData, setOrderData] = useState([])

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
      <ShippingCurrentTable orderData={orderData} />
    </>
  )
}

export default ShippingOrders
