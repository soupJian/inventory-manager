import React from 'react'
// antd --------------
import { Form, Button, Select, Input, Row, Col } from 'antd'
// js --------
const Option = Select.Option
// main FC ------------
const EditDeal = () => {
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
      <Row gutter={[10]}>
        <Col span={12}>
          <Form.Item label="PHONE" name="phone">
            <Input placeholder="phone" size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="COMPANY" name="company">
            <Input placeholder="company" size="large" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10]}>
        <Col span={12}>
          <Form.Item
            label="PIPELINE"
            name="pipeline"
            rules={[{ required: true, message: 'please select pipeline!' }]}
          >
            <Select size="large">
              <Option value="Sales pipeline">Sales pipeline</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="STATUS"
            name="status"
            rules={[{ required: true, message: 'please select status!' }]}
          >
            <Select size="large">
              <Option value="Interest showed">Interest showed</Option>
              <Option value="Initial mockup">Initial mockup</Option>
              <Option value="Mockup revising">Mockup revising</Option>
              <Option value="Quote sent">Quote sent</Option>
              <Option value="Closed won">Interest showed</Option>
              <Option value="Closed lost">Closed lost</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10]}>
        <Col span={18}>
          <Form.Item label="INTEREST" name="interest">
            <Input placeholder="interest" size="large" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Quantity" name="quantity">
            <Input placeholder="" size="large" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            style={{
              background: '#000',
              color: '#fff',
              borderRadius: '10px',
              marginBottom: '20px'
            }}
          >
            +intersest
          </Button>
        </Col>
      </Row>
      <Row gutter={[10]}>
        <Col span={12}>
          <Form.Item label="AMOUNT" name="amount">
            <Select size="large">
              <Option value="Cathy">Cathy</Option>
              <Option value="Neela">Neela</Option>
              <Option value="Theo">Theo</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="OWNER"
            name="owner"
            rules={[{ required: true, message: 'please select owner!' }]}
          >
            <Select size="large">
              <Option value="Cathy">Cathy</Option>
              <Option value="Neela">Neela</Option>
              <Option value="Theo">Theo</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="CUSTOMER TYPE" name="customerType">
            <Select size="large">
              <Option value="new">new</Option>
              <Option value="existing">Existing</Option>
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
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditDeal
