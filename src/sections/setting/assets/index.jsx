import React, { useState, useEffect } from 'react'
import { Row, Col, Select, Input, Button, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import AssetsContact from './components/asset-contact'
import styles from './index.module.scss'
import { getContacts } from '../../../service/setting/setting-assets'
import { formatTimeStr } from '../../../utils/formatTime'
import { exportExcel } from '../../../utils/export-excel'
const { Option } = Select

const Assets = () => {
  const [headerSelect, setHeaderSelect] = useState('Contact')
  const [constactList, setContactList] = useState([])
  // 导出 modal
  const [showExportModal, setShowExportModal] = useState(false)

  // 下载
  const download = () => {
    if (headerSelect == 'Contact') {
      console.log(constactList)
      exportExcel(
        'contact',
        constactList.map((item) => {
          return {
            NAME: item.fullName,
            COMPANY: item.company,
            EMAIL: item.email,
            PHONE: item.phone,
            'CLOSED DEALES': item.closedDeals,
            'CREATE DATE': item.createdDate
          }
        })
      )
    }
  }
  const getData = async () => {
    const res = await getContacts()
    if (res.Items) {
      setContactList(
        res.Items.map((item) => {
          return {
            ...item,
            createdDate: formatTimeStr(item.created, 'DD/MM/YYYY')
          }
        })
      )
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className={styles.assets}>
      {/* header-search */}
      <Row justify="space-between" className={styles['header-select']}>
        <Col>
          <Row align="middle" gutter={10}>
            <Col className={styles.selectText}>Select</Col>
            <Col>
              <Select
                className={styles.selectWrap}
                value={headerSelect}
                style={{
                  width: 200
                }}
                onChange={(value) => setHeaderSelect(value)}
              >
                <Option value="Contact">Contact</Option>
              </Select>
            </Col>
            <Col className={styles.inputWrap}>
              <Input
                placeholder="Search contacts"
                prefix={<SearchOutlined />}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Button
            className={styles.exportBtn}
            onClick={() => setShowExportModal(true)}
          >
            Export all
          </Button>
        </Col>
      </Row>
      {/* container */}
      <div className={styles.container}>
        {headerSelect == 'Contact' && <AssetsContact data={constactList} />}
      </div>
      {/* modal 这里制作全局的导出，哥哥 select 模块 导出在其对应模块*/}
      <Modal
        title=""
        visible={showExportModal}
        okText="Save"
        footer={false}
        // onOK={() => ()}
        onCancel={() => setShowExportModal(false)}
        wrapClassName={styles.modal}
      >
        <div className={styles.modalTitle}>Export to a file</div>
        <div className={styles.fileFormat}>FILE FORMAT</div>
        <div className={styles.filewrap}>XLSX</div>
        <Row justify="end">
          <Col>
            <Button className={styles.exportBtn} onClick={() => download()}>
              Download
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default Assets
