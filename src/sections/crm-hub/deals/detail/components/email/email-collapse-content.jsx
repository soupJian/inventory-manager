import React, { useState } from 'react'
import { Row, Col, Select, Space, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import EmailContact from './email-contact'
import styles from '../../email.module.scss'

const { Option } = Select

const EmailCollapseContent = (props) => {
  const { emailListItem } = props
  const [showEmail, setShowEmail] = useState(false)
  const [replyType, setReplyType] = useState(undefined)
  const [replyAddress, setReplyAddress] = useState(emailListItem.emailAddress)
  const handleChangeStatus = (value) => {
    if (value == 'Forward') {
      setReplyAddress('')
    } else {
      setReplyAddress(emailListItem.emailAddress)
    }
    setReplyType(value)
    setShowEmail(true)
  }
  const downloadFile = (file) => {
    // const res = await fetch(file.url, {
    //   responseType: 'blob'
    // })
    // const blob = await res.blob()
    // let url = URL.createObjectURL(blob)
    console.log(file.url)
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = `${file.url}?response-content-type=application/octet-stream`
    a.download = file.name
    // a.target = '_blank'
    // a.click()
    // a.remove()
  }
  return (
    <div className={styles['collapse-content-wrap']}>
      <div className={styles['collapse-content-header']}>
        <Row justify="space-between" align="middle">
          <Col>
            <span className={styles['collapse-title']}>
              {emailListItem.collapseTitle}
            </span>
          </Col>
          <Col>
            <Select
              onChange={handleChangeStatus}
              placeholder="Select"
              size="middle"
              value={replyType}
            >
              <Option value="Reply">Reply</Option>
              <Option value="Reply All">Reply all</Option>
              <Option value="Forward">Forward</Option>
            </Select>
          </Col>
        </Row>
      </div>
      {showEmail && (
        <EmailContact
          replyAddress={replyAddress}
          discount={() => {
            setShowEmail(false)
            setReplyType(undefined)
          }}
        />
      )}
      {emailListItem.list.map((email) => {
        return (
          <div key={email.id} className={styles.contentItem}>
            <Row>
              <Col>
                <div className={styles['email-list-avatar']}>
                  {email.sendPerson[0].toUpperCase()}
                </div>
              </Col>
              <Col>
                <Row align="middle">
                  <Col span={24}>{email.sendPerson}</Col>
                  <Col span={24}>
                    to {email.acceprPerson} • {email.sendTime}
                  </Col>
                  {email.file && email.file.length > 0 && (
                    <Col span={24} style={{ marginTop: '10px' }}>
                      <Space>
                        {email.file.map((fileItem) => {
                          return (
                            <Button
                              onClick={() => downloadFile(fileItem)}
                              key={fileItem.id}
                              className={styles['email-list-button']}
                              shape="round"
                            >
                              {fileItem.name}
                              <DownloadOutlined className={styles.icon} />
                            </Button>
                          )
                        })}
                      </Space>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
            <Row className={styles.content}>{email.content}</Row>
          </div>
        )
      })}
    </div>
  )
}

export default EmailCollapseContent
