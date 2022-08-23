import React from 'react'
import { Row, Col, Input, Select, Space, DatePicker, Radio, Button } from 'antd'
import { Icon } from '../../../../../../components/commons'
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons'
import styles from '../task.module.scss'
const { Option } = Select

/**
 *
 * @returns 新增和编辑 都是 一个模板，根据类型展示字段
 */
const TaskEdit = (props) => {
  // 关闭 task 模块
  const { discount, type } = props
  return (
    <div className={styles.taskEdit}>
      <div className={styles.header}>
        <Row gutter={[100, 0]}>
          <Col>
            <Space>
              <span>Due date & time</span>
              <DatePicker />
              <span>at</span>
              <Select placeholder="Time" style={{ width: '100px' }}>
                <Option value="7:00">7:00 AM</Option>
                <Option value="7:30">7:30 AM</Option>
                <Option value="8:00">8:00 AM</Option>
                <Option value="8:30">8:30 AM</Option>
                <Option value="9:00">9:00 AM</Option>
                <Option value="9:30">9:30 AM</Option>
                <Option value="10:00">10:00 AM</Option>
                <Option value="10:30">10:30 AM</Option>
                <Option value="11:00">11:00 AM</Option>
                <Option value="11:30">11:30 AM</Option>
                <Option value="12:00">12:00 PM</Option>
                <Option value="12:30">12:30 PM</Option>
                <Option value="13:00">1:00 PM</Option>
                <Option value="13:30">1:30 PM</Option>
                <Option value="14:00">2:00 PM</Option>
                <Option value="14:30">2:30 PM</Option>
                <Option value="15:00">3:00 PM</Option>
                <Option value="15:30">3:30 PM</Option>
                <Option value="16:00">4:00 PM</Option>
                <Option value="16:30">4:30 PM</Option>
                <Option value="17:00">5:00 PM</Option>
                <Option value="17:30">5:30 PM</Option>
                <Option value="18:00">6:00 PM</Option>
                <Option value="18:30">6:30 PM</Option>
                <Option value="19:00">7:00 PM</Option>
                <Option value="19:30">7:30 PM</Option>
                <Option value="20:00">8:00 PM</Option>
                <Option value="20:30">8:30 PM</Option>
              </Select>
            </Space>
          </Col>
          <Col>
            <Space>
              <span>Assignee</span>
              <Select placeholder="select">
                <Option value="Cathy">Cathy</Option>
                <Option value="Neela">Neela</Option>
                <Option value="Theo">Theo</Option>
              </Select>
            </Space>
          </Col>
        </Row>
        <div style={{ margin: '16px 0' }}>
          <Space>
            <span>Task short description</span>
            <Input placeholder="type here" style={{ width: '485px' }} />
          </Space>
        </div>
        <div>
          <Space>
            <span>Reminder</span>
            <Radio.Group value="1 day before">
              <Radio value="No reminder">No reminder</Radio>
              <Radio value="30 min before">30 min before</Radio>
              <Radio value="2 hours before">2 hours before</Radio>
              <Radio value="1 day before">1 day before</Radio>
            </Radio.Group>
          </Space>
        </div>
      </div>
      <div className={styles.content}>
        <Input.TextArea
          autoSize
          className={styles.textarea}
          placeholder="Type details if needed"
        />
        <div className={styles.actionWrap}>
          <Space>
            <Button
              onClick={() => {
                discount()
              }}
            >
              <DeleteOutlined />
              Discount
            </Button>
            {type == 'add' && (
              <Button
                style={{
                  display: 'flex',
                  background: '#000',
                  color: '#fff',
                  alignItems: 'center'
                }}
              >
                <CheckOutlined />
                Create
              </Button>
            )}
            {type == 'edit' && (
              <Button
                style={{
                  display: 'flex',
                  background: '#000',
                  color: '#fff',
                  alignItems: 'center'
                }}
              >
                <CheckOutlined />
                Save
              </Button>
            )}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default TaskEdit
