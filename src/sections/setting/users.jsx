import React, { useState, useEffect } from 'react'
import { Row, Col, Select, Input, Button, Modal } from 'antd'
import UserModule from './components/users-user'
import UserAccess from './components/user-access'
import styles from './users.module.scss'

const { Option } = Select

const Users = () => {
  const [headerSelect, setHeaderSelect] = useState('Users')
  const [userList, setUserList] = useState([])
  // 导出 modal
  const [showExportModal, setShowExportModal] = useState(false)

  // 下载
  const download = () => {
    if (headerSelect == 'Contact') {
      console.log(filterData)
    }
  }
  useEffect(() => {
    const list = [
      {
        key: '1',
        fullName: '汤建',
        role: 'Customer Service',
        access: 'Admin',
        email: 'soupjian@163',
        addedOn: '2022/09/01'
      }
    ]
    setUserList(list)
  }, [])
  return (
    <div className={styles.assets}>
      {/* header-search */}
      <Row justify="space-between" className={styles['header-select']}>
        <Col>
          <Row align="middle" gutter={10}>
            <Col className={styles.selectText}>Select</Col>
            <Col>
              <Select
                className={styles.selectWrap}
                value={headerSelect}
                style={{
                  width: 200
                }}
                onChange={(value) => setHeaderSelect(value)}
              >
                <Option value="Users">Users</Option>
                <Option value="Access">Access</Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col>
          <Button
            className={styles.exportBtn}
            onClick={() => setShowExportModal(true)}
          >
            Create user
          </Button>
        </Col>
      </Row>
      {/* container */}
      <div className={styles.container}>
        {headerSelect == 'Users' && <UserModule data={userList} />}
        {headerSelect == 'Access' && <UserAccess />}
      </div>
      {/* modal 这里制作全局的导出，哥哥 select 模块 导出在其对应模块*/}
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

export default Users
