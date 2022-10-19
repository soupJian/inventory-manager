import React from 'react'
import { Row, Col, Input, Button, message, Upload } from 'antd'
import { Icon } from '../../../../components/commons'
import { CloseCircleFilled } from '@ant-design/icons'
import { useState } from 'react'
import styles from '../index.module.scss'
const EditFastReply = (props) => {
  const { editType, detail, saveEditChat } = props
  const [info, setInfo] = useState(detail)
  const handleChangeInfo = (e) => {
    setInfo((info) => {
      const newInfo = { ...info }
      newInfo[e.target.name] = e.target.value
      return newInfo
    })
  }
  // 上传附件前 的操作
  const beforeUpload = (file, fileList) => {
    // console.log(file)
    // console.log(fileList)
  }
  // 上传图片 或者文件
  const handleUpload = (uplodaInfo) => {
    const list = uplodaInfo.fileList.map((item) => {
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
  const save = () => {
    if (info.title.trim() == '' || info.content.trim() == '') {
      message.warn('Please complete the information.')
      return
    }
    saveEditChat(info)
  }
  return (
    <div className={styles.modal}>
      <Row>
        <Col span={24} className={styles.labelTitle}>
          title*
        </Col>
        <Col span={24}>
          <Input value={info.title} onChange={handleChangeInfo} name="title" />
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
            style={{ minHeight: '100px', paddingBottom: '40px' }}
            name="content"
            onChange={handleChangeInfo}
          />
          {editType == 'email' && (
            <Upload
              onChange={handleUpload}
              beforeUpload={beforeUpload}
              showUploadList={false}
              multiple
              fileList={detail.files}
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
      {editType == 'email' && (
        <div className={styles.fileWrap}>
          {info.files.map((item, index) => {
            return (
              <Button key={item.url} className={styles['file-btn']}>
                {item.fileName}
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
          <Button
            className={styles.editBtn}
            onClick={() => {
              save()
            }}
          >
            Save
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default EditFastReply
