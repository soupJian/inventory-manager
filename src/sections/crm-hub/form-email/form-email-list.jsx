// react next -----------
import React, { memo } from "react"
// components
import { List } from "antd"
// import InfiniteScroll from "react-infinite-scroll-component"
import VirtualList from "rc-virtual-list"
// css
import styles from "./index.module.less"

// main
const FromEmailList = ({ emailList, selectedIndex, chooseSelectIndex }) => {
  return (
    <div className={styles.list}>
      <List>
        <VirtualList data={emailList} itemKey="id">
          {(item, index) => (
            <div
              onClick={() => chooseSelectIndex(index)}
              className={index == selectedIndex ? `${styles.active}` : ""}
            >
              <List.Item className={styles.item}>
                <List.Item.Meta
                  avatar={
                    <div
                      style={{
                        background:
                          item.email == "inquiry@westshade.com"
                            ? "#2C88DD"
                            : "#2EBEBD"
                      }}
                      className={styles.avatar}
                    >
                      {item.email[0].toUpperCase()}
                    </div>
                  }
                  title={<span>{item.title}</span>}
                  description={item.email}
                />
              </List.Item>
            </div>
          )}
        </VirtualList>
      </List>
    </div>
  )
}

export default memo(FromEmailList)
