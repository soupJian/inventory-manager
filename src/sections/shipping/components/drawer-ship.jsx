import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
// components
import {
  Select,
  Row,
  Col,
  Input,
  Space,
  Checkbox,
  Button,
  Divider,
  Modal,
  Form
} from "antd"
// api
import { updateOrder } from "@/service/orders"
// js
import { toggleFullLoading } from "@/store/slices/globalSlice"
// css
import styles from "../index.module.less"
import { STATE } from "@/constants/pageConstants/shipping"

// main
const DrawerShip = ({ info }) => {
  console.log(info)
  const [showAddressModal, setShowAddAddressModal] = useState(false)
  const handleSelectAddress = (value) => {
    console.log(`selected ${value}`)
  }
  const addFormFinish = (values) => {
    console.log(values)
  }
  return (
    <>
      <div className={styles.drawerShip}>
        <div className={styles.headerWrap} gutter={[0, 16]}>
          <div
            span={24}
            className={styles.orderTitle}
          >{`Shipping Order #WS${info.id}`}</div>
        </div>
        <div className={styles.title}>SHIP FROM</div>
        <Select
          size="large"
          className={styles.selectWrap}
          onChange={handleSelectAddress}
          options={[]}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: "8px 0"
                }}
              />
              <div
                className={styles.addText}
                onClick={() => setShowAddAddressModal(true)}
              >
                Add new address
              </div>
            </>
          )}
        />
        <div className={styles.title}>SHIP TO</div>
        <div className={styles.customerInfo}>
          <div className={styles.name}>{info.customerInfo.fullName}</div>
          <div>{info.customerInfo.address1}</div>
          {info.customerInfo.address2 && (
            <div>{info.customerInfo.address2}</div>
          )}
          <div>
            {info.customerInfo.city}, {info.customerInfo.state}{" "}
            {info.customerInfo.zipcode}
          </div>
          <div>{info.customerInfo.phone}</div>
          <div className={styles.addressDes}>This is a residential address</div>
        </div>
        <div className={styles.title}>PACKING LIST</div>
      </div>
      <Modal
        title="Add New Address"
        open={showAddressModal}
        footer={null}
        centered
        destroyOnClose
        width="632px"
        onCancel={() => setShowAddAddressModal(false)}
      >
        <Form
          size="large"
          onFinish={addFormFinish}
          validateMessages={{
            required: "Required"
          }}
          className={styles.formWrap}
        >
          <Form.Item
            name="addressName"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Address Name/Contact Name" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input prefix="+1" placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="address1"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Address line 1" />
          </Form.Item>
          <Form.Item
            name="address2"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Address line 2" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="state"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Select options={STATE} placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="zipcode"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input placeholder="Zip code" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default DrawerShip
