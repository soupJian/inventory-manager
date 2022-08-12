// react next -----------
import React, { useEffect, useState } from 'react'
// antd -------------
import { Table, Tabs } from 'antd'
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
import { currentSize, columns } from './util'
const { TabPane } = Tabs

// main FC ---------------------------------------------------------------------------------
const DealsTabs = () => {
  // 表格分页 设置
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    current: 1
  })
  // 当前展示多少条
  const [currentShowList, setCurrentShowList] = useState(0)
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
    setPagination(pagination)
    setCurrentShowList(extra.currentDataSource.length)
    // console.log('params', pagination, filters, sorter, extra)
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
      }
    ]
    setData(list)
    setPagination({
      ...pagination,
      current: 1,
      total: list.length
    })
    setCurrentShowList(
      currentSize(pagination.current, list.length, pagination.pageSize)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
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
          columns={columns}
          dataSource={data}
          onChange={tableChange}
          pagination={{
            ...pagination,
            showTotal: (total) => `Showing ${currentShowList} of ${total} deals`
          }}
        />
      </div>
    </div>
  )
}

export default DealsTabs
