import { withRouter } from "next/router"
// components
import { Flex, Tab, Tabs, Wrapper } from "@/components/commons"
import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import ShippingHistory from "@/sections/shipping/shipping-history"
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
          <Tab onClick={() => router.push("/shipping")} idx={0}>
            Shipping Orders
          </Tab>
          <Tab active={true} idx={1}>
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
      <ShippingHistory />
    </Wrapper>
  )
}

export default withRouter(Shipping)
