import React from 'react'
import { withRouter } from 'next/router'
// components
import InvebtoryItem from '@/sections/detail/item'

// main
const Item = ({ router }) => {
  return <InvebtoryItem router={router} />
}

export default withRouter(Item)
