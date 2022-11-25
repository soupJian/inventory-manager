import { withRouter } from "next/router"
// components
import { Flex, Tab, Tabs, Wrapper } from "@/components/commons"
import { SearchOutlined } from "@ant-design/icons"
import { Input } from "antd"
import CurrentOrder from "@/sections/orders/current-order"
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
          <Tab active={true} idx={0}>
            Current Orders
          </Tab>
          <Tab idx={1} onClick={() => router.push("/orders/history")}>
            Order History
          </Tab>
        </Tabs>
        <Input
          type="text"
          className={styles.searchInput}
          placeholder="Order no,Customer"
          prefix={<SearchOutlined />}
          onPressEnter={(e) =>
            router.push(`/orders/search-order?search=${e.target.value}`)
          }
        />
      </Flex>
      <CurrentOrder />
    </Wrapper>
  )
}

export default withRouter(Orders)
