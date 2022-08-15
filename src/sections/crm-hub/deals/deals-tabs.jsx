// react next -----------
import React, { useEffect, useState } from 'react'
// antd -------------
import { Table, Tabs, Row, Col, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
// components ------------
import DealsFilter from './deals-filter'
import Icon from '../../../components/commons/icons/Icon'
// css ----------
import styles from './index.module.scss'
// table 组件 导入，由于 next 按需导入机制 只导入了 table 样式 需要手动导入 其他样式
import 'antd/lib/dropdown/style/index.css'
import 'antd/lib/pagination/style/index.css'
import 'antd/lib/checkbox/style/index.css'
import 'antd/lib/input/style/index.css'
import 'antd/lib/button/style/index.css'
import 'antd/lib/checkbox/style/index.css'
// js ---------
import { menuColumns, filterColumns } from './util'
const { TabPane } = Tabs

// main FC ---------------------------------------------------------------------------------
const DealsTabs = ({ showListType }) => {
  // 表格数据
  const [data, setData] = useState([])
  // 选择的表格数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [filterData, setFilterData] = useState([])
  // 展示选中的 表格 数目
  const [showSelectedView, setShowTSelectedView] = useState(false)
  // 切换标签页
  const changeTabs = (key) => {
    console.log(key)
  }
  // menu 状态表格筛选
  const tableMenuChange = (pagination, filters, sorter, extr) => {}
  // filter状态表格筛选
  const tableFilterChange = (pagination, filters, sorter, extra) => {
    // 过滤后的数据
    // console.log(extra.currentDataSource)
    setFilterData(extra.currentDataSource)
  }

  // 选择表格 checkbox 的事件
  const onSelectChange = (newSelectedRowKeys) => {
    // 对应的 key 数组 [1,2,3,4,6] 也就是对应的 id数组
    console.log(newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
    // 如果选中 数目 > 0 展示 view
    if (newSelectedRowKeys.length > 0) {
      setShowTSelectedView(true)
    }
  }
  // 清除已选择
  const clearSelect = () => {
    setSelectedRowKeys([])
    setShowTSelectedView(false)
  }
  useEffect(() => {
    const list = [
      {
        key: '1',
        dealName: 'Derrick Person',
        status: 'Interest showed',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 200,
        createDate: '2022/08/11',
        assignee: 'Cathy'
      },
      {
        key: '2',
        dealName: 'Derrick Person',
        status: 'Mockup sent',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 600,
        createDate: '2022/08/10',
        assignee: 'Cathy'
      },
      {
        key: '3',
        dealName: 'Derrick Person',
        status: 'Mockup revising',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 800,
        createDate: '2022/08/09',
        assignee: 'Cathy'
      },
      {
        key: '4',
        dealName: 'Derrick Person',
        status: 'Quote sent',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 900,
        createDate: '2022/08/01',
        assignee: 'Cathy'
      },
      {
        key: '5',
        dealName: 'Derrick Person',
        status: 'Closed won',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 1600,
        createDate: '2022/07/25',
        assignee: 'Cathy'
      },
      {
        key: '6',
        dealName: 'Derrick Person',
        status: 'Closed lost',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 1400,
        createDate: '2022/08/12',
        assignee: 'Cathy'
      },
      {
        key: '7',
        dealName: 'Derrick Person',
        status: 'Interest showed',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 200,
        createDate: '2022/08/11',
        assignee: 'Cathy'
      },
      {
        key: '8',
        dealName: 'Derrick Person',
        status: 'Interest showed',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 600,
        createDate: '2022/08/10',
        assignee: 'Cathy'
      },
      {
        key: '9',
        dealName: 'Derrick Person',
        status: 'Interest showed',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 800,
        createDate: '2022/08/09',
        assignee: 'Cathy'
      },
      {
        key: '10',
        dealName: 'Derrick Person',
        status: 'Interest showed',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 900,
        createDate: '2022/08/01',
        assignee: 'Cathy'
      },
      {
        key: '11',
        dealName: 'Derrick Person',
        status: 'Interest showed',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 1600,
        createDate: '2022/07/25',
        assignee: 'Cathy'
      },
      {
        key: '12',
        dealName: 'Derrick Person',
        status: 'Interest showed',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 1400,
        createDate: '2022/08/12',
        assignee: 'Cathy'
      },
      {
        key: '13',
        dealName: 'Derrick Person',
        status: 'Interest showed',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 800,
        createDate: '2022/08/09',
        assignee: 'Cathy'
      },
      {
        key: '14',
        dealName: 'Derrick Person',
        status: 'Interest showed',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 900,
        createDate: '2022/08/01',
        assignee: 'Cathy'
      },
      {
        key: '15',
        dealName: 'Derrick Person',
        status: 'Interest showed',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 1600,
        createDate: '2022/07/25',
        assignee: 'Cathy'
      },
      {
        key: '16',
        dealName: 'Derrick Person',
        status: 'Interest showed',
        customerType: 'New',
        interest: 'Canopy tent p2',
        amount: 1400,
        createDate: '2022/08/12',
        assignee: 'Cathy'
      }
    ]
    setData(list)
    setFilterData(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {showListType == 'menu' && (
        <div className={styles['deals-content-wrap']}>
          <Tabs onChange={changeTabs} type="card" tabBarGutter={0}>
            <TabPane tab="My open deals" key="1"></TabPane>
            <TabPane tab="My deals w/ new emails" key="2"></TabPane>
            <TabPane tab="My deals w/ task due" key="3"></TabPane>
            <TabPane tab="All deals" key="4"></TabPane>
          </Tabs>
          <div className={styles['deals-content']}>
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: onSelectChange
              }}
              columns={menuColumns}
              dataSource={data}
              onChange={tableMenuChange}
              pagination={{
                showTotal: (total) => `Showing ${total} of ${data.length} deals`
              }}
            />
          </div>
          {selectedRowKeys.length > 0 && (
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
                <Button icon={<Icon name="view" />}>View</Button>
              </Col>
            </Row>
          )}
        </div>
      )}
      {showListType == 'filter' && (
        // 过滤数据采用 table 表格筛选过滤数据，自定义太麻烦，头痛
        <div className={styles['deals-content-wrap']}>
          <div className={styles['deals-content-filter']}>
            <Table
              columns={filterColumns}
              dataSource={data}
              onChange={tableFilterChange}
              pagination={false}
            />
          </div>
          <div className={styles.filterWrap}>
            <Row className={styles.row} gutter={[10, 10]} wrap={false}>
              <Col>
                <DealsFilter filterData={filterData} status="Interest showed" />
              </Col>
              <Col>
                <DealsFilter filterData={filterData} status="Mockup sent" />
              </Col>
              <Col>
                <DealsFilter filterData={filterData} status="Mockup revising" />
              </Col>
              <Col>
                <DealsFilter filterData={filterData} status="Quote sent" />
              </Col>
              <Col>
                <DealsFilter filterData={filterData} status="Closed won" />
              </Col>
              <Col>
                <DealsFilter filterData={filterData} status="Closed lost" />
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  )
}

export default DealsTabs
