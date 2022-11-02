// react next --------------
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// antd -----------
import { Tabs, Modal, Select } from 'antd'
// components -------------
import DetailHeader from '../../../sections/crm-hub/deals/detail/deatil-header'
import DetailTabs from '../../../sections/crm-hub/deals/detail/detail-tabs'
import DetailAction from '../../../sections/crm-hub/deals/detail/detail-action'
// css ------------
import styles from './index.module.scss'

const { Option } = Select

/*
 * 数据更新统一由 deal 子组件 调用 deal 页面内方
 * 跟新 update， 删除 delete
 */

const DealDetail = () => {
  // 如贵没有 ids 则取消进入页面
  const router = useRouter()
  const dealIdsStr = localStorage.getItem('dealIds')
  // 如果本地没有 ids 路由回到 deals列表页面
  if (!dealIdsStr) {
    router.replace('/crm-hub/deals')
  }
  const dealIds = JSON.parse(dealIdsStr)
  // promiseALL 数据
  const [data, setData] = useState([])
  // 当前激活的 tab
  const [activeKey, setActiveKey] = useState(null)
  const [activeDeal, setActiveDeal] = useState(null)
  // 需要删除的 deal tabs
  const [deleteKey, setDeleteKey] = useState(null)
  // 路由离开时候
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  // 切换tabs栏
  const handleChangeTabs = (key) => {
    setActiveKey(key)
  }
  // 获取数据
  const getData = () => {
    const dealInfo = {
      status: 'Close lost',
      amount: 6900,
      name: 'dealName',
      createTime: '5/11/2022',
      owner: 'cathy',
      interestProduct: [
        {
          id: 1,
          name: 'Custom Canopy Tent p5',
          quality: 1
        },
        {
          id: 2,
          name: 'Kapri Umbrella',
          quality: 2
        }
      ],
      source: 'FaceBook',
      customerType: 'existing',
      contact: [
        {
          id: 0,
          name: 'Kevin Bowden',
          email: 'kevinhb@myemail.com',
          phone: '123 456 7890',
          company: 'Great Canyon LLC'
        },
        {
          id: 1,
          name: 'soupjian123',
          email: 'soupjian@163.com',
          phone: '13479291739',
          company: '炜辰科技'
        }
      ]
    }
    const list = dealIds.map((item) => {
      return {
        title: dealInfo.name,
        key: item,
        value: dealInfo
      }
    })
    setData(list)
    setActiveKey(list[0].key)
  }
  // 删除某个 tabs edit 有新增和删除两种
  const onEdit = (targetKey, action) => {
    if (action == 'remove') {
      setShowChangeStatusModal(true)
      setDeleteKey(targetKey)
    }
  }
  const remove = (targetKey) => {
    let newActiveKey = activeKey
    let lastIndex = -1
    data.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newData = data.filter((item) => item.key !== targetKey)
    if (newData.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newData[lastIndex].key
      } else {
        newActiveKey = newData[0].key
      }
    }
    // 如果清空了，直接路由返回
    if (newData.length == 0) {
      router.replace('/crm-hub/deals')
    }
    setData(newData)
    setActiveKey(newActiveKey)
  }
  // 关闭 modal,删除对应的 tabs
  const handleCancel = () => {
    console.log(activeDeal)
    setShowChangeStatusModal(false)
    remove(deleteKey)
  }
  const handleChangStatus = () => {}
  const updateDeal = (dealInfo) => {
    // data遍历 然后匹配更新
    console.log(dealInfo)
  }

  useEffect(() => {
    getData()
    // 页面退出， 清除本地的 dealIds
    // return () => localStorage.removeItem('dealIds')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 当activeKey改变时候，就知道当前展示的是哪个deal
  useEffect(() => {
    if (activeKey) {
      const deal = data.filter((item) => item.key == activeKey)[0]
      setActiveDeal(deal.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey])

  return (
    <div className={styles.container}>
      <DetailHeader />
      {/* 如果只有一条数，那么就不展示 tabs */}
      {dealIds.length > 1 && (
        <Tabs
          hideAdd
          onChange={handleChangeTabs}
          activeKey={activeKey}
          type="editable-card"
          onEdit={onEdit}
          className={styles.dealTabs}
          items={data.map((item) => {
            return {
              label: item.title,
              key: item.key,
              children: (
                <div className={styles.content}>
                  <div className={styles.tabs}>
                    <DetailTabs dealInfo={item.value} />
                  </div>
                  <div className={styles.action}>
                    <DetailAction
                      dealInfo={item.value}
                      updateDeal={updateDeal}
                    />
                  </div>
                </div>
              )
            }
          })}
        ></Tabs>
      )}
      {data.length == 1 && (
        <div className={styles.content}>
          <div className={styles.tabs}>
            <DetailTabs dealInfo={data[0]?.value} />
          </div>
          <div className={styles.action}>
            <DetailAction dealInfo={data[0].value} updateDeal={updateDeal} />
          </div>
        </div>
      )}
      <Modal
        centered
        keyboard={false}
        maskClosable={false}
        title="Change status"
        open={showChangeStatusModal}
        okText="Save"
        onOK={() => handleChangStatus()}
        onCancel={() => handleCancel()}
      >
        <div style={{ marginBottom: '32px' }}>
          Do you want to change the status?
        </div>
        <Select
          style={{ width: '100%' }}
          value={activeDeal ? activeDeal.status : ''}
          onChange={(value) => setActiveDeal({ ...activeDeal, status: value })}
        >
          <Option value="Interest showed">Interest showed</Option>
          <Option value="Initial mockup">Initial mockup</Option>
          <Option value="Mockup revising">Mockup revising</Option>
          <Option value="Quote sent">Quote sent</Option>
          <Option value="Closed won">Closed won</Option>
          <Option value="Closed lost">Closed lost</Option>
        </Select>
      </Modal>
    </div>
  )
}

export default DealDetail
