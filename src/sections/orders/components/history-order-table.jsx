import React, { useState } from "react"
// componnets
import { Button, Table, Drawer } from "antd"
import DrawerOrder from "./drawer-order"
// js
import { ISOStringToReadableDate } from "@/utils/utils"
import { formatMoney } from "@/utils/formatMoney"
// css
import styles from "../index.module.less"

const HistoryOrderContainer = ({ orderData }) => {
  const [drawerInfo, setDrawerInfo] = useState({
    show: false,
    info: null
  })
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
      title: "PAYMENT",
      render: (_, record) => `$${formatMoney(Number(record.totalAmount))}`
    },
    {
      title: "ORDER DATE",
      render: (_, record) => ISOStringToReadableDate(record.created)
    },
    {
      title: "COMPLETED ON",
      render: (_, record) => ISOStringToReadableDate(record.created)
    },
    {
      title: "",
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.Btn}
          onClick={() =>
            setDrawerInfo({
              show: true,
              info: record
            })
          }
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
          setDrawerInfo({
            ...drawerInfo,
            show: false
          })
        }
        open={drawerInfo.show}
        key="2"
        width={700}
        className={styles.drawerWrap}
      >
        {drawerInfo.info && (
          <DrawerOrder type="history" info={drawerInfo.info} />
        )}
      </Drawer>
    </>
  )
}

export default HistoryOrderContainer
