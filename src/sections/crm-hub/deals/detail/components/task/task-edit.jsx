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
              <DatePicker showTime />
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
            <Input placeholder="type here" />
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
