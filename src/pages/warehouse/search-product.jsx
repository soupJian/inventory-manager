import React from 'react'
import { withRouter } from 'next/router'
import SearchProduct from '../../sections/search/search-product'
const SearchPage = ({ router }) => {
  return (
    <SearchProduct
      router={router}
      selectable={true}
      noShowExpand={true}
      rowClick={(SKU) => {
        router.push(`/warehouse/product?sku=${SKU}`)
      }}
    />
  )
}

export default withRouter(SearchPage)
