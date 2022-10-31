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

const CreateFastReply = ({ updateData, openNewWindow }) => {
  const [type, setType] = useState('chat')
  const [info, setInfo] = useState({
    title: '',
    content: '',
    files: []
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
  const handleUpload = (uplodaInfo) => {
    const list = uplodaInfo.fileList.map((item) => {
      if (item.url) {
        return item
      } else {
        const url = window.URL.createObjectURL(item.originFileObj)
        return {
          fileName: item.name,
          uid: item.uid,
          originFileObj: item.originFileObj,
          url,
          isNewFile: true
        }
      }
    })
    setInfo({
      ...info,
      files: list
    })
  }
  // 删除某个 附件
  const handleClearFileList = (index) => {
    setInfo((info) => {
      const list = [...info.files]
      list.splice(index, 1)
      return {
        ...info,
        files: list
      }
    })
  }
  const save = async () => {
    if (type == 'email') {
      const res = await AddEmailReply({
        id: uuidv4(),
        ...info
      })
      if (res && res.message == 'success') {
        updateData('email')
      }
    } else {
      // type == 'chat
      const res = await AddChatReply({
        id: uuidv4(),
        title: info.title,
        content: info.content
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
                fileList={info.files}
                className={styles.uploadWrap}
                beforeUpload={() => false}
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
            {info.files.map((item, index) => {
              return (
                <Button
                  key={item.url}
                  className={styles['file-btn']}
                  onClick={() => openNewWindow(item.url)}
                >
                  {item.fileName}
                  <CloseCircleFilled
                    className={styles['attachments-close']}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClearFileList(index)
                    }}
                  />
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
