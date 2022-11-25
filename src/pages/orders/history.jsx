import { withRouter } from "next/router"
// components
import { Flex, Tab, Tabs, Wrapper } from "@/components/commons"
import { SearchOutlined } from "@ant-design/icons"
import { Input } from "antd"
import OrdersHistory from "@/sections/orders/orders-history"
// css
import styles from "./index.module.less"

// main
const Orders = ({ router }) => {
  return (
    <Wrapper
      styles={{ "min-height": "100%", position: "relative" }}
      height="auto"
      padding="21px 29px"
    >
      <Flex styles={{ "flex-wrap": "nowrap" }} justifyContent="space-between">
        <Tabs>
          <Tab onClick={() => router.push("/orders")} idx={0}>
            Current Orders
          </Tab>
          <Tab active={true} idx={1}>
            Order History
          </Tab>
        </Tabs>
        <Input
          type="text"
          className={styles.searchInput}
          placeholder="Order no,Customer"
          prefix={<SearchOutlined />}
          onPressEnter={(e) =>
            router.push(`/orders/search-history?search=${e.target.value}`)
          }
        />
      </Flex>
      <OrdersHistory />
    </Wrapper>
  )
}

export default withRouter(Orders)
