import React from 'react'
import { Button, Form, Input, Select } from 'antd'
const { Option } = Select
import styles from '../index.module.scss'
const UserCreateEdit = ({ type, modalInfo }) => {
  const [form] = Form.useForm()
  const formSubmit = (values) => {
    console.log(values)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={formSubmit}
      initialValues={modalInfo}
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
        name="role"
        rules={[{ required: true, message: 'please select role' }]}
      >
        <Select>
          <Option value="Management">Management</Option>
          <Option value="Customer Representative">
            Customer Representative
          </Option>
          <Option value="Viewer">Viewer</Option>
        </Select>
      </Form.Item>
      {/* 创建 user 才有eamil信息 */}
      {type == 'create' && (
        <Form.Item
          name="email"
          label="EMAIL"
          rules={[{ required: true, message: 'please input eamil' }]}
        >
          <Input />
        </Form.Item>
      )}
      <Form.Item
        label="ACCESS"
        name="access"
        rules={[{ required: true, message: 'please select access' }]}
      >
        <Select>
          <Option value="Super admin">Super admin</Option>
          <Option value="Admin">Admin</Option>
          <Option value="Viewer">Viewer</Option>
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

export default UserCreateEdit
