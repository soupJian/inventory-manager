import React, { useEffect } from 'react'
// components
import { Button, Form, Input, Select } from 'antd'
// css
import styles from '../index.module.less'

const { Option } = Select
// main
const UserCreateEdit = ({
  type,
  modalInfo,
  accessList,
  submit,
  emailErrorMsg,
  setEmailErrorMsg
}) => {
  const [form] = Form.useForm()
  const formSubmit = (values) => {
    const user = { ...modalInfo, ...values }
    user.accessInfo && delete user.accessInfo
    submit(user)
  }
  useEffect(() => {
    // 表单提交后，判断 email 是否已经存在
    emailErrorMsg != '' && form.validateFields(['email'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailErrorMsg])

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={formSubmit}
      // 有modalInfo表示是编辑，没有表示是新增
      initialValues={
        modalInfo
          ? { ...modalInfo, access: modalInfo.accessInfo.accessName }
          : null
      }
      preserve={false}
    >
      <Form.Item
        name="fullName"
        label="FULL Name"
        rules={[{ required: true, message: 'please input full name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ROLE"
        name="userRole"
        rules={[{ required: true, message: 'please select role' }]}
      >
        <Select>
          <Option value="Management">Management</Option>
          <Option value="Customer Service">Customer Service</Option>
          <Option value="Warehouse">Warehouse</Option>
        </Select>
      </Form.Item>
      {/* 创建 user 才有eamil信息 */}
      {type == 'create' && (
        <Form.Item
          name="email"
          label="EMAIL"
          rules={[
            { required: true, message: 'please input eamil' },
            {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'error eamil !'
            },
            {
              validator: (rule, value, callback) => {
                if (emailErrorMsg != '') {
                  callback(emailErrorMsg)
                } else {
                  callback()
                }
              }
            }
          ]}
        >
          <Input onChange={() => setEmailErrorMsg('')} />
        </Form.Item>
      )}
      <Form.Item
        label="ACCESS"
        name="access"
        rules={[{ required: true, message: 'please select access' }]}
      >
        <Select>
          {accessList.map((item) => {
            return (
              <Option key={item.accessName} value={item.id}>
                {item.accessName}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        <Button htmlType="submit" className={styles.formBtn}>
          {type == 'create' ? 'Create' : 'Save'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default React.memo(UserCreateEdit)
