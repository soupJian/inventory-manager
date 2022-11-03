import React, { useState } from 'react'
// antd ---------
import { Select, Row, Col, Button, Modal, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
// components -----------
import Icon from '../../../../components/commons/icons/Icon'
import EditDeal from './components/action/modal-edit-deal'
import EditContact from './components/action/modal-edit-contact'
// css ----------
import styles from './detail-action.module.less'

const { Option } = Select

// main
const DetailAction = (props) => {
  // deal 信息
  const { dealInfo, updateDeal } = props
  console.log(dealInfo)
  // 编辑 amount 金额的等信息
  const [showEditDeal, setShowEditDeal] = useState(false)
  const [showEditContact, setShowContact] = useState(false)
  const [editContactType, setEditContactType] = useState(false)
  // 编辑 contact 信息
  const [editContactInfo, setEditContactInfo] = useState(null)
  const [editIndex, setEditIndex] = useState(0)
  // 修改 status 状态
  const handleChangeStatus = (value) => {
    console.log(`selected ${value}`)
    dealInfo.status = value
    // 调用接口更新deal的状态
    updateDeal(dealInfo)
  }
  // 新增 contact
  const handleAddContact = () => {
    setEditContactInfo({
      id: dealInfo.contact[dealInfo.contact.length - 1].id + 1,
      name: '',
      email: '',
      phone: '',
      company: ''
    })
    setEditContactType('add')
    setShowContact(true)
  }
  // 编辑 contact 如果是第一个，不允许删除
  const handleEditContact = (item, index) => {
    setEditContactType('edit')
    setShowContact(true)
    setEditIndex(index)
    setEditContactInfo(item)
  }
  return (
    <>
      <div className={styles['detail-action']}>
        <div className={styles['action-header']}>
          <div className={styles.header}>
            <Icon name="deal" width="22px" height="24px" />
            <div className={styles['deal-logo']}>DEAL</div>
          </div>
          <div className={styles['deal-name']}>{dealInfo.name}</div>
          <div className={styles['status-wrap']}>
            <div>Status</div>
            <Select
              defaultValue={dealInfo.status}
              onChange={handleChangeStatus}
              size="middle"
            >
              <Option value="Interest showed">Interest showed</Option>
              <Option value="Initial mockup">Initial mockup</Option>
              <Option value=">Mockup revising">Mockup revising</Option>
              <Option value="Quote sent">Quote sent</Option>
              <Option value="Closed won">Closed won</Option>
              <Option value="Closed lost">Closed lost</Option>
            </Select>
          </div>
        </div>
        <div className={styles['action-content']}>
          <div className={styles['detail-info']}>
            <Row justify="space-between">
              <Col>
                <span className={styles['info-label']}>Amount</span>
                <span className={styles['info-content']}>
                  ${dealInfo.amount.toLocaleString()}
                </span>
              </Col>
              <Col>
                <EditOutlined
                  style={{ color: '#2EBEBD', fontSize: '16px' }}
                  onClick={() => setShowEditDeal(true)}
                />
              </Col>
            </Row>
            <div className={styles.center}>
              <span className={styles['info-label']}>Created</span>
              <span className={styles['info-content']}>
                {dealInfo.createTime}
              </span>
            </div>
            <div>
              <span className={styles['info-label']}>Owner</span>
              <span className={styles['info-content']}>{dealInfo.owner}</span>
            </div>
          </div>
          <div className={styles['goods-info']}>
            <div className={styles.title}>DETAILS</div>
            <div className={styles['info-label']}>Interest Product(s)</div>
            {dealInfo.interestProduct.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${styles['info-content']} ${styles.center}`}
                >
                  <Space>
                    <span>{item.name}</span>
                    <span>x {item.quality}</span>
                  </Space>
                </div>
              )
            })}
            <Row className={styles.row}>
              <Col span={12}>
                <div className={styles['info-label']}>Source</div>
                <div className={styles['info-content']}>{dealInfo.source}</div>
              </Col>
              <Col span={12}>
                <div className={styles['info-label']}>Customer Type</div>
                <div className={styles['info-content']}>
                  {dealInfo.customerType}
                </div>
              </Col>
            </Row>
          </div>
          {dealInfo.contact.map((item, index) => {
            return (
              <Row
                key={item.id}
                className={styles['contact-info']}
                gutter={[0, 18]}
              >
                <Col span={24}>
                  <Row
                    justify="space-between"
                    align="middle"
                    className={styles.contact}
                  >
                    <Col>
                      <div className={styles['info-label']}>
                        Contact {index + 1}
                      </div>
                      <div className={styles['info-content']}>{item.name}</div>
                    </Col>
                    <Col>
                      <Button
                        className={styles.editBtn}
                        onClick={() => handleEditContact(item, index)}
                      >
                        Edit
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <div className={styles['info-label']}>Email</div>
                  <div className={styles['info-content']}>{item.email}</div>
                </Col>
                <Col span={24}>
                  <div className={styles['info-label']}>Phone</div>
                  <div className={styles['info-content']}>{item.phone}</div>
                </Col>
                <Col span={24}>
                  <div className={styles['info-label']}>Company</div>
                  <div className={styles['info-content']}>{item.company}</div>
                </Col>
              </Row>
            )
          })}
          <Row>
            <Col span={24}>
              <Button
                className={styles.addBtn}
                onClick={() => handleAddContact()}
              >
                +Add
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <Modal
        centered
        title="Edit a deal"
        open={showEditDeal}
        footer={null}
        onCancel={() => setShowEditDeal(false)}
      >
        <EditDeal dealInfo={dealInfo} />
      </Modal>
      <Modal
        centered
        title={editContactType == 'add' ? 'Add a contact' : 'Edit contact'}
        open={showEditContact}
        footer={null}
        onCancel={() => setShowContact(false)}
      >
        <EditContact
          editIndex={editIndex}
          editContactType={editContactType}
          editContactInfo={editContactInfo}
        />
      </Modal>
    </>
  )
}

export default DetailAction
