// react next -----------
import React from 'react'
// components
import { List } from 'antd'
// css
import styles from './index.module.scss'

// main
const FromEmailList = (props) => {
  const { emailList, selectedIndex, chooseSelectIndex } = props
  return (
    <div className={styles.list}>
      <List
        className=""
        itemLayout="horizontal"
        dataSource={emailList}
        renderItem={(item, index) => (
          <div
            onClick={() => chooseSelectIndex(index)}
            className={index == selectedIndex ? `${styles.active}` : ''}
          >
            <List.Item className={styles.item}>
              <List.Item.Meta
                avatar={
                  <div
                    style={{
                      background:
                        item.emailAddress == 'inquiry@westshade.com'
                          ? '#2C88DD'
                          : '#2EBEBD'
                    }}
                    className={styles.avatar}
                  >
                    {item.emailAddress[0].toUpperCase()}
                  </div>
                }
                title={<span>{item.title}</span>}
                description={item.emailAddress}
              />
            </List.Item>
          </div>
        )}
      ></List>
    </div>
  )
}

export default FromEmailList
