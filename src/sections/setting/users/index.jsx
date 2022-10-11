import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col, Select, Drawer, Button, Modal, message } from 'antd'
import UserModule from './components/users-module'
import UserAccess from './components/user-access'
import UserCreateEdit from './components/user-create-edit'
import AccessDrawer from './components/access-drawer'
import styles from './index.module.scss'
// api
import { getAllUser, getAllAccess } from '../../../service/setting-user'

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
  const [loadiing, setLoading] = useState(true)
  // create user  modal
  const [showCreateUserModal, setShowCreateUser] = useState(false)
  // 弹窗抽屉数据
  // const [access, setAccess] = useState(defaultAccess)
  const [accessInfo, setAccessInfo] = useState({
    type: 'create', // create 和 edit,
    access: defaultAccess,
    show: false
  })
  const getData = async () => {
    const userRes = await getAllUser()
    const accessRes = await getAllAccess()
    setUserList(
      userRes.Items.map((item) => {
        return {
          ...item,
          accessInfo: accessRes.Items.filter((i) => i.id === item.access)[0]
        }
      })
    )
    setAccessList(
      accessRes.Items.map((item) => {
        return {
          ...item,
          userList: userRes.Items.filter((i) => i.access === item.id)
        }
      })
    )
    setLoading(false)
  }
  // 编辑用户 权限
  const editUserAccess = useCallback(
    (record) => {
      setAccessInfo({
        ...accessInfo,
        show: true,
        type: 'edit',
        access: record.access
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  // 编辑权限 switch
  const handleChangeAccessSwitch = useCallback((value, key) => {
    setAccessInfo((info) => {
      const newInfo = { ...info }
      newInfo.access[key] = value
      return newInfo
    })
  }, [])
  // 编辑权限 输入框
  const handleInputAccess = useCallback((e) => {
    setAccessInfo((info) => {
      const newInfo = { ...info }
      newInfo.access[e.target.name] = e.target.value
      console.log(newInfo)
      return newInfo
    })
  }, [])
  // 查看用户 access
  const showAccessDetail = (access) => {
    setAccessInfo({
      access,
      show: true,
      type: 'edit'
      // access: access
    })
  }
  // create access
  const createAccess = useCallback(() => {
    if (
      accessInfo.access.accessName.trim() == '' ||
      accessInfo.access.description.trim() == ''
    ) {
      message.warn('Please complete the information.')
      return
    }
    console.log(accessInfo.access)
  }, [accessInfo.access])

  useEffect(() => {
    getData()
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
                setAccessInfo({
                  ...accessInfo,
                  show: true,
                  type: 'create',
                  access: defaultAccess
                })
              }}
            >
              Create access
            </Button>
          )}
        </Col>
      </Row>
      {/* container */}
      <div className={styles.container}>
        {selectValue == 'Users' && (
          <UserModule
            data={userList}
            showAccessDetail={showAccessDetail}
            accessList={accessList}
            loading={loadiing}
          />
        )}
        {selectValue == 'Access' && accessList.length > 0 && (
          <UserAccess
            data={accessList}
            editUserAccess={editUserAccess}
            loading={loadiing}
          />
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
        <UserCreateEdit
          type="create"
          modalInfo={null}
          accessList={accessList}
        />
      </Modal>
      {/* access detail */}
      <Drawer
        title={accessInfo.type == 'create' ? 'create  access' : 'view  access'}
        placement="left"
        width={500}
        onClose={() =>
          setAccessInfo({
            ...accessInfo,
            show: false
          })
        }
        visible={accessInfo.show}
      >
        <AccessDrawer
          type={accessInfo.type}
          accessInfo={accessInfo}
          handleInputAccess={handleInputAccess}
          handleChangeAccessSwitch={handleChangeAccessSwitch}
          createAccess={createAccess}
        />
      </Drawer>
    </div>
  )
}

export default Users
