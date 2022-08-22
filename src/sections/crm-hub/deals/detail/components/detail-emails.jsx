import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Space, Button, Collapse, select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
// components
import Icon from '../../../../../components/commons/icons/Icon'
import EmailHeader from './email/email-list-header'
import EmailCollapseContent from './email/email-collapse-content'
import EmailContact from './email/email-contact'
// js
const { Panel } = Collapse
// css ----------
import styles from '../email.module.scss'

const DetailEamil = (props) => {
  const dealInfo = props.dealInfo
  // new email
  const [showNewEmail, setShowNewEmail] = useState(false)
  const onChange = (key) => {
    console.log(key)
  }
  const [emailList, setEmailList] = useState([])
  useEffect(() => {
    const list = [
      {
        id: 1,
        title: 'Can you do another mockup for me?',
        lastType: 'send',
        emailAddress: 'inquiry@westshade.com',
        personName: 'Kevin Bowden',
        time: 'Wed 5/13',
        new: true,
        content:
          'Guys, I don’t know if it’s possible but can I ask if you can do another free mockup for me? I was thinking there might...',
        list: [
          {
            id: 1,
            sendPerson: 'Kevin Bowden',
            acceprPerson: 'You',
            sendTime: 'Wed 5/11 3:20 PM',
            content:
              'Hi Kevin,Thank you! Please find the attached for your free mockup and let us know if you have any questions. We look forward to hearing back from you! Let me know if you don’t like it, we can always start production.Best Regards, Cathy',
            file: [
              {
                id: 1,
                name: 'Mockup.pdf',
                url: 'http://175.24.116.96:3300/upload/11199db8a5824c3ccd220482f179a124.jpg'
              },
              {
                id: 2,
                name: 'Example.jpg',
                url: 'http://175.24.116.96:3300/upload/3bd137920e4d824917141b7384ad7fb4.png'
              }
            ]
          },
          {
            id: 2,
            sendPerson: 'You',
            acceprPerson: 'Kevin Bowden',
            sendTime: 'Wed 5/11 3:20 PM',
            content:
              'Hi Kevin,Thank you! Please find the attached for your free mockup and let us know if you have any questions. We look forward to hearing back from you! Let me know if you don’t like it, we can always start production.Best Regards, Cathy'
          }
        ],
        collapseTitle: 'Your free canopy tent mockup is now availble to review!'
      },
      {
        id: 2,
        title: 'Can you do another mockup for me?',
        lastType: 'send',
        emailAddress: 'enquiry@westshade.com',
        personName: 'Kevin Bowden',
        time: 'Wed 5/13',
        new: false,
        content:
          'Guys, I don’t know if it’s possible but can I ask if you can do another free mockup for me? I was thinking there might...',
        list: [],
        collapseTitle: 'Your free canopy tent mockup is now availble to review!'
      },
      {
        id: 3,
        title: 'Can you do another mockup for me?',
        lastType: 'reply',
        emailAddress: 'knquiry@westshade.com',
        personName: 'Kevin Bowden',
        time: 'Wed 5/13',
        new: false,
        content:
          'Guys, I don’t know if it’s possible but can I ask if you can do another free mockup for me? I was thinking there might...',
        list: [],
        collapseTitle: 'Your free canopy tent mockup is now availble to review!'
      }
    ]
    setEmailList(list)
  }, [])
  return (
    <div className={styles['detail-email']}>
      <Row justify="space-between" className={styles['email-search-wrap']}>
        <Col>
          <Input
            placeholder="search email"
            prefix={<SearchOutlined />}
            allowClear
          />
        </Col>
        <Col>
          <Space>
            <Button>+ Log email</Button>
            <Button
              style={{
                display: 'flex',
                background: '#000',
                color: '#fff',
                alignItems: 'center'
              }}
              onClick={() => setShowNewEmail(true)}
            >
              <Icon
                name="reply-white"
                style={{ marginRight: '8px', width: '11px', height: '11px' }}
              />
              New email
            </Button>
          </Space>
        </Col>
      </Row>
      {showNewEmail && (
        <div style={{ margin: '9px 24px 24px' }}>
          <EmailContact
            dealInfo={dealInfo}
            discount={() => {
              setShowNewEmail(false)
            }}
          />
        </div>
      )}
      <Collapse onChange={onChange} ghost>
        {emailList.map((item) => {
          return (
            <Panel header={EmailHeader(item)} key={item.id}>
              <EmailCollapseContent emailListItem={item} />
            </Panel>
          )
        })}
      </Collapse>
    </div>
  )
}

export default DetailEamil
