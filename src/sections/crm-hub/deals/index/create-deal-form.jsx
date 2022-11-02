import React from 'react'
// antd --------------
import { Form, Button, Select, Input, Row, Col } from 'antd'

const Option = Select.Option

// main FC ------------
const CreateDealForm = () => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log(values)
  }
  const onFinishFailed = (errInfo) => {
    console.log(errInfo)
  }
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Contact NAME"
        name="contactName"
        rules={[{ required: true, message: 'please input contact name!' }]}
      >
        <Input placeholder="contact Name" size="large" />
      </Form.Item>
      <Form.Item label="EMAIL" name="email">
        <Input placeholder="email" size="large" />
      </Form.Item>
      <Form.Item label="PHONE" name="phone">
        <Input placeholder="phone" size="large" />
      </Form.Item>
      <Form.Item
        label="PIPELINE"
        name="pipeline"
        rules={[{ required: true, message: 'please select pipeline!' }]}
      >
        <Select size="large">
          <Option value="Sales pipeline">Sales pipeline</Option>
        </Select>
      </Form.Item>
      <Row gutter={[10]}>
        <Col span={12}>
          <Form.Item
            label="OWNER"
            name="owner"
            rules={[{ required: true, message: 'please select owner!' }]}
          >
            <Select
              size="large"
              // onChange={handleChange}
            >
              <Option value="Cathy">Cathy</Option>
              <Option value="Neela">Neela</Option>
              <Option value="Theo">Theo</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="SOURCE" name="source">
            <Select
              size="large"
              // onChange={handleChange}
            >
              <Option value="Facebook">Facebook</Option>
              <Option value="Google">Google</Option>
              <Option value="Email">Email</Option>
              <Option value="Call">Call</Option>
              <Option value="Chat">Chat</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label=" " style={{ textAlign: 'right' }}>
        <Button
          htmlType="submit"
          style={{
            color: '#ffffff',
            background: '#000000',
            borderRadius: '10px'
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateDealForm
