import { withRouter } from "next/router"
// components
import { Flex, Tab, Tabs, Wrapper } from "@/components/commons"
import { SearchOutlined } from "@ant-design/icons"
import { Input } from "antd"
import ShippingOrder from "@/sections/shipping/shipping-order"
// css
import styles from "./index.module.less"
// main
const Shipping = ({ router }) => {
  return (
    <Wrapper
      styles={{ "min-height": "100%", position: "relative" }}
      height="auto"
      padding="21px 29px"
    >
      <Flex styles={{ "flex-wrap": "nowrap" }} justifyContent="space-between">
        <Tabs>
          <Tab active={true} idx={0}>
            Shipping Orders
          </Tab>
          <Tab onClick={() => router.push("/shipping/history")} idx={1}>
            Shipping History
          </Tab>
        </Tabs>
        <Input
          type="text"
          className={styles.searchInput}
          placeholder="Order no,Customer"
          prefix={<SearchOutlined />}
          onPressEnter={(e) =>
            router.push(`/shipping/search-history?search=${e.target.value}`)
          }
        />
      </Flex>
      <ShippingOrder />
    </Wrapper>
  )
}

export default withRouter(Shipping)
