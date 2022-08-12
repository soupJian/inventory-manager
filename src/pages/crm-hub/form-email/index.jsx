// react next -------------
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
// antd -------------
import { Row, Col } from 'antd'
// components ------------
import FromEmailHeader from '../../../sections/crm-hub/form-email/form-eamil-header'
import FromEmailList from '../../../sections/crm-hub/form-email/form-email-list'
import FromEmailDetail from '../../../sections/crm-hub/form-email/form-email-detail'
// css---------
import styles from './index.module.scss'
// main FC----------------
const FormEmail = () => {
  // 邮件列表
  const [emailList, setEmailList] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  // 左侧邮件列表 点击 右侧展示对应的 邮件 通过 list 的 index 索引
  const chooseSelectIndex = (index) => {
    setSelectedIndex(index)
  }
  // handleDeleteEmail 删除选择的 email
  const handleDeleteEmail = () => {
    console.log(emailList)
    // if (emailList.length == 0) return
  }
  // 获取 邮件列表
  useEffect(() => {
    const list = [
      {
        title: 'Ant Design Title 1',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 2',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 3',
        emailAddress: 'email@myemail.com',
        time: '',
        content: '测试邮件'
      },
      {
        title: 'Ant Design Title 4',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 1',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 2',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 3',
        emailAddress: 'email@myemail.com',
        time: '',
        content: '测试邮件'
      },
      {
        title: 'Ant Design Title 4',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 1',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 2',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 3',
        emailAddress: 'email@myemail.com',
        time: '',
        content: '测试邮件'
      },
      {
        title: 'Ant Design Title 4',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 4',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 1',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 2',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 3',
        emailAddress: 'email@myemail.com',
        time: '',
        content: '测试邮件'
      },
      {
        title: 'Ant Design Title 4',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 1',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 2',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      },
      {
        title: 'Ant Design Title 3',
        emailAddress: 'email@myemail.com',
        time: '',
        content: '测试邮件'
      },
      {
        title: 'Ant Design Title 4',
        emailAddress: 'inquiry@westshade.com',
        time: ''
      }
    ]
    setEmailList(list)
    setSelectedIndex(0)
  }, [])
  return (
    <>
      <Head>
        <title>CRM Hub | Form & email</title>
      </Head>
      <div className={styles.FormEmail}>
        <FromEmailHeader />
        <Row gutter={[16]} className={styles.FormEmailContent}>
          <Col span={12} style={{ height: '100%' }}>
            <FromEmailList
              emailList={emailList}
              selectedIndex={selectedIndex}
              chooseSelectIndex={(index) => chooseSelectIndex(index)}
            />
          </Col>
          <Col span={12} style={{ height: '100%' }}>
            <FromEmailDetail
              email={emailList[selectedIndex]}
              handleDeleteEmail={handleDeleteEmail}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default FormEmail
