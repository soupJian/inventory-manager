import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col, Select, Drawer, Button, Modal, message } from 'antd'
import UserModule from './components/users-module'
import UserAccess from './components/user-access'
import UserCreateEdit from './components/user-create-edit'
import AccessDrawer from './components/access-drawer'
import styles from './index.module.scss'
// api
import {
  getAllUser,
  getAllAccess,
  putCreateUser,
  updateAccess,
  putCreateAccess
} from '../../../service/setting-user'

const { Option } = Select

const defaultAccess = {
  accessName: '',
  description: '',
  accesses: []
}

const Users = () => {
  const [selectValue, setSelectValue] = useState('Users')
  const [userList, setUserList] = useState([])
  const [accessList, setAccessList] = useState([])
  const [loadiing, setLoading] = useState(false)
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
    setLoading(true)
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
      console.log(record)
      setAccessInfo({
        ...accessInfo,
        show: true,
        type: 'edit',
        access: record
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  // 编辑权限 switch
  const handleChangeAccessSwitch = useCallback((name, value) => {
    setAccessInfo((info) => {
      const newInfo = JSON.parse(JSON.stringify(info))
      if (value) {
        newInfo.access.accesses.push(name)
      } else {
        const index = newInfo.access.accesses.findIndex((item) => item == name)
        newInfo.access.accesses.splice(index, 1)
      }
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
  const createAccess = async () => {
    if (
      accessInfo.access.accessName.trim() == '' ||
      accessInfo.access.description.trim() == ''
    ) {
      message.warn('Please complete the information.')
      return
    }
    if (accessInfo.type == 'edit') {
      //edit
      const newAccess = { ...accessInfo.access }
      delete newAccess.userList
      const res = await updateAccess(newAccess)
      if (res.message == 'SUCCESS') {
        getData()
        setAccessInfo({
          ...accessInfo,
          show: false
        })
      }
    } else {
      // create
      const res = await putCreateAccess(accessInfo.access)
      if (res.message == 'SUCCESS') {
        getData()
        setAccessInfo({
          ...accessInfo,
          show: false
        })
      }
    }
  }
  const createUser = async (user) => {
    const res = await putCreateUser(user)
    console.log(res)
    if (res.message) {
      getData()
      setShowCreateUser(false)
    }
  }

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
            getData={getData}
          />
        )}
        {selectValue == 'Access' && accessList.length > 0 && (
          <UserAccess
            data={accessList}
            editUserAccess={editUserAccess}
            loading={loadiing}
            getData={getData}
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
          submit={createUser}
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
