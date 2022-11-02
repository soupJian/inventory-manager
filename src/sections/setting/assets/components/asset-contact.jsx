import React, { useState } from 'react'
// components
import { Table, Row, Col, Button, Modal } from 'antd'
import { Icon } from '../../../../components/commons'
import { CloseOutlined } from '@ant-design/icons'
// js
import {
  formatTimeStr,
  isThisWeek,
  isLastWeek,
  isThisMonth,
  isLastMonth,
  islastdays,
  isSameYear,
  isLastYear
} from '../../../../utils/formatTime'
import { exportExcel } from '../../../../utils/export-excel'
// css
import styles from '../index.module.scss'
import 'antd/lib/dropdown/style/index.css'
import 'antd/lib/pagination/style/index.css'
import 'antd/lib/checkbox/style/index.css'
import 'antd/lib/input/style/index.css'
import 'antd/lib/button/style/index.css'

// main
const AssetsContact = ({ data }) => {
  const [filterData, setFilterData] = useState([])
  const [isFilter, setIsFilter] = useState(false)
  // 导出类型 分为 表格过滤导出(filter)和 checkbox选择过滤到处 (select)
  const [exportType, setExportType] = useState(null)
  // 选择的表格数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // 展示选中的 表格 数目
  const [showSelectedView, setShowSelectedView] = useState(false)
  // 导出 modal
  const [showExportModal, setShowExportModal] = useState(false)
  // 表格选择 select Change
  const onSelectChange = (newSelectedRowKeys) => {
    // 对应的 key 数组 [1,2,3,4,6] 也就是对应的 id数组
    console.log(newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
    // 如果选中 数目 > 0 展示 view
    if (newSelectedRowKeys.length > 0) {
      setShowSelectedView(true)
    }
  }
  // menu 状态表格筛选 过滤后的数组 实现导出
  const tableChange = (pagination, filters, sorter, extr) => {
    // 如果进行了数据过滤就是一个过滤对象， 如果是 null 就表示 reset
    if (filters.created) {
      setIsFilter(true)
    } else {
      setIsFilter(false)
    }
    setFilterData(extr.currentDataSource)
  }
  // 清除已选择
  const clearSelect = () => {
    setSelectedRowKeys([])
    setShowSelectedView(false)
  }
  // 导出已选择的
  const handleExport = () => {
    console.log(selectedRowKeys)
    setShowExportModal(true)
    setExportType('select')
  }
  // 导出 表格过滤后的数据
  const exportFilter = () => {
    setShowExportModal(true)
    setExportType('filter')
  }
  // 下载
  const download = () => {
    if (exportType == 'filter') {
      exportExcel(
        'contact',
        filterData.map((item) => {
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
    } else {
      console.log(selectedRowKeys)
      const list = data.filter((item) => selectedRowKeys.includes(item.id))
      exportExcel(
        'contact',
        list.map((item) => {
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
    setShowExportModal(false)
  }
  // menu table 的 columns
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'fullName'
    },
    {
      title: 'COMPANY',
      dataIndex: 'company'
    },
    {
      title: 'EMAIL',
      dataIndex: 'email'
    },
    {
      title: 'PHONE',
      dataIndex: 'phone'
    },
    {
      title: 'CLOSED DEALS',
      dataIndex: 'closedDeals'
    },
    {
      title: 'CREATE DATE',
      dataIndex: 'created',
      filters: [
        {
          text: 'ALL time',
          value: 1
        },
        {
          text: 'This week',
          value: 2
        },
        {
          text: 'Last week',
          value: 3
        },
        {
          text: 'This month',
          value: 4
        },
        {
          text: 'Last month',
          value: 5
        },
        {
          text: 'Last 90 days',
          value: 6
        },
        {
          text: 'Last 180 days',
          value: 7
        },
        {
          text: 'This year',
          value: 8
        },
        {
          text: 'Last year',
          value: 9
        }
      ],
      onFilter: (value, record) => {
        let flag = false
        switch (value) {
          case 1:
            // all time
            flag = true
            break
          case 2:
            // this week
            flag = isThisWeek(record.created)
            break
          case 3:
            // last week
            flag = isLastWeek(record.created)
            break
          case 4:
            // this month
            flag = isThisMonth(record.created)
            break
          case 5:
            // last month
            flag = isLastMonth(record.created)
            break
          case 6:
            // Last 90 days
            flag = islastdays(90, record.created)
            break
          case 7:
            // Last 180 days
            flag = islastdays(180, record.created)
            break
          case 8:
            // This year
            flag = isSameYear(record.created)
            break
          case 9:
            // Last year
            flag = isLastYear(record.created)
            break
          default:
            flag = true
        }
        return flag
      },
      render: (_, record) => <>{formatTimeStr(record.created, 'DD/MM/YYYY')}</>
    }
  ]
  return (
    <div className={styles.tableWrap}>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }}
        columns={columns}
        dataSource={data}
        onChange={tableChange}
        pagination={{
          showTotal: (total) => `Showing ${total} of ${data.length} deals`
        }}
        rowKey="id"
      />
      {showSelectedView && selectedRowKeys.length > 0 && (
        <Row className={styles.view} align="middle" justify="space-between">
          <Col>
            <span onClick={clearSelect} style={{ cursor: 'pointer' }}>
              <CloseOutlined />
            </span>
            <span className={styles.num}>
              {selectedRowKeys.length} items selected
            </span>
          </Col>
          <Col>
            <Button icon={<Icon name="view" />} onClick={() => handleExport()}>
              Export
            </Button>
          </Col>
        </Row>
      )}
      {isFilter && (
        <Button className={styles.exportBtn} onClick={() => exportFilter()}>
          Export
        </Button>
      )}
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

export default AssetsContact
