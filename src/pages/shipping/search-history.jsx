import React from "react"
import { withRouter } from "next/router"
import MySearchHistory from "@/sections/shipping/search-history"

const SearchHistory = ({ router }) => {
  return <MySearchHistory router={router} />
}

export default withRouter(SearchHistory)
