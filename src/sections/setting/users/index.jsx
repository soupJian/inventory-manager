import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
// components
import { Row, Col, Select, Drawer, Button, Modal, message } from 'antd'
import UserModule from './components/users-module'
import UserAccess from './components/user-access'
import UserCreateEdit from './components/user-create-edit'
import AccessDrawer from './components/access-drawer'
// api
import {
  getAllUser,
  getAllAccess,
  postCreateUser,
  updateAccess,
  postCreateAccess
} from '../../../service/setting/setting-user'
// js
import { toggleLoading } from '../../../store/slices/globalSlice'
import { v4 as uuidv4 } from 'uuid'
// css
import styles from './index.module.less'

const { Option } = Select

const defaultAccess = {
  accessName: '',
  description: '',
  accesses: []
}

const Users = () => {
  const dispatch = useDispatch()
  const [selectValue, setSelectValue] = useState('Users')
  const [userList, setUserList] = useState([])
  const [accessList, setAccessList] = useState([])
  // create user  modal
  const [showCreateUserModal, setShowCreateUser] = useState(false)
  // 接口判断邮箱是否重复的等信息...
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  // 弹窗抽屉数据
  const [accessInfo, setAccessInfo] = useState({
    type: 'create', // create 和 edit,
    access: defaultAccess,
    show: false
  })
  const getData = async () => {
    dispatch(toggleLoading(true))
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
    dispatch(toggleLoading(false))
  }
  // 编辑用户 权限
  const editUserAccess = useCallback(
    (record) => {
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
  const showCreateAccess = () => {
    setAccessInfo({
      ...accessInfo,
      show: true,
      type: 'create',
      access: defaultAccess
    })
  }
  // create access
  const createAccess = async () => {
    if (
      accessInfo.access.accessName.trim() == '' ||
      accessInfo.access.description.trim() == ''
    ) {
      message.warning('Please complete the information.')
      return
    }
    if (accessInfo.type == 'edit') {
      // edit
      const newAccess = { ...accessInfo.access }
      delete newAccess.userList
      const res = await updateAccess(newAccess)
      if (res.message == 'success') {
        getData()
        setAccessInfo({
          ...accessInfo,
          show: false
        })
      }
    } else {
      // create
      const res = await postCreateAccess({
        ...accessInfo.access,
        id: uuidv4(),
        defaultAccess: false
      })
      if (res.message == 'success') {
        getData()
        setAccessInfo({
          ...accessInfo,
          show: false
        })
      }
    }
  }
  const createUser = async (user) => {
    dispatch(toggleLoading(true))
    const res = await postCreateUser({
      ...user,
      id: uuidv4(),
      created: new Date().toISOString(),
      active: true,
      online: false
    })
    dispatch(toggleLoading(false))
    if (res.message == 'success') {
      getData()
      setShowCreateUser(false)
    } else {
      setEmailErrorMsg(res.message)
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
                showCreateAccess()
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
            showCreateAccess={showCreateAccess}
            accessList={accessList}
            getData={getData}
          />
        )}
        {selectValue == 'Access' && accessList.length > 0 && (
          <UserAccess
            data={accessList}
            editUserAccess={editUserAccess}
            getData={getData}
          />
        )}
      </div>
      {/* modal 这里制作全局的导出，各个 select 模块 导出在其对应模块*/}
      <Modal
        centered
        title="Create a user"
        open={showCreateUserModal}
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
          emailErrorMsg={emailErrorMsg}
          setEmailErrorMsg={setEmailErrorMsg}
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
        open={accessInfo.show}
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
