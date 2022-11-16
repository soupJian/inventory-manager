import React from 'react'
// components
import { Spin } from 'antd'

// main
const Loading = ({
  left = 0,
  right = 0,
  bottom = 0,
  top = 0,
  tip = 'Loading...',
  style
}) => {
  return (
    <Spin
      size="large"
      tip={tip}
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'fixed',
        left,
        right,
        bottom,
        top,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 9999,
        ...style
      }}
    />
  )
}

export default Loading
