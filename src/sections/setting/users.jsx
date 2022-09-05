import React, { useState, useEffect } from 'react'
import { Row, Col, Select, Input, Button, Modal } from 'antd'
import UserModule from './components/users-user'
import UserAccess from './components/user-access'
import UserCreateEdit from './components/user-create-edit'
import styles from './users.module.scss'

const { Option } = Select

const Users = () => {
  const [selectValue, setSelectValue] = useState('Users')
  const [userList, setUserList] = useState([])
  const [accessList, setAccessList] = useState([])
  // create user  modal
  const [showCreateUserModal, setShowCreateUser] = useState(false)
  const getUserList = () => {
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
  }
  const getAccessList = () => {
    const list = [
      {
        id: '1',
        accessName: 'Super Admin',
        type: 'System created',
        userList: ['Ray Cai', 'soupjian']
      },
      {
        id: '2',
        accessName: 'Admin',
        type: 'System created',
        userList: ['Cathy Lastname', 'soupjian']
      },
      {
        id: '3',
        accessName: 'Viewer',
        type: 'Viewer',
        userList: ['Xianyou Yang', 'soupjian']
      }
    ]
    setAccessList(list)
  }
  useEffect(() => {
    getUserList()
    getAccessList()
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
                value={selectValue}
                style={{
                  width: 200
                }}
                onChange={(value) => setSelectValue(value)}
              >
                <Option value="Users">Users</Option>
                <Option value="Access">Access</Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col>
          {selectValue == 'Users' && (
            <Button
              className={styles.exportBtn}
              onClick={() => setShowCreateUser(true)}
            >
              Create user
            </Button>
          )}
          {selectValue == 'Access' && (
            <Button
              className={styles.exportBtn}
              onClick={() => setShowCreateUser(true)}
            >
              Create access
            </Button>
          )}
        </Col>
      </Row>
      {/* container */}
      <div className={styles.container}>
        {selectValue == 'Users' && <UserModule data={userList} />}
        {selectValue == 'Access' && accessList.length > 0 && (
          <UserAccess data={accessList} />
        )}
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
