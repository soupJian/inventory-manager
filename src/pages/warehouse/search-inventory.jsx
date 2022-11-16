import React from 'react'
import { withRouter } from 'next/router'
// components
import SearchInventory from '@/sections/search/search-inventory'
// js
import { defaultWarehouseItemsTableHeaders } from '@/constants/pageConstants/inventory'

// main
const SearchPage = ({ router }) => {
  return (
    <SearchInventory
      router={router}
      selectable={true}
      noShowExpand={true}
      rowClick={(SKU) => {
        router.push(`/warehouse/item?sku=${SKU}`)
      }}
      defaultTableHeaders={defaultWarehouseItemsTableHeaders}
    />
  )
}

export default withRouter(SearchPage)
