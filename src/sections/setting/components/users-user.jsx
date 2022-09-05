import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import {
  Table,
  Row,
  Col,
  Button,
  Modal,
  Space,
  Dropdown,
  Menu,
  Radio
} from 'antd'
import { Icon } from '../../../components/commons'
import UserCreateEdit from './user-create-edit'
import { CloseOutlined } from '@ant-design/icons'
import styles from '../users.module.scss'
import 'antd/lib/dropdown/style/index.css'
import 'antd/lib/pagination/style/index.css'
import 'antd/lib/checkbox/style/index.css'
import 'antd/lib/input/style/index.css'
import 'antd/lib/button/style/index.css'
import 'antd/lib/checkbox/style/index.css'

const UserModule = ({ data }) => {
  const [showSelectedView, setShowSelectedView] = useState(false)
  // 选择的表格数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // deactivate modal
  const [showDeactiveModal, setShowDeactivateModal] = useState(false)
  // edit modal
  const [showEditModal, setShowEditModal] = useState(false)
  const [editModalInfo, setEditModalInfo] = useState(null)
  // 表格选择 select Change
  const onSelectChange = (newSelectedRowKeys) => {
    // 对应的 key 数组 [1,2,3,4,6] 也就是对应的 id数组
    console.log(newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
    // 如果选中 数目 > 0 展示 view
    if (newSelectedRowKeys.length > 0) {
      setShowSelectedView(true)
    }
  }
  // 清除已选择
  const clearSelect = () => {
    setSelectedRowKeys([])
    setShowSelectedView(false)
  }
  // deactivate
  const handleDeactivate = () => {
    console.log(selectedRowKeys)
  }
  const changeUserAccess = (e, record) => {
    console.log(e.target.value)
    console.log(record)
  }
  const DropMenu = ({ value, changeUserAccess }) => {
    return (
      <Menu
        items={[
          {
            key: '1',
            label: (
              <Radio.Group value={value}>
                <Space direction="vertical" onChange={changeUserAccess}>
                  <Row>
                    <Col span={2}>
                      <Radio value="Super Admin"></Radio>
                    </Col>
                    <Col className={styles.title}>Super admin</Col>
                    <Col span={22} offset={2} className={styles.subTitle}>
                      Access to all data, can read and edit all data
                    </Col>
                  </Row>
                  <Row>
                    <Col span={2}>
                      <Radio value="Admin"></Radio>
                    </Col>
                    <Col className={styles.title}>
                      <Space>
                        Admin <a>Details</a>
                      </Space>
                    </Col>
                    <Col span={22} offset={2} className={styles.subTitle}>
                      Access to all data, can read and edit except for super
                      admin
                    </Col>
                  </Row>
                  <Row>
                    <Col span={2}>
                      <Radio value="Viewer"></Radio>
                    </Col>
                    <Col className={styles.title}>
                      <Space>
                        Admin <a>Details</a>
                      </Space>
                    </Col>
                    <Col span={22} offset={2} className={styles.subTitle}>
                      Can read but not edit data
                    </Col>
                  </Row>
                </Space>
              </Radio.Group>
            )
          }
        ]}
      />
    )
  }
  // menu table 的 columns
  const columns = [
    {
      title: 'FULL NAME',
      dataIndex: 'fullName'
    },
    {
      title: 'ROLE',
      dataIndex: 'role'
    },
    {
      title: 'ACCESS',
      dataIndex: 'access',
      render: (_, record) => {
        return (
          <Dropdown
            overlay={
              <DropMenu
                value={record.access}
                changeUserAccess={(e) => changeUserAccess(e, record)}
              />
            }
            overlayClassName={styles.dropDownItem}
          >
            <Space style={{ cursor: 'pointer' }}>
              {record.access}
              <DownOutlined />
            </Space>
          </Dropdown>
        )
      }
    },
    {
      title: 'EMAIL',
      dataIndex: 'email'
    },
    {
      title: 'ADDED ON',
      dataIndex: 'addedOn'
    },
    {
      title: '',
      render: (_, record) => (
        <Button
          size="small"
          onClick={() => {
            setEditModalInfo(record)
            setShowEditModal(true)
          }}
        >
          <Space>
            <Icon name="edit" width="11px" height="11px"></Icon>
            Edit
          </Space>
        </Button>
      )
    }
  ]

  return (
    <div className={styles.tableWrap}>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }}
        columns={columns}
        dataSource={data}
        pagination={{
          showTotal: (total) => `Showing ${total} of ${data.length} deals`
        }}
      />
      {showSelectedView && selectedRowKeys.length > 0 && (
        <Row className={styles.view} align="middle" justify="space-between">
          <Col>
            <span onClick={clearSelect} style={{ cursor: 'pointer' }}>
              <CloseOutlined />
            </span>
            <span className={styles.num}>
              {selectedRowKeys.length} items selected
            </span>
          </Col>
          <Col>
            <Button onClick={setShowDeactivateModal}>
              <Space>
                <Icon name="user-deactivate" width="22px" height="22px" />
                Deactivate
              </Space>
            </Button>
          </Col>
        </Row>
      )}
      <Modal
        title=""
        visible={showDeactiveModal}
        okText="Save"
        footer={false}
        // onOK={() => ()}
        onCancel={() => setShowDeactivateModal(false)}
        wrapClassName={styles.modal}
      >
        <div className={styles.modalSubTitle}>
          Are you sure you want to deactivate these users?
        </div>
        <Row justify="center">
          <Col>
            <Space>
              <Button
                className={styles.confirmBtn}
                onClick={() => handleDeactivate()}
              >
                YES
              </Button>
              <Button
                className={styles.cancelBtn}
                onClick={() => setShowDeactivateModal(false)}
              >
                NO
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
      <Modal
        title=""
        visible={showEditModal}
        footer={false}
        onCancel={() => setShowEditModal(false)}
        wrapClassName={styles.modal}
        destroyOnClose
      >
        <UserCreateEdit type="edit" modalInfo={editModalInfo} />
      </Modal>
    </div>
  )
}

export default UserModule
