// react next ----------
import React, { useState } from 'react'
import Head from 'next/head'
// components ---------
import DealsHeader from '../../../sections/crm-hub/deals/index/deals-header'
import DealsTabs from '../../../sections/crm-hub/deals/index/deals-tabs'

const Deals = () => {
  const [showListType, setShowListType] = useState('menu')
  const changeShowListType = (type) => {
    // menu（表格） filter(分类)
    setShowListType(type)
  }
  return (
    <>
      <Head>
        <title>CRM Hub | Deals</title>
      </Head>
      <DealsHeader
        changeShowListType={changeShowListType}
        showListType={showListType}
      />
      <DealsTabs showListType={showListType} />
    </>
  )
}

export default Deals
