import React, { useEffect } from 'react'
// antd --------------
import { Form, Button, Space, Input } from 'antd'

// main FC ------------
const EditContact = (props) => {
  const { editContactType, editContactInfo, editIndex } = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log(values)
  }
  const onFinishFailed = (errInfo) => {
    console.log(errInfo)
  }
  useEffect(() => {
    form.setFieldsValue(editContactInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editContactInfo.id])
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="NAME"
        name="name"
        rules={[{ required: true, message: 'please input name!' }]}
      >
        <Input placeholder="name" size="large" />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input placeholder="email" size="large" />
      </Form.Item>
      <Form.Item label="PHONE" name="phone">
        <Input placeholder="phone" size="large" />
      </Form.Item>
      <Form.Item label="COMPANY" name="company">
        <Input placeholder="company" size="large" />
      </Form.Item>
      <Form.Item label=" " style={{ textAlign: 'right' }}>
        <Space>
          {editContactType == 'edit' && (
            <>
              {editIndex != 0 && (
                <Button
                  htmlType="button"
                  style={{
                    color: '#00000',
                    background: '#E6E6E6',
                    borderRadius: '10px'
                  }}
                >
                  Delete
                </Button>
              )}
              <Button
                htmlType="submit"
                style={{
                  color: '#ffffff',
                  background: '#000000',
                  borderRadius: '10px'
                }}
              >
                Save
              </Button>
            </>
          )}
          {editContactType == 'add' && (
            <Button
              htmlType="submit"
              style={{
                color: '#ffffff',
                background: '#000000',
                borderRadius: '10px'
              }}
            >
              Add
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  )
}

export default EditContact
