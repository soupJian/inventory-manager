import React, { useState, useEffect } from 'react'
import { Row, Col, Select, Input, Button, Modal } from 'antd'
import UserModule from './components/users-user'
import UserAccess from './components/user-access'
import UserCreateEdit from './components/user-create-edit'
import styles from './users.module.scss'

const { Option } = Select

const Users = () => {
  const [headerSelect, setHeaderSelect] = useState('Users')
  const [userList, setUserList] = useState([])
  // create user  modal
  const [showCreateUserModal, setShowCreateUser] = useState(false)

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
      },
      {
        key: '2',
        fullName: 'soupjian',
        role: 'Vierer',
        access: 'Super Admin',
        email: 'soupjian@163',
        addedOn: '2022/09/01'
      }
    ]
    setUserList(list)
  }, [])
  return (
    <div className={styles.users}>
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
            onClick={() => setShowCreateUser(true)}
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
        title="Create a user"
        visible={showCreateUserModal}
        footer={false}
        onCancel={() => setShowCreateUser(false)}
        wrapClassName={styles.modal}
        destroyOnClose
      >
        <UserCreateEdit type="create" modalInfo={null} />
      </Modal>
    </div>
  )
}

export default Users
