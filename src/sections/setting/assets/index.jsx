import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// components
import { Row, Col, Select, Input, Button, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import AssetsContact from './components/asset-contact'
// api
import { getContacts } from '../../../service/setting/setting-assets'
// js
import { formatTimeStr } from '../../../utils/formatTime'
import { exportExcel } from '../../../utils/export-excel'
import { toggleLoading } from '../../../store/slices/globalSlice'
// css
import styles from './index.module.less'

const { Option } = Select

// main
const Assets = () => {
  const dispatch = useDispatch()
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
    dispatch(toggleLoading(true))
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
    dispatch(toggleLoading(false))
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        centered
        title=""
        open={showExportModal}
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
