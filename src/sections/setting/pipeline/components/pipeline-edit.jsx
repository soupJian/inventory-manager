import React, { useState } from 'react'
import { Col, Space, Input, Button, message } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { Icon } from '../../../../components/commons'
import styles from '../index.module.scss'

const PipelineEdit = ({ item, updatePipeline, list, disabled }) => {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState('')
  const save = () => {
    if (value.trim() == '') {
      message.warning('pipeline 不能为空')
      return
    }
    if (list.filter((item) => item.salesStatus == value).length > 0) {
      message.error(`${value}已存在`)
      return
    }
    updatePipeline(item.salesStatus, value.trim())
    setEdit(false)
    setValue('')
  }
  return (
    <Col span={24}>
      <Space>
        <div
          className={styles.pipelineItem}
          style={{ background: `${item.color}` }}
        >
          {edit ? (
            <Input
              allowClear
              onChange={(e) => setValue(e.target.value)}
              defaultValue={item.salesStatus}
            />
          ) : (
            <>{item.salesStatus}</>
          )}
        </div>
        {!disabled && (
          <Icon
            name="edit-active"
            width="20px"
            height="20px"
            styles={{ cursor: 'pointer' }}
            onClick={() => {
              setEdit(true)
              setValue(item.salesStatus)
            }}
          />
        )}
      </Space>
      {edit && (
        <div style={{ margin: '16px 0' }}>
          <Space>
            <Button
              className={styles.cancelBtn}
              onClick={() => {
                setEdit(false)
                setValue('')
              }}
            >
              <Space>
                <CloseOutlined />
                Cancel
              </Space>
            </Button>
            <Button className={styles.saveBtn} onClick={() => save()}>
              <Space>
                <CheckOutlined />
                Save
              </Space>
            </Button>
          </Space>
        </div>
      )}
    </Col>
  )
}

export default PipelineEdit
