// react next -----------
import React, { useEffect, useState } from 'react'
// antd -------------
import { Table, Tabs, Row, Col } from 'antd'
// components ------------
import DealsFilter from './deals-filter'
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
const DealsTabs = ({ shouListType }) => {
  // 表格数据
  const [data, setData] = useState([])
  // 选择的表格数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // 切换标签页
  const changeTabs = (key) => {
    console.log(key)
  }
  // 切换表格数据展示
  const tableChange = (pagination, filters, sorter, extra) => {
    // 总共有多少页
    console.log(extra)
    // const totalPage = Math.ceil(pagination.total / pagination.pageSize)
    // if (pagination.current < totalPage) {
    //   setCurrentShowList(pagination.pageSize)
    // } else {
    //   setCurrentShowList(
    //     pagination.total - (pagination.current - 1) * pagination.pageSize
    //   )
    // }
    // setPagination(pagination)
  }
  // 选择表格 checkbox 的事件
  const onSelectChange = (newSelectedRowKeys) => {
    // 对应的 key 数组 [1,2,3,4,6] 也就是对应的 id数组
    console.log(newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
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
        status: 'Initial Mockup',
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
        status: 'Invoice sent',
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
        status: 'Interest showed',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {shouListType == 'menu' && (
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
              onChange={tableChange}
              pagination={{
                showTotal: (total) => `Showing ${total} of ${data.length} deals`
              }}
            />
          </div>
        </div>
      )}
      {shouListType == 'filter' && (
        // 过滤数据采用 table 表格筛选过滤数据，自定义太麻烦，头痛
        <div className={styles['deals-content-wrap']}>
          <div className={styles['deals-content-filter']}>
            <Table
              columns={filterColumns}
              dataSource={data}
              onChange={tableChange}
              pagination={false}
            />
          </div>
          <div className={styles.filterWrap}>
            <Row className={styles.row} gutter={10}>
              <Col span={4}>
                <DealsFilter />
              </Col>
              <Col span={4}>
                <DealsFilter />
              </Col>
              <Col span={4}>
                <DealsFilter />
              </Col>
              <Col span={4}>
                <DealsFilter />
              </Col>
              <Col span={4}>
                <DealsFilter />
              </Col>
              <Col span={4}>
                <DealsFilter />
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  )
}

export default DealsTabs
