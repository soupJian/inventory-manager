// react next -----------
import React, { useState } from 'react'
// antd -------------
import {
  Row,
  Col,
  Button,
  Dropdown,
  Space,
  Menu,
  Divider,
  Modal,
  Select,
  Drawer
} from 'antd'
import { DeleteOutlined, DownOutlined, BellFilled } from '@ant-design/icons'
// componnets ------------
import CreateDealForm from './create-deal-form'
// CSS -------------
import styles from './index.module.scss'

// js static------------
const { Option } = Select
const ourEmail = 'inquiry@westshade.com'

// default render ---------------
const FromEmailDetail = (props) => {
  const { email, handleDeleteEmail } = props
  // delete 的弹窗
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  // assign 的弹窗
  const [showAssignModal, setShowAssignModal] = useState(false)
  // assign list
  const [assignList, setAssignList] = useState([])
  // assgin value
  const [assignValue, setAssignValue] = useState('')
  // create Deal 的 弹窗
  const [showDealDrawer, setShowDealDrawer] = useState(false)
  // 选择 create 的 下拉框 Deal 或者 Tickets
  const chooseCreateMenu = (e) => {
    const key = e.key
    if (key == 'Deal') {
      // 创建一个 Deal
      setShowDealDrawer(true)
    }
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

  // create 的 下拉框
  const createMenu = (
    <Menu
      onClick={chooseCreateMenu}
      items={[
        {
          label: 'Deal',
          key: 'Deal'
        },
        {
          label: 'Ticket',
          key: 'Ticket'
        }
      ]}
    />
  )
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
                <Button onClick={() => setShowAssignModal(true)}>
                  Assign <DownOutlined />
                </Button>
                <Dropdown overlay={createMenu}>
                  <Button className={styles.createBtn}>
                    Create <DownOutlined />
                  </Button>
                </Dropdown>
              </Space>
            </Col>
          </Row>
          {/* 邮件标题 */}
          <div className={styles['email-title-wrap']}>
            <div className={styles['email-title']}>{email.title}</div>
            <div className={styles['email-address-time']}>
              {email.emailAddress}
            </div>
          </div>
          {/* 消息通知 */}
          <Row className={styles.notice}>
            <Col span={24}>
              <BellFilled /> The sender exists in an open deal. Notify the owner
            </Col>
          </Row>
          <Divider />
          {/* 邮件正文 区分 网站邮箱 和 客户邮箱 */}
          {email.emailAddress == ourEmail && (
            <div className={styles['email-content']}>
              <div className={styles.color}>Name</div>
              <div>Joshua Raphiel</div>
              <div className={styles.color}>Company name</div>
              <div>Canyon Restaurant</div>
              <div className={styles.color}>Phone</div>
              <div>318-322-8734</div>
              <div className={styles.color}>Email</div>
              <div>joshuaraphiel@gmail.com</div>
              <div className={styles.color}>Interest</div>
              <div>Canopy tent</div>
              <div className={styles.color}>Budget</div>
              <div>$401 - $999</div>
              <div className={styles.color}>Logo</div>
              <div>
                <a>This is the Link</a>
              </div>
              <div className={styles.color}>Get a $200 voucher</div>
              <div>True</div>
            </div>
          )}
          {email.emailAddress != ourEmail && <div>{email.content}</div>}
          {/* delete modal */}
          <Modal
            visible={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            closable={false}
            bodyStyle={{ textAlign: 'center' }}
            footer={[
              <Row key="footer" justify="center">
                <Col>
                  <Button
                    key="confirm"
                    onClick={() => {
                      handleDeleteEmail()
                      setShowDeleteModal(false)
                    }}
                    style={{
                      background: '#000000',
                      color: '#ffffff',
                      width: '120px'
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    key="cancel"
                    onClick={() => setShowDeleteModal(false)}
                    style={{
                      background: '#ffffff',
                      color: '#000000',
                      width: '120px'
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
            visible={showAssignModal}
            title="Assign to an existing deal"
            onCancel={() => setShowAssignModal(false)}
            footer={[
              <Row key="footer" justify="center">
                <Col span={24}>
                  <Button disabled={assignValue == ''}> assign</Button>
                </Col>
              </Row>
            ]}
          >
            <Row>
              <Col
                span={24}
                style={{ fontWeight: '500', marginBottom: '10px' }}
              >
                contact name/deal Name
              </Col>
              <Col span={24}>
                <Select
                  style={{ width: '100%' }}
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
          <Drawer
            title="Create a deal"
            placement="left"
            closable={false}
            onClose={() => setShowDealDrawer(false)}
            visible={showDealDrawer}
            key={'left'}
          >
            <CreateDealForm />
          </Drawer>
        </div>
      )}
    </>
  )
}

export default FromEmailDetail
