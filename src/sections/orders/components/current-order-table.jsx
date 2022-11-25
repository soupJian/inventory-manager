import React, { useState } from "react"
// components
import { Button, Table, Select, Space, Modal, Drawer } from "antd"
import ModalShipping from "./modal-shipping"
import DrawerOrder from "./drawer-order"
// api
import { getOrder } from "@/service/orders"

// js
import { ISOStringToReadableDate } from "@/utils/utils"
import { formatMoney } from "@/utils/formatMoney"
// css
import styles from "../index.module.less"

const CurrentOrderContainer = ({ orderData, getData }) => {
  const [shippingModal, setShippingModal] = useState({
    show: false,
    id: null,
    info: null
  })
  const [drawerInfo, setDrawerInfo] = useState({
    show: false,
    id: null,
    info: null
  })
  // detail
  const showDetail = async (id) => {
    if (id != drawerInfo.id) {
      const { Item } = await getOrder(id)
      setDrawerInfo({
        show: true,
        id,
        info: Item
      })
    } else {
      setDrawerInfo({
        ...drawerInfo,
        show: true
      })
    }
  }
  // status为shipped时候，点击查看详情
  const showShipped = async (id) => {
    if (id != shippingModal.id) {
      const { Item } = await getOrder(id)
      setShippingModal({
        show: true,
        id,
        info: Item
      })
    } else {
      setShippingModal({
        ...drawerInfo,
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
      title: "PAYMENT",
      render: (_, record) => `$${formatMoney(Number(record.totalAmount))}`
    },
    {
      title: "ORDER DATE",
      render: (_, record) => ISOStringToReadableDate(record.created)
    },
    {
      title: "Status",
      render: (_, record) => {
        return (
          <>
            {record.packageInfo.length > 0 ? (
              <span
                className={styles.activeText}
                onClick={() => showShipped(record.id)}
              >
                Shipped
              </span>
            ) : (
              "Processing"
            )}
          </>
        )
      }
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
      <Modal
        open={shippingModal.show}
        footer={null}
        centered
        title="Shipping status"
        onCancel={() =>
          setShippingModal({
            show: false
          })
        }
      >
        {shippingModal.info && <ModalShipping info={shippingModal.info} />}
      </Modal>
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
        key="detail"
        width={700}
        className={styles.drawerWrap}
      >
        {drawerInfo.info && (
          <DrawerOrder
            type="current"
            info={drawerInfo.info}
            deleteOrderFinish={() => {
              getData()
              setDrawerInfo({
                show: false,
                id: null,
                info: null
              })
            }}
          />
        )}
      </Drawer>
    </>
  )
}

export default CurrentOrderContainer
