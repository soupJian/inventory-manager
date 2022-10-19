import React from 'react'
import { Input } from 'antd'
// const { Panel } = Collapse

const CollapsePanel = (props) => {
  const { Panel, item, activeCollapse } = props
  return (
    <Panel
      header={
        activeCollapse.includes(`${item.id}`) ? (
          <Input
            value={item.title}
            onClick={(e) => {
              e.stopPropagation()
            }}
            style={{ width: '400px' }}
          />
        ) : (
          `${item.title}`
        )
      }
    >
      <Input.TextArea
        autoSize
        style={{ minHeight: '100px' }}
        value={item.content}
      />
    </Panel>
  )
}

export default CollapsePanel
