import React from 'react'
import { withRouter } from 'next/router'
import InvebtoryItem from '../../sections/detail/item'

const Item = ({ router }) => {
  return <InvebtoryItem router={router} />
}

export default withRouter(Item)
