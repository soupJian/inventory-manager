import React from 'react'
import { Tabs, Row, Col, Input, Button, Upload } from 'antd'
import { Icon } from '../../../../components/commons'
import { CloseCircleFilled } from '@ant-design/icons'
import styles from '../index.module.scss'
import { useState } from 'react'
import {
  AddChatReply,
  AddEmailReply
} from '../../../../service/setting/setting-reply'
import { v4 as uuidv4 } from 'uuid'

const CreateFastReply = ({ updateData }) => {
  // 附件列表
  const [fileList, setFileList] = useState([])
  const [type, setType] = useState('chat')
  const [info, setInfo] = useState({
    title: '',
    content: ''
  })
  const handleChangeTabs = (key) => {
    setType(key)
  }
  const handleChangeInfo = (e) => {
    setInfo((info) => {
      const newInfo = { ...info }
      newInfo[e.target.name] = e.target.value
      return newInfo
    })
  }
  // 上传图片 或者文件
  const handleUpload = (info) => {
    const list = info.fileList.map((item) => {
      return {
        ...item
      }
    })
    console.log(list)
    // fetch(
    //   `https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/${list[0].url}`,
    //   {
    //     method: 'PUT',
    //     headers: {
    //       'Access-Control-Allow-Headers': '*',
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-Type': list[0].type
    //     },
    //     body: list[0].originFileObj
    //   }
    // )
    setFileList(list)
  }
  // 删除某个 附件
  const handleClearFileList = (index) => {
    setFileList(() => {
      const list = [...fileList]
      list.splice(index, 1)
      return list
    })
  }
  const save = async () => {
    if (type == 'email') {
      const res = await AddEmailReply({
        id: uuidv4(),
        ...info,
        files: [...fileList]
      })
      if (res && res.message == 'success') {
        updateData('email')
      }
    } else {
      // type == 'chat
      const res = await AddChatReply({
        id: uuidv4(),
        ...info
      })
      if (res && res.message == 'success') {
        updateData('chat')
      }
    }
  }
  return (
    <>
      <Tabs onChange={handleChangeTabs}>
        <Tabs.TabPane tab="For Chat" key="chat"></Tabs.TabPane>
        <Tabs.TabPane tab="For Email" key="email"></Tabs.TabPane>
      </Tabs>
      <div className={styles.modal}>
        <Row>
          <Col span={24} className={styles.labelTitle}>
            title*
          </Col>
          <Col span={24}>
            <Input
              value={info.title}
              onChange={handleChangeInfo}
              name="title"
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '24px' }}>
          <Col span={24} className={styles.labelTitle}>
            CONTENT*
          </Col>
          <Col span={24} className={styles.contentWrap}>
            <Input.TextArea
              autoSize
              value={info.content}
              style={{ minHeight: '180px', paddingBottom: '40px' }}
              name="content"
              onChange={handleChangeInfo}
            />
            {type == 'email' && (
              <Upload
                onChange={handleUpload}
                showUploadList={false}
                multiple
                fileList={fileList}
                className={styles.uploadWrap}
              >
                <Icon
                  name="link"
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
              </Upload>
            )}
          </Col>
        </Row>
        {type == 'email' && (
          <div className={styles.fileWrap}>
            {fileList.map((item, index) => {
              return (
                <Button key={item.uid} className={styles['file-btn']}>
                  {item.name}
                  <span
                    className={styles['attachments-close']}
                    onClick={() => handleClearFileList(index)}
                  >
                    <CloseCircleFilled />
                  </span>
                </Button>
              )
            })}
          </div>
        )}
        <Row style={{ marginTop: '24px' }} justify="end">
          <Col>
            <Button className={styles.editBtn} onClick={() => save()}>
              Add
            </Button>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default CreateFastReply
