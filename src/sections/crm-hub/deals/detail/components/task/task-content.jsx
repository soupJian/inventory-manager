import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Input,
  Select,
  Space,
  DatePicker,
  Radio,
  Button,
  Checkbox
} from 'antd'
import { Icon } from '../../../../../../components/commons'
import TaskEdit from './task-edit'
import styles from '../task.module.scss'

const TaskContent = (props) => {
  const { taskItem, handleChangeStatus } = props
  const [showEdit, setShowEdit] = useState(false)

  return (
    <>
      <Row className={styles.taskContentWrap}>
        <Col style={{ marginTop: '15px', marginRight: '12px' }}>
          <Checkbox
            defaultChecked={taskItem.taskStatus == 0}
            onChange={(e) => handleChangeStatus(e, taskItem)}
          />
        </Col>
        <Col style={{ flex: '1' }}>
          <Row
            style={{ marginLeft: '10px' }}
            gutter={[0, 13]}
            className={styles.taskContent}
          >
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Space>
                    <Icon
                      name="task-clock"
                      style={{ width: '16px', height: '16px' }}
                    />
                    {new Date(taskItem.time).getTime() <
                    new Date().getTime() ? (
                      <span className={styles.overDue}>
                        Overdue: {taskItem.time}
                      </span>
                    ) : (
                      <span className={styles.due}>Due: {taskItem.time}</span>
                    )}
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <Icon
                      name="user"
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span>Assignee:</span>
                    <span>Cathy</span>
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <span className={styles.contentText}>{taskItem.title}</span>
            </Col>
            <Col span={24}>
              <Space>
                <span>Reminder</span>
                <span className={styles.contentText}>{taskItem.reminder}</span>
              </Space>
            </Col>
            <Col span={24}>
              <Row wrap={false} justify="space-between" align="bottom">
                <Col>
                  <Space align="top">
                    <span>Details</span>
                    <span className={styles.contentText}>
                      {taskItem.detail}
                    </span>
                  </Space>
                </Col>
                <Col className={styles.actionBtn}>
                  <Space>
                    <Button className={styles.deleteBtn}>
                      <Space>
                        <Icon name="delete" width="10px" height="13px" />
                        Delete
                      </Space>
                    </Button>
                    <Button
                      className={styles.editBtn}
                      onClick={() => setShowEdit(true)}
                    >
                      <Space>
                        <Icon name="edit-white" width="11px" height="11px" />
                        Edit
                      </Space>
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {showEdit && (
        <div style={{ marginTop: '16px' }}>
          <TaskEdit type="edit" discount={() => setShowEdit(false)} />
        </div>
      )}
    </>
  )
}

export default TaskContent
