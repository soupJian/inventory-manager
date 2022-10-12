import React from 'react'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'

const Loading = ({ collapsed }) => {
  const global = useSelector((store) => store.global)
  return (
    <Spin
      spinning={global.loading}
      tip="Loading..."
      style={{
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'fixed',
        minBlockSize: '100vh',
        left: collapsed ? '104px' : '231px',
        right: 0,
        bottom: 0,
        top: 0
      }}
    />
  )
}

export default Loading
