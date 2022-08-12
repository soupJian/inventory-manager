// react next ----------
import React from 'react'
import Head from 'next/head'
// components ---------
import DealsHeader from '../../../sections/crm-hub/deals/deals-header'
import DealsTabs from '../../../sections/crm-hub/deals/deals-tabs'

const Deals = () => {
  return (
    <>
      <Head>
        <title>CRM Hub | Deals</title>
      </Head>
      <DealsHeader />
      <DealsTabs />
    </>
  )
}

export default Deals
