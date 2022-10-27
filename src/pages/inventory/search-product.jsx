import React from 'react'
import { withRouter } from 'next/router'
import SearchProduct from '../../sections/search/search-product'
import { defaultInventoryProductsTableHeaders } from '../../constants/pageConstants/products'

const SearchPage = ({ router }) => {
  return (
    <SearchProduct
      router={router}
      selectable={false}
      defaultTableHeaders={defaultInventoryProductsTableHeaders}
    />
  )
}

export default withRouter(SearchPage)
