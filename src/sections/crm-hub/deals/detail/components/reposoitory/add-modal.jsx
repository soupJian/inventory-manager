import React from 'react'
// components
import { Form, Button, Input } from 'antd'

// main
const AddModal = ({ addSave }) => {
  const [form] = Form.useForm()
  // 信息提交给父元素 调用接口
  const onFinish = (values) => {
    addSave(values)
    form.setFieldsValue({
      fileName: '',
      link: ''
    })
  }
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        label="FILE NAME"
        name="fileName"
        rules={[{ required: true, message: 'PLEASE INPUT FILE NAME!' }]}
      >
        <Input placeholder="FILE Name" size="large" />
      </Form.Item>
      <Form.Item
        label="link"
        name="link"
        rules={[{ required: true, message: 'PLEASE INPUT LINK!' }]}
      >
        <Input placeholder="link" size="large" />
      </Form.Item>
      <Form.Item label=" " style={{ textAlign: 'right' }}>
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
      </Form.Item>
    </Form>
  )
}

export default AddModal
