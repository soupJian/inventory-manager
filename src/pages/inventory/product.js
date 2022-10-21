import React from 'react'
import { withRouter } from 'next/router'
import InvebtoryProduct from '../../sections/detail/product'

const Product = ({ router }) => {
  return <InvebtoryProduct router={router} />
}

export default withRouter(Product)
