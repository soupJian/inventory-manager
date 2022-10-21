import React from 'react'
import { withRouter } from 'next/router'
import SearchProduct from '../../sections/search/search-product'
const SearchPage = ({ router }) => {
  return <SearchProduct router={router} />
}

export default withRouter(SearchPage)
