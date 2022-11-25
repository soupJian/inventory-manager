import React from "react"
import { withRouter } from "next/router"
import MySearchHistory from "@/sections/orders/search-history"

const SearchHistory = ({ router }) => {
  return <MySearchHistory router={router} />
}

export default withRouter(SearchHistory)
