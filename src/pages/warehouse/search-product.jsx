import React from 'react'
import { withRouter } from 'next/router'
// components
import SearchProduct from '@/sections/search/search-product'
// js
import { defaultWarehouseProductsTableHeaders } from '@/constants/pageConstants/products'

// main
const SearchPage = ({ router }) => {
  return (
    <SearchProduct
      router={router}
      selectable={true}
      noShowExpand={true}
      rowClick={(SKU) => {
        router.push(`/warehouse/product?sku=${SKU}`)
      }}
      defaultTableHeaders={defaultWarehouseProductsTableHeaders}
    />
  )
}

export default withRouter(SearchPage)
