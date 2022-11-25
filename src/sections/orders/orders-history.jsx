import { withRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
// components
import { Select, Space } from "antd"
import HistoryOrderContainer from "./components/history-order-table"
// js
import { dateList, sortByList } from "@/constants/pageConstants/shipping"
import { toggleLoading } from "@/store/slices/globalSlice"
// api
import { getAllOrderHistory } from "@/service/orders"
// css
import styles from "./index.module.less"

const Orders = () => {
  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({
    sortBy: "asc",
    date: ""
  })
  const [orderData, setOrderData] = useState([])
  const getData = async () => {
    try {
      dispatch(toggleLoading(true))
      const data = await getAllOrderHistory({
        date: orderState.date,
        order: orderState.sortBy
      })
      setOrderData(data.Items)
      dispatch(toggleLoading(false))
    } catch (err) {
      dispatch(toggleLoading(false))
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderState.date, orderState.sortBy])

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
            value={orderData.date}
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
            value={orderData.sortBy}
            options={sortByList}
          />
        </Space>
      </div>
      <HistoryOrderContainer orderData={orderData} />
    </>
  )
}

export default withRouter(Orders)
