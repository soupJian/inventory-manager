import React, { useState } from 'react'
// components
import { Row, Col, Input, Button, message, Upload } from 'antd'
import { Icon } from '../../../../components/commons'
import { CloseCircleFilled } from '@ant-design/icons'
// css
import styles from '../index.module.less'

// main
const EditFastReply = (props) => {
  const { editType, detail, saveEdit, openNewWindow } = props
  const [info, setInfo] = useState(detail)
  const handleChangeInfo = (e) => {
    setInfo((info) => {
      const newInfo = { ...info }
      newInfo[e.target.name] = e.target.value
      return newInfo
    })
  }
  // 上传图片 或者文件
  const handleUpload = (uploadInfo) => {
    console.log(uploadInfo)
    const list = uploadInfo.fileList.map((item) => {
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
  const save = () => {
    if (info.title.trim() == '' || info.content.trim() == '') {
      message.warning('Please complete the information.')
      return
    }
    saveEdit(info, editType)
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
      {editType == 'email' && (
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
            Save
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default EditFastReply
