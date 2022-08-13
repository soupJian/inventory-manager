// react next ----------
import React, { useState } from 'react'
import Head from 'next/head'
// components ---------
import DealsHeader from '../../../sections/crm-hub/deals/deals-header'
import DealsTabs from '../../../sections/crm-hub/deals/deals-tabs'

const Deals = () => {
  const [shouListType, setShpwListType] = useState('menu')
  const changeShowListType = (type) => {
    // menu（表格） filter(分类)
    setShpwListType(type)
  }
  return (
    <>
      <Head>
        <title>CRM Hub | Deals</title>
      </Head>
      <DealsHeader
        changeShowListType={changeShowListType}
        shouListType={shouListType}
      />
      <DealsTabs shouListType={shouListType} />
    </>
  )
}

export default Deals
