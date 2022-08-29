import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col } from 'antd'
import UpDownCard from '../../../sections/crm-hub/dashboard/up-down-card'
import PieTotalOpenDeals from '../../../sections/crm-hub/dashboard/pie-total-open-deals'
import styles from './index.module.scss'

const Dashboard = () => {
  const [upDownList, setUpDownList] = useState([])
  // 头部 数据
  const getupDownList = () => {
    const list = [
      {
        background: '#D5F2F2',
        iconName: 'new-deals',
        num: 1024,
        color: '#2EBEBD',
        precent: '28',
        isup: true,
        description: 'New deals this month'
      },
      {
        background: '#D5E7F8',
        iconName: 'sales',
        num: 139,
        color: '#2C88DD',
        precent: '12',
        isup: false,
        description: 'Sales this month'
      },
      {
        background: '#FFE5E5',
        iconName: 'sale-amount',
        num: 1024,
        color: '#FF7B7B',
        precent: '28',
        isup: true,
        description: 'Sale amount this month'
      },
      {
        background: '#FEF2E0',
        iconName: 'conversion',
        num: 139,
        color: '#F69400',
        precent: '12',
        isup: false,
        description: 'Conversion this month'
      }
    ]
    setUpDownList(list)
  }
  // 渲染数据
  useEffect(() => {
    getupDownList()
  }, [])
  return (
    <>
      <Head>
        <title>CRM Hub | Dashboard</title>
      </Head>
      <div className={styles.dashboard}>
        <div className={styles.title}>Dashboard</div>
        <Row gutter={24}>
          {upDownList.map((item) => {
            return (
              <Col span={6} key={item.iconName}>
                <UpDownCard
                  background={item.background}
                  iconName={item.iconName}
                  num={item.num}
                  color={item.color}
                  precent={item.precent}
                  isup={item.isup}
                  description={item.description}
                />
              </Col>
            )
          })}
        </Row>
        <Row gutter={24} style={{ marginTop: '24px' }}>
          <Col span={12}>
            <PieTotalOpenDeals />
          </Col>
          <Col span={12}>
            <PieTotalOpenDeals />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard
