import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col, Select, Drawer, Button, Modal, message } from 'antd'
import UserModule from './components/users-module'
import UserAccess from './components/user-access'
import UserCreateEdit from './components/user-create-edit'
import AccessDrawer from './components/access-drawer'
import styles from './index.module.scss'

const { Option } = Select

const defaultAccess = {
  accessName: '',
  description: '',
  inventory: false,
  warehousing: false,
  products: false,
  shipping: false,
  orders: false,
  'form-email': false,
  chats: false,
  deals: false,
  tickets: false,
  tasks: false,
  dashboard: false,
  assets: false,
  fastReply: false,
  other: false,
  history: false
}

const Users = () => {
  const [selectValue, setSelectValue] = useState('Users')
  const [userList, setUserList] = useState([])
  const [accessList, setAccessList] = useState([])
  // create user  modal
  const [showCreateUserModal, setShowCreateUser] = useState(false)
  // create access modal
  const [showCreateAccessModal, setShowCreateAccessModal] = useState(false)
  // 弹窗抽屉数据
  const [access, setAccess] = useState(defaultAccess)
  const [accessType, setAccessType] = useState('create')
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
        access: {
          accessName: 'Super Admin',
          description: 'Super Admin'
        },
        type: 'System created',
        userList: ['Ray Cai', 'soupjian']
      },
      {
        id: '2',
        access: {
          accessName: 'Admin',
          description: 'Admin'
        },
        type: 'System created',
        userList: ['Cathy Lastname', 'soupjian']
      },
      {
        id: '3',
        access: {
          accessName: 'Viewer',
          description: 'Viewer'
        },
        type: 'Viewer',
        userList: ['Xianyou Yang', 'soupjian']
      }
    ]
    setAccessList(list)
  }
  // 编辑用户 权限
  const editUserAccess = useCallback((record) => {
    setShowCreateAccessModal(true)
    setAccessType('edit')
    setAccess(record.access)
  }, [])
  // 编辑权限 switch
  const handleChangeAccessSwitch = useCallback((value, key) => {
    setAccess((access) => {
      const newAccess = { ...access }
      newAccess[key] = value
      return newAccess
    })
  }, [])
  // 编辑权限 输入框
  const handleInputAccess = useCallback((e) => {
    setAccess((access) => {
      const newAccess = { ...access }
      newAccess[e.target.name] = e.target.value
      return newAccess
    })
  }, [])
  // create access
  const createAccess = useCallback(() => {
    if (access.accessName.trim() == '' || access.description == '') {
      message.warn('Please complete the information.')
      return
    }
    console.log(access)
  }, [access])

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
              onClick={() => {
                setShowCreateAccessModal(true)
                setAccessType('create')
                setAccess(defaultAccess)
              }}
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
          <UserAccess data={accessList} editUserAccess={editUserAccess} />
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
      {/* access detail */}
      <Drawer
        title="Create access"
        placement="left"
        width={500}
        onClose={() => setShowCreateAccessModal(false)}
        visible={showCreateAccessModal}
      >
        <AccessDrawer
          type={accessType}
          access={access}
          handleInputAccess={handleInputAccess}
          handleChangeAccessSwitch={handleChangeAccessSwitch}
          createAccess={createAccess}
        />
      </Drawer>
    </div>
  )
}

export default Users
