import React, { useEffect, useState } from 'react'
// components
import {
  Row,
  Col,
  Input,
  Space,
  Button,
  Upload,
  message,
  Dropdown,
  Menu
} from 'antd'
import {
  CloseCircleFilled,
  DownOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { Icon } from '@/components/commons'
// css
import styles from '../email.module.less'

// main
const EmailContact = (props) => {
  /**
   * emailType: new | reply 判断是新增邮件和 回复邮件 差别在于 新增邮件 有subject 和 select 字段
   * dealInfo new email 的 选择 select 需要处理的信息，以及邮件 deal-action 相关信息
   * replyAddress  回复邮件 需要 自动填写 邮件接收人地址  如果是 Forward 则 不需要默认展示，需要手动 填写
   * discount 关闭邮件
   */
  // 没有 replyAddress 传递则表示 是 new 邮件
  const { emailType, dealInfo, replyAddress, discount } = props
  const [showCc, setShowCc] = useState(false)
  const [showBCc, setShowBCc] = useState(false)
  // to 列表
  const [ToList, setToList] = useState([])
  // Cc 列表
  const [CcList, setCcList] = useState([])
  // Bcc 列表
  const [BCcList, setBccList] = useState([])
  // 附件列表
  const [fileList, setFileList] = useState([])
  // select deal的联系人
  const handleAddToSend = (item) => {
    const newToList = [...ToList]
    if (newToList.indexOf(item.email) < 0) {
      newToList.push(item.email)
      setToList(newToList)
    }
  }
  // 添加 某个 类别 联系人
  const handleAddSend = (e) => {
    // console.log(e.target.value)
    const { value, name } = e.target
    const trimValue = value.trim()
    // 如果输入值为空 return
    if (trimValue == '') return
    const emailReg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // 如果不是邮箱 return
    if (!emailReg.test(trimValue)) {
      message.warning('Please enter the correct email format')
      return
    }
    switch (name) {
      case 'To':
        const newToList = [...ToList]
        if (newToList.indexOf(trimValue) < 0) {
          newToList.push(trimValue)
          setToList(newToList)
        }
        return
      case 'Cc':
        const newCcList = [...CcList]
        if (newCcList.indexOf(trimValue) < 0) {
          newCcList.push(trimValue)
          setCcList(newCcList)
        }
        return
      case 'BCc':
        const newBccList = [...BCcList]
        if (newBccList.indexOf(trimValue) < 0) {
          newBccList.push(trimValue)
          setBccList(newBccList)
        }
        return
    }
  }
  // 删除某个 类别 联系人
  const handleClearSend = (name, index) => {
    switch (name) {
      case 'To':
        const newToList = [...ToList]
        newToList.splice(index, 1)
        setToList(newToList)
        return
      case 'Cc':
        const newCcList = [...CcList]
        newCcList.splice(index, 1)
        setCcList(newCcList)
        return
      case 'BCc':
        const newBccList = [...BCcList]
        newBccList.splice(index, 1)
        setBccList(newBccList)
        return
    }
  }
  // 删除某个 附件
  const handleClearFileList = (index) => {
    setFileList(() => {
      const list = [...fileList]
      list.splice(index, 1)
      return list
    })
  }
  // 上传附件前 的操作
  const beforeUpload = (file, fileList) => {
    // console.log(file)
    // console.log(fileList)
  }
  // 上传图片 或者文件
  const handleUpload = (info) => {
    const list = info.fileList.map((item) => {
      return {
        ...item,
        url: `${item.uid}.${item.name.split('.')[1]}`
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
  // to 后面 select 选择该 deals 的 联系人
  const selectMenu = (contact) => {
    const list = contact.map((item) => {
      return {
        key: item.id,
        label: <span onClick={() => handleAddToSend(item)}>{item.email}</span>
      }
    })
    return <Menu items={list} />
  }
  useEffect(() => {
    if (replyAddress) {
      setToList((list) => {
        const newList = [...list]
        if (newList.indexOf(replyAddress) < 0) {
          newList.push(replyAddress)
        }
        return newList
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replyAddress])

  return (
    <div className={styles['email-contact-wrap']}>
      {/* 头部选择 邮件发送人 */}
      <Row className={styles['contact-header']} wrap={false}>
        <Col>
          <div className={styles['contact-avatar']}>Y</div>
        </Col>
        <Col flex={1}>
          <Row gutter={[0, 5]}>
            <Col span={24} className={styles.label}>
              You
            </Col>
            <Col span={24}>
              <Row>
                <Col span={1} className={styles.label}>
                  to
                </Col>

                <Col span={23}>
                  {emailType == 'new' &&
                    dealInfo &&
                    dealInfo.contact.length > 0 && (
                      <span className={styles.dropdown}>
                        <Dropdown overlay={selectMenu(dealInfo.contact)}>
                          <Space>
                            Select <DownOutlined />
                          </Space>
                        </Dropdown>
                      </span>
                    )}
                  {ToList.map((item, index) => {
                    return (
                      <Button key={item} className={styles['attachments-file']}>
                        {item}
                        <span
                          className={styles['attachments-close']}
                          onClick={() => handleClearSend('To', index)}
                        >
                          <CloseCircleFilled />
                        </span>
                      </Button>
                    )
                  })}
                  <Input
                    allowClear
                    placeholder="Type email"
                    className={styles.input}
                    name="To"
                    onPressEnter={handleAddSend}
                    onBlur={handleAddSend}
                  />
                </Col>
              </Row>
            </Col>
            {/*  subject 创建新邮件 才会有 */}
            {emailType == 'new' && (
              <Col span={24}>
                <Row>
                  <Col span={2} className={styles.label}>
                    Subject
                  </Col>
                  <Col span={22}>
                    <Input
                      allowClear
                      placeholder="email subject"
                      style={{ width: '300px' }}
                      name="subject"
                    />
                  </Col>
                </Row>
              </Col>
            )}
            {showCc && (
              <Col span={24}>
                <Row>
                  <Col span={1} className={styles.label}>
                    Cc
                  </Col>
                  <Col span={23}>
                    {CcList.map((item, index) => {
                      return (
                        <Button
                          key={item}
                          className={styles['attachments-file']}
                        >
                          {item}
                          <span
                            className={styles['attachments-close']}
                            onClick={() => handleClearSend('Cc', index)}
                          >
                            <CloseCircleFilled />
                          </span>
                        </Button>
                      )
                    })}
                    <Input
                      allowClear
                      placeholder="Type email"
                      className={styles.input}
                      name="Cc"
                      onPressEnter={handleAddSend}
                      onBlur={handleAddSend}
                    />
                  </Col>
                </Row>
              </Col>
            )}
            {showBCc && (
              <Col span={24}>
                <Row>
                  <Col span={1} className={styles.label}>
                    BCc
                  </Col>
                  <Col span={23}>
                    {BCcList.map((item, index) => {
                      return (
                        <Button
                          key={item}
                          className={styles['attachments-file']}
                        >
                          {item}
                          <span
                            className={styles['attachments-close']}
                            onClick={() => handleClearSend('BCc', index)}
                          >
                            <CloseCircleFilled />
                          </span>
                        </Button>
                      )
                    })}
                    <Input
                      allowClear
                      placeholder="Type email"
                      className={styles.input}
                      name="BCc"
                      onPressEnter={handleAddSend}
                      onBlur={handleAddSend}
                    />
                  </Col>
                </Row>
              </Col>
            )}
            {fileList.length > 0 && (
              <Col span={24}>
                <Row>
                  <Col span={3} className={styles.label}>
                    Attachments
                  </Col>
                  <Col span={21}>
                    {fileList.map((item, index) => {
                      return (
                        <Button
                          key={item.url}
                          className={styles['attachments-file']}
                        >
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
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <div className={styles['cc-btn']}>
        <span onClick={() => setShowCc(true)}>Cc</span>
        <span className={styles.Bcc} onClick={() => setShowBCc(true)}>
          BCc
        </span>
      </div>
      {/* 邮件内容 */}
      <div className={styles.content}>
        <Input.TextArea
          placeholder="Type your email here"
          className={styles['textarea']}
          autoSize={true}
        />

        <Row className={styles.footer} align="middle" justify="space-between">
          <Col>
            <Upload
              onChange={handleUpload}
              beforeUpload={beforeUpload}
              showUploadList={false}
              multiple
              fileList={fileList}
            >
              <Icon
                name="link"
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
            </Upload>
          </Col>
          <Col>
            <Space>
              <Button
                onClick={() => {
                  discount()
                }}
              >
                <DeleteOutlined />
                Discount
              </Button>
              <Button
                style={{
                  display: 'flex',
                  background: '#000',
                  color: '#fff',
                  alignItems: 'center'
                }}
              >
                <Icon
                  name="reply-white"
                  style={{ marginRight: '8px', width: '11px', height: '11px' }}
                />
                Send
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default EmailContact
