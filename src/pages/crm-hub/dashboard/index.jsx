import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col } from 'antd'
import UpDownCard from '../../../sections/crm-hub/dashboard/up-down-card'
import PieTotalOpenDeals from '../../../sections/crm-hub/dashboard/pie-total-open-deals'
import LineSale from '../../../sections/crm-hub/dashboard/line-sale'
import DealsLostIn from '../../../sections/crm-hub/dashboard/deals-lost-in'
import DealsSource from '../../../sections/crm-hub/dashboard/deals-source'
import NewContact from '../../../sections/crm-hub/dashboard/new-contact'
import BestSellers from '../../../sections/crm-hub/dashboard/best-sellers'
import NoOfSales from '../../../sections/crm-hub/dashboard/no-of-sales'
import NoofSalesAmount from '../../../sections/crm-hub/dashboard/no-of-sales-amount'
import * as echarts from 'echarts'

import styles from './index.module.scss'

const Dashboard = () => {
  // 头部面板数据
  const [upDownList, setUpDownList] = useState([])
  const [pieData, setPieData] = useState([])
  // deals lost in 数据
  const [lostIn, setLostIn] = useState([])
  // best sellers
  const [BestSellersList, setBestSellersList] = useState([])
  // sales range
  const [salesRange, setSalesRange] = useState([])
  // no of sales amount
  const [noSales, setNosales] = useState([])
  const [salesAmount, setSalesAmount] = useState([])
  // 底部数据
  const [footerLsit, setFooterList] = useState([])
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
  // pieData
  const getPieData = () => {
    const list = [
      { value: 1048, name: 'Interest showed' },
      { value: 735, name: 'Initial mockup' },
      { value: 580, name: 'Mockup revising' },
      { value: 580, name: 'Invoice sent' },
      { value: 484, name: 'Closed won' },
      { value: 300, name: 'Closed lost' }
    ]
    setPieData(list)
  }
  // deals lost in
  const getDealsLostIn = () => {
    const list = [
      {
        name: 'Interest showed',
        precent: 48,
        isup: true,
        value: 25
      },
      {
        name: 'Initial mockup',
        precent: 48,
        isup: false,
        value: 12
      },
      {
        name: 'Mockup revising',
        precent: 48,
        isup: false,
        value: 12
      },
      {
        name: 'Invoice sent',
        precent: 48,
        isup: true,
        value: 25
      }
    ]
    setLostIn(list)
  }
  // best sellers
  const getBestSellers = () => {
    const list = [
      {
        rank: '01',
        name: 'Custom canopy tent p4',
        sales: '32%'
      },
      {
        rank: '02',
        name: 'Custom canopy tent p4',
        sales: '32%'
      },
      {
        rank: '03',
        name: 'Custom canopy tent p4',
        sales: '32%'
      },
      {
        rank: '04',
        name: 'Custom canopy tent p4',
        sales: '32%'
      },
      {
        rank: '05',
        name: 'Custom canopy tent p4',
        sales: '32%'
      }
    ]
    setBestSellersList(list)
  }
  // sales range
  const getSalesRange = () => {
    const list = [186, 279, 142]
    setSalesRange(list)
  }
  // no of sales & sales amount
  const getNoSalesAmount = () => {
    const barOneData = [
      242, 210, 290, 210, 340, 380, 240, 380, 210, 240, 380, 320
    ]
    const barTwoData = [36, 44, 37, 57, 60, 68, 34, 49, 24, 57, 39, 50]
    setNosales(barOneData)
    setSalesAmount(barTwoData)
  }
  // footer list
  const getFooterList = () => {
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
        description: 'No. of calls received'
      },
      {
        background: '#FFE5E5',
        iconName: 'sale-amount',
        num: 1024,
        color: '#FF7B7B',
        precent: '28',
        isup: true,
        description: 'No. of chats'
      },
      {
        background: '#FEF2E0',
        iconName: 'conversion',
        num: 139,
        color: '#F69400',
        precent: '12',
        isup: false,
        description: 'No. of tasks'
      }
    ]
    setFooterList(list)
  }
  // 渲染数据
  useEffect(() => {
    // 头部面板数据
    getupDownList()
    // echarts pie数据
    getPieData()
    // deal Source 数据
    // new contact数据
    // deals lost in 数据
    getDealsLostIn()
    // best sellers
    getBestSellers()
    // sales range
    getSalesRange()
    // no of sales & sales amount
    getNoSalesAmount()
    // footer list
    getFooterList()
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
                  format={true}
                />
              </Col>
            )
          })}
        </Row>
        <Row gutter={24} style={{ marginTop: '24px' }}>
          <Col span={12}>
            {pieData.length > 0 && (
              <PieTotalOpenDeals echarts={echarts} data={pieData} />
            )}
          </Col>
          <Col span={12}>
            <LineSale echarts={echarts} />
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: '24px' }}>
          <Col span={8}>
            <DealsSource />
          </Col>
          <Col span={4}>
            <NewContact />
          </Col>
          <Col span={12}>
            <DealsLostIn lostIn={lostIn} />
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: '24px' }}>
          <Col span={12}>
            <BestSellers BestSellersList={BestSellersList} />
          </Col>
          {salesRange.length > 0 && (
            <Col span={12}>
              <NoOfSales salesRange={salesRange} echarts={echarts} />
            </Col>
          )}
        </Row>
        {noSales.length > 0 && salesAmount.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <NoofSalesAmount
              echarts={echarts}
              noSales={noSales}
              salesAmount={salesAmount}
            />
          </div>
        )}
        <Row gutter={24} style={{ marginTop: '24px' }}>
          {footerLsit.map((item) => {
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
      </div>
    </>
  )
}

export default Dashboard
