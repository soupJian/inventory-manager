// react next -----------
import React, { useState } from "react"
// componnets ------------
import {
  Row,
  Col,
  Button,
  Dropdown,
  Space,
  Divider,
  Modal,
  Select,
  Drawer
} from "antd"
import { Icon } from "../../../components/commons"
import { DeleteOutlined, DownOutlined } from "@ant-design/icons"
import CreateDealForm from "./create-deal-form"
// CSS -------------
import styles from "./index.module.less"
// js static------------
const { Option } = Select

// main ---------------
const FromEmailDetail = ({ email, handleDeleteEmail }) => {
  // delete 的弹窗
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  // assign 的弹窗
  const [showAssignModal, setShowAssignModal] = useState(false)
  // assign list
  const [assignList, setAssignList] = useState([])
  // assgin value
  const [assignValue, setAssignValue] = useState("")
  // assign的类型
  const [assignType, setAssignType] = useState("")
  // create 的类型 deal ticket
  const [createType, setCreateType] = useState("")
  // create Deal 的 弹窗
  const [showDealDrawer, setShowDealDrawer] = useState(false)
  // 选择 create 的 下拉框 Deal 或者 Tickets
  const chooseCreateMenu = (key) => {
    // 创建一个 deal 或者 ticket
    setCreateType(key)
    setShowDealDrawer(true)
  }
  // 选择 assign 的 下拉框 Deal 或者 Tickets
  const chooseAssignMenu = (key) => {
    setAssignType(key)
    setShowAssignModal(true)
  }
  // 搜素输入框的 assign
  const handleSearchAssign = (newValue) => {
    if (newValue) {
      // 输入数值，调用接口搜索 注意防抖
      console.log(newValue)
      // fetch(newValue)
    } else {
      setAssignList([])
    }
  }
  // 点击 search assign 的 option
  const handleChangeAssign = (newValue) => {
    setValue(newValue)
  }
  // assign 的 下拉框
  const assignMenu = [
    {
      label: (
        <span
          onClick={() => {
            chooseAssignMenu("deal")
          }}
        >
          Deal
        </span>
      ),
      key: "deal"
    },
    {
      label: (
        <span
          onClick={() => {
            chooseAssignMenu("ticket")
          }}
        >
          Ticket
        </span>
      ),
      key: "ticket"
    }
  ]
  // create 的 下拉框
  const createMenu = [
    {
      label: (
        <span
          onClick={() => {
            chooseCreateMenu("deal")
          }}
        >
          Deal
        </span>
      ),
      key: "deal"
    },
    {
      label: (
        <span
          onClick={() => {
            chooseCreateMenu("ticket")
          }}
        >
          Ticket
        </span>
      ),
      key: "ticket"
    }
  ]
  return (
    <>
      {email && (
        <div className={styles.detail}>
          {/*  头部按钮区域 */}
          <Row justify="space-between">
            <Col>
              <Button
                icon={<DeleteOutlined />}
                className={styles.deleteBtn}
                onClick={() => {
                  if (!email) return
                  setShowDeleteModal(true)
                }}
              >
                Delete
              </Button>
            </Col>
            <Col>
              <Space>
                <Dropdown menu={{ items: assignMenu }}>
                  <Button>
                    Assign <DownOutlined />
                  </Button>
                </Dropdown>
                {/* <Button onClick={() => setShowAssignModal(true)}>
                  Assign <DownOutlined />
                </Button> */}
                <Dropdown menu={{ items: createMenu }}>
                  <Button className={styles.createBtn}>
                    Create <DownOutlined />
                  </Button>
                </Dropdown>
              </Space>
            </Col>
          </Row>
          {/* 邮件标题 */}
          <div className={styles["email-title-wrap"]}>
            <div className={styles["email-title"]}>{email.title}</div>
            <div className={styles["email-address-time"]}>{email.email}</div>
          </div>
          {/* 消息通知 */}
          <Row className={styles.notice} align="middle" gutter={5}>
            <Col>
              <Icon name="notification" width="20px" height="20px" />
            </Col>
            <Col>The sender exists in an open deal. Notify the owner</Col>
          </Row>
          <Divider />
          {/* 邮件正文 区分 网站邮箱 和 客户邮箱 */}
          {email.genre == "mockup" && (
            <div className={styles["email-content"]}>
              <div className={styles.color}>Name</div>
              <div>{email.fullName}</div>
              <div className={styles.color}>Company name</div>
              <div>{email.companyName}</div>
              <div className={styles.color}>Phone</div>
              <div>{email.phone}</div>
              <div className={styles.color}>Email</div>
              <div>{email.email}</div>
              <div className={styles.color}>Interest</div>
              <div>{email.interest}</div>
              <div className={styles.color}>Budget</div>
              <div>{email.budget}</div>
              <div className={styles.color}>Logo</div>
              <div>
                <a
                  href={email.logo}
                  rel="nofollow noreferrer"
                  target="_blank"
                  style={{ color: "#2C88DD" }}
                >
                  This is the Link
                </a>
              </div>
              <div className={styles.color}>Get a $200 voucher</div>
              <div>{email.voucher}</div>
            </div>
          )}
          {email.genre != "genre" && <div>{email.content}</div>}
          {/* delete modal */}
          <Modal
            centered
            open={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            closable={false}
            bodyStyle={{ textAlign: "center" }}
            footer={[
              <Row key="footer" justify="center">
                <Col>
                  <Button
                    key="confirm"
                    onClick={() => {
                      handleDeleteEmail(email)
                      setShowDeleteModal(false)
                    }}
                    style={{
                      background: "#000000",
                      color: "#ffffff",
                      width: "120px"
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    key="cancel"
                    onClick={() => setShowDeleteModal(false)}
                    style={{
                      background: "#ffffff",
                      color: "#000000",
                      width: "120px"
                    }}
                  >
                    No
                  </Button>
                </Col>
              </Row>
            ]}
          >
            <div className={styles.modalText}>
              Are you sure you want to delete this email?
            </div>
          </Modal>
          {/* assign modal */}
          <Modal
            centered
            open={showAssignModal}
            title={
              assignType == "deal"
                ? "Assign to an existing deal"
                : "Assign to an existing ticket"
            }
            onCancel={() => setShowAssignModal(false)}
            footer={[
              <Row key="footer" justify="center">
                <Col span={24}>
                  <Button disabled={assignValue == ""}> assign</Button>
                </Col>
              </Row>
            ]}
          >
            <Row>
              <Col
                span={24}
                style={{ fontWeight: "500", marginBottom: "10px" }}
              >
                {assignType == "deal"
                  ? "CONTACT NAME/DEAL NAME"
                  : "CONTACT CONTACT/TICKET NAME"}
              </Col>
              <Col span={24}>
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  showSearch
                  value={assignValue}
                  placeholder="Type and select"
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={handleSearchAssign}
                  onChange={handleChangeAssign}
                  notFoundContent={null}
                >
                  {assignList.map((d) => (
                    <Option key={d.value}>{d.text}</Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Modal>
          {/* create deal | ticket */}
          <Drawer
            title="Create a deal"
            placement="left"
            closable={false}
            onClose={() => setShowDealDrawer(false)}
            open={showDealDrawer}
            key={"left"}
            width={616}
          >
            <CreateDealForm createType={createType} />
          </Drawer>
        </div>
      )}
    </>
  )
}

export default FromEmailDetail
