import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// antd --------------
import { Form, Button, Select, Input, Row, Col } from 'antd'
import { getSalesPipeline } from '@/service/setting/setting-pipeline'
import { getRepresentatives } from '@/service/setting/setting-assigning'
// js --------
const Option = Select.Option

// main FC ------------
const CreateDealForm = (props) => {
  const user = useSelector((state) => state.user.user)
  const [pipelineList, setPipelineList] = useState([])
  const [customerList, setCustomerList] = useState([])
  // 创建的 deal | ticket
  const createType = props.createType

  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log(values)
    const { fullName, id, email } = user
    // 添加创建者信息
    console.log({
      fullName,
      id,
      email
    })
  }
  const onFinishFailed = (errInfo) => {
    console.log(errInfo)
  }
  const getAllpipeline = async () => {
    const res = await getSalesPipeline()
    setPipelineList(res.Item.pipelines)
  }
  const getAllCustomer = async () => {
    const res = await getRepresentatives()
    setCustomerList(res.Items)
  }
  useEffect(() => {
    getAllpipeline()
    getAllCustomer()
  }, [])
  useEffect(() => {
    form.resetFields()
  }, [createType, form])
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
      {/* deal 的 email 非必填 ticket的 email 必填 */}
      <Form.Item
        label="EMAIL"
        name="email"
        rules={[
          {
            required: createType == 'ticket',
            message: 'please input email!'
          }
        ]}
      >
        <Input placeholder="email" size="large" />
      </Form.Item>
      {/* 如果创建的是 deal 则有 PHONE 这个输入框 */}
      {createType == 'deal' && (
        <Form.Item label="PHONE" name="phone">
          <Input placeholder="phone" size="large" />
        </Form.Item>
      )}
      <Form.Item
        label="PIPELINE"
        name="pipeline"
        rules={[{ required: true, message: 'please select pipeline!' }]}
      >
        <Select size="large">
          {pipelineList.map((item, idx) => {
            return (
              <Option value={item.id} key={idx}>
                {item.salesStatus}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      {createType == 'ticket' && (
        <Form.Item
          label="DESCRIPTION"
          name="description"
          rules={[{ required: true, message: 'please input description!' }]}
        >
          <Input.TextArea placeholder="description" />
        </Form.Item>
      )}
      <Row gutter={[10]}>
        <Col span={12}>
          <Form.Item
            label="OWNER"
            name="owner"
            rules={[{ required: true, message: 'please select owner!' }]}
          >
            <Select size="large">
              {customerList.map((item, idx) => {
                return (
                  <Option value={item.fullName} key={idx}>
                    {item.fullName}
                  </Option>
                )
              })}
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
