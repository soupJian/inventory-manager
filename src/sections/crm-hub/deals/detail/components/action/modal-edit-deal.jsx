import React, { useEffect, useState } from 'react'
// antd --------------
import { Form, Button, Select, Input, Row, Col } from 'antd'
// js --------
const Option = Select.Option
// main FC ------------
const EditDeal = ({ dealInfo }) => {
  const [interestList, setInterestList] = useState([])
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log(values)
  }
  const onFinishFailed = (errInfo) => {
    console.log(errInfo)
  }
  // 添加一个 interest
  const handleAddInterest = () => {
    setInterestList((list) => {
      const newList = [...list]
      newList.push({
        id: newList[newList.length - 1].id + 1,
        name: '',
        quality: ''
      })
      return newList
    })
  }

  // remove 一个 interest
  const handleRemoveInterest = (id) => {
    setInterestList((list) => {
      let newList = [...list]
      newList = newList.filter((item) => item.id !== id)
      return newList
    })
  }
  // 设置表单初始值
  useEffect(() => {
    // 处理 interest的数组数据
    setInterestList([...dealInfo.interestProduct])
    // 设置表单默认值
    const initValue = {
      contactName: dealInfo.contact[0].name || '',
      email: dealInfo.contact[0].email || '',
      phone: dealInfo.contact[0].phone || '',
      company: dealInfo.contact[0].company || '',
      amount: dealInfo.amount,
      owner: dealInfo.owner,
      customerType: dealInfo.customerType,
      source: dealInfo.source
    }
    // interest 需要遍历
    dealInfo.interestProduct.forEach((item) => {
      initValue[`interestNmae${item.id}`] = item.name
      initValue[`interestQuality${item.id}`] = item.quality
    })
    form.setFieldsValue(initValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
        <Input
          placeholder="contact Name"
          value={dealInfo.contact[0].name}
          size="large"
        />
      </Form.Item>
      {interestList.map((item, index) => {
        return (
          <Row gutter={[10]} key={`${item.id}`}>
            <Col span={18}>
              <Form.Item label="INTEREST" name={`interestNmae${item.id}`}>
                <Input placeholder="interest" size="large" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Quantity"
                name={`interestQuality${item.id}`}
                style={{ marginBottom: '0' }}
              >
                <Input placeholder="" size="large" type="number" min={1} />
              </Form.Item>
              {index > dealInfo.interestProduct.length - 1 && (
                <div style={{ textAlign: 'right' }}>
                  <Button
                    type="link"
                    onClick={() => handleRemoveInterest(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        )
      })}
      <Row>
        <Col span={24}>
          <Button
            style={{
              background: '#000',
              color: '#fff',
              borderRadius: '10px',
              marginBottom: '20px'
            }}
            onClick={() => handleAddInterest()}
          >
            +intersest
          </Button>
        </Col>
      </Row>
      <Row gutter={[10]}>
        <Col span={12}>
          <Form.Item label="AMOUNT" name="amount">
            <Input size="large" />
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
            <Select size="large">
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
