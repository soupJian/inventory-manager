import React from 'react'
import { withRouter } from 'next/router'
// components
import InvebtoryProduct from '../../sections/detail/product'

// main
const Product = ({ router }) => {
  return <InvebtoryProduct router={router} />
}

export default withRouter(Product)
