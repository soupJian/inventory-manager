import React from 'react'
import { withRouter } from 'next/router'

import SearchInventory from '../../sections/search/search-inventory'
const SearchPage = ({ router }) => {
  return <SearchInventory router={router} />
}

export default withRouter(SearchPage)
