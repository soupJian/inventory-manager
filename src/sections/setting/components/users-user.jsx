import React, { useState } from 'react'
import { Table, Row, Col, Button, Modal, Space } from 'antd'
import { Icon } from '../../../components/commons'
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
  // 导出 modal
  const [showExportModal, setShowExportModal] = useState(false)
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
  const handleDeactivate = () => {
    console.log(selectedRowKeys)
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
      dataIndex: 'access'
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
        <Button size="small">
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
            <Button onClick={() => handleDeactivate()}>
              <Space>
                <Icon name="user-deactivate" width="22px" height="22px" />
                Export
              </Space>
            </Button>
          </Col>
        </Row>
      )}
      <Modal
        title=""
        visible={showExportModal}
        okText="Save"
        footer={false}
        // onOK={() => ()}
        onCancel={() => setShowExportModal(false)}
        wrapClassName={styles.modal}
      >
        <div className={styles.modalTitle}>Export to a file</div>
        <div className={styles.modalSubTitle}>
          The exported file will be emailed to the address you provide.
        </div>
        <div className={styles.fileFormat}>file format</div>
        <div className={styles.filewrap}>XLSX</div>
        <Row justify="end">
          <Col>
            <Button className={styles.exportBtn} onClick={() => download()}>
              Download
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default UserModule
