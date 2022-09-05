import React, { useState, useEffect } from 'react'
import { Row, Col, Select, Input, Button, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import AssetsContact from './components/asset-contact'
import styles from './assets.module.scss'

const { Option } = Select

const Assets = () => {
  const [headerSelect, setHeaderSelect] = useState('Contact')
  const [constactList, setContactList] = useState([])
  // 导出 modal
  const [showExportModal, setShowExportModal] = useState(false)

  // 下载
  const download = () => {
    if (headerSelect == 'Contact') {
      console.log(filterData)
    }
  }
  useEffect(() => {
    const list = [
      {
        key: '1',
        name: '汤建',
        company: '炜辰科技',
        email: 'soupjian@163.com',
        phone: '13479291739',
        closedDeals: 200,
        createDate: '2022/09/01'
      },
      {
        key: '2',
        name: '汤建',
        company: '炜辰科技',
        email: 'soupjian@163.com',
        phone: '13479291739',
        closedDeals: 200,
        createDate: '2022/08/30'
      },
      {
        key: '3',
        name: '汤建',
        company: '炜辰科技',
        email: 'soupjian@163.com',
        phone: '13479291739',
        closedDeals: 200,
        createDate: '2022/08/25'
      }
    ]
    setContactList(list)
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
        <div className={styles.fileFormat}>file format</div>
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
