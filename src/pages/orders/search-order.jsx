import React from "react"
import { withRouter } from "next/router"
import MySearchOrder from "@/sections/orders/search-order"

const SearchOrder = ({ router }) => {
  return <MySearchOrder router={router} />
}

export default withRouter(SearchOrder)
