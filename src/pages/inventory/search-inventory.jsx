import React from 'react'
import { withRouter } from 'next/router'
import { defaultInventoryItemsTableHeaders } from '@/constants/pageConstants/inventory'

import SearchInventory from '../../sections/search/search-inventory'
const SearchPage = ({ router }) => {
  return (
    <SearchInventory
      router={router}
      selectable={false}
      defaultTableHeaders={defaultInventoryItemsTableHeaders}
    />
  )
}

export default withRouter(SearchPage)
