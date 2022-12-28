// react next -----------
import React, { memo } from "react"
// components
import { List, Divider, Skeleton } from "antd"
import InfiniteScroll from "react-infinite-scroll-component"
// css
import styles from "./index.module.less"

// main
const FromEmailList = ({
  emailList,
  selectedIndex,
  chooseSelectIndex,
  loadMoreData,
  hasMore
}) => {
  return (
    <div className={styles.list} id="scrollableDiv">
      <InfiniteScroll
        dataLength={emailList.length}
        next={loadMoreData}
        hasMore={hasMore}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          className=""
          itemLayout="horizontal"
          dataSource={emailList}
          renderItem={(item, index) => (
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
        ></List>
      </InfiniteScroll>
    </div>
  )
}

export default memo(FromEmailList)
