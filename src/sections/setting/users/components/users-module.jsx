import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Table, Row, Col, Button, Modal, Space, Popover, Radio } from 'antd'
import { Icon } from '../../../../components/commons'
import UserCreateEdit from './user-create-edit'
import { CloseOutlined } from '@ant-design/icons'
import styles from '../index.module.scss'

const UserModule = ({ data, showAccessDetail, accessList, loading }) => {
  const [showSelectedView, setShowSelectedView] = useState(false)
  // 选择的表格数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // deactivate modal
  const [modalInfo, setModalInfo] = useState({
    show: false,
    type: 'group' // 点击右小角按钮 是 group  表格单行 是 single
  })
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
    console.log(modalInfo)
    // setSho
  }
  const changeUserAccess = (e, record) => {
    console.log(e.target.value)
    console.log(record)
  }
  const DropMenu = ({ value, changeUserAccess, accessList }) => {
    return (
      <Radio.Group value={value}>
        <Space direction="vertical" onChange={changeUserAccess}>
          {accessList.map((item) => {
            return (
              <Row key={item.id}>
                <Col span={3}>
                  <Radio value={item.id}></Radio>
                </Col>
                <Col span={21} className={styles.title}>
                  <Space>
                    {item.accessName}
                    {item.accessName != 'Super Admin' && (
                      <a
                        className={styles.link}
                        onClick={() => showAccessDetail(item.access)}
                      >
                        Details
                      </a>
                    )}
                  </Space>
                </Col>
                <Col span={21} offset={3} className={styles.subTitle}>
                  {item.description}
                </Col>
              </Row>
            )
          })}
        </Space>
      </Radio.Group>
    )
  }
  // menu table 的 columns
  const columns = (accessList) => {
    return [
      {
        title: 'FULL NAME',
        dataIndex: 'fullName'
      },
      {
        title: 'ROLE',
        dataIndex: 'userRole'
      },
      {
        title: 'ACCESS',
        dataIndex: 'access',
        render: (_, record) => {
          return (
            <Popover
              placement="bottom"
              content={
                <DropMenu
                  accessList={accessList}
                  value={record.access}
                  changeUserAccess={(e) => changeUserAccess(e, record)}
                />
              }
              overlayClassName={styles.dropDownItem}
            >
              <Space style={{ cursor: 'pointer' }}>
                <div style={{ minWidth: '100px' }}>
                  {record.accessInfo.accessName}
                </div>
                <DownOutlined />
              </Space>
            </Popover>
          )
        }
      },
      {
        title: 'EMAIL',
        dataIndex: 'email'
      },
      {
        title: 'ADDED ON',
        dataIndex: 'created'
      },
      {
        title: '',
        render: (_, record) => (
          <>
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
            {record.status == 0 && (
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setModalInfo({
                    ...modalInfo,
                    type: 'single',
                    show: true
                  })
                }}
              >
                deactivate
              </Button>
            )}
            {record.status == 1 && (
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setModalInfo({
                    ...modalInfo,
                    type: 'single',
                    show: true
                  })
                }}
              >
                activate
              </Button>
            )}
          </>
        )
      }
    ]
  }

  return (
    <div className={styles.tableWrap}>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }}
        columns={columns(accessList)}
        dataSource={data}
        pagination={{
          showTotal: (total) => `Showing ${total} of ${data.length} deals`
        }}
        rowKey="id"
        loading={loading}
      />
      {showSelectedView && selectedRowKeys.length > 0 && (
        <Row className={styles.view} align="middle" justify="space-between">
          <Col>
            <span onClick={clearSelect} style={{ cursor: 'pointer' }}>
              <CloseOutlined />
            </span>
            <span className={styles.num}>
              {selectedRowKeys.length} users selected
            </span>
          </Col>
          <Col>
            <Button
              onClick={() => {
                setModalInfo({
                  ...modalInfo,
                  show: true,
                  type: 'group'
                })
              }}
            >
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
        visible={modalInfo.show}
        okText="Save"
        footer={false}
        // onOK={() => ()}
        onCancel={() =>
          setModalInfo({
            ...modalInfo,
            show: false
          })
        }
        wrapClassName={styles.modal}
      >
        <div className={styles.modalSubTitle}>
          Are you sure you want to deactivate{' '}
          {`${modalInfo.type == 'group' ? 'these' : 'this'}`} users?
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
                onClick={() =>
                  setModalInfo({
                    ...modalInfo,
                    show: false
                  })
                }
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
        <UserCreateEdit
          type="edit"
          modalInfo={editModalInfo}
          accessList={accessList}
        />
      </Modal>
    </div>
  )
}

export default React.memo(UserModule)
