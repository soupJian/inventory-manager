import { useState } from "react"
import dynamic from "next/dynamic"
// components
import { Button, Drawer, Table } from "antd"
const DrawerDetailHistory = dynamic(() => import("./drawer-detail-history"))
// api
import { getOrder } from "@/service/orders"
// js
import { ISOStringToReadableDate } from "@/utils/utils"
// css
import styles from "../index.module.less"

const ShippingHistoryTable = ({ orderData }) => {
  const [drawerDetailInfo, setDrawerDetailInfo] = useState({
    show: false,
    id: null, // 根据 id 变化，设置对应的 info 信息
    info: null
  })
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
  return (
    <>
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

export default ShippingHistoryTable
