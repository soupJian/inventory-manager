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
      file: list
    })
  }
  // 删除某个 附件
  const handleClearFileList = (index) => {
    setInfo((info) => {
      const list = [...info.file]
      list.splice(index, 1)
      return {
        ...info,
        file: list
      }
    })
  }
  const save = () => {
    if (info.title.trim() == '' || info.contents.trim() == '') {
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
            value={info.contents}
            style={{ minHeight: '100px', paddingBottom: '40px' }}
            name="contents"
            onChange={handleChangeInfo}
          />
          {editType == 'email' && (
            <Upload
              onChange={handleUpload}
              beforeUpload={beforeUpload}
              showUploadList={false}
              multiple
              fileList={detail.file}
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
          {info.file.map((item, index) => {
            return (
              <Button key={item.url} className={styles['file-btn']}>
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
