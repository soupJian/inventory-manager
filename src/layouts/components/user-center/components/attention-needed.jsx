import React from 'react'
// components
import { Icon } from '../../../../components/commons'
// css
import styles from '../index.module.scss'
// main
const AttentionNeeded = ({ data }) => {
  return (
    <>
      {data.map((i) => {
        return (
          <div className={styles.timeline} key={i.time}>
            <div className={styles.timeTitle}>{i.time}</div>
            <div className={styles.timeContainer}>
              {i.list.map((item) => {
                return (
                  <div key={item.uid} className={styles.noticeWrap}>
                    <div className={styles.time}>{item.time}</div>
                    {/* 你的ticket或者deal被 别的 客服删除 */}
                    {item.noticeStatus == 1 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="idea" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              {item.type == 'deal' ? 'Deal' : 'Ticket'} deleted
                            </div>
                            <div className={styles.noticeName}>
                              <span
                                style={{
                                  textDecoration: `${
                                    item.deleted ? 'line-through' : 'none'
                                  }`,
                                  color: `${item.deleted ? '#000' : '#2C88DD'}`
                                }}
                              >
                                {item.type == 'deal' ? 'Deal' : 'Ticket'}:{' '}
                                {item.noticeName}
                              </span>
                              <span
                                style={{
                                  marginLeft: '5px',
                                  color: `${item.deleted ? '#2C88DD' : '#000'}`
                                }}
                              >
                                Restore
                              </span>
                            </div>
                            <div className={styles.description}>
                              Your owned{' '}
                              {item.type == 'deal' ? 'deal' : 'ticket'}was
                              deleted by {item.actionPerson}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 你的任务被删除 */}
                    {item.noticeStatus == 2 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="idea" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              Task deleted
                            </div>
                            <div className={styles.noticeName}>
                              <span
                                style={{
                                  textDecoration: `${
                                    item.deleted ? 'line-through' : 'none'
                                  }`,
                                  color: `${item.deleted ? '#000' : '#2C88DD'}`
                                }}
                              >
                                {item.type == 'deal' ? 'Deal' : 'Ticket'}:{' '}
                                {item.noticeName}
                              </span>
                              <span
                                style={{
                                  marginLeft: '5px',
                                  color: `${item.deleted ? '#2C88DD' : '#000'}`
                                }}
                              >
                                Restore
                              </span>
                            </div>
                            <div className={styles.description}>
                              {item.description}
                            </div>
                            <div className={styles.description}>
                              Your owned task was deleted by {item.actionPerson}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 邮寄标签已创建 */}
                    {item.noticeStatus == 3 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="idea" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              Label created
                            </div>
                            <div className={styles.noticeName}>
                              Ticket: {item.noticeName}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 有新的 ticket 或者 deal 分配 */}
                    {item.noticeStatus == 4 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="idea" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              Replacement shipped
                            </div>
                            <div className={styles.noticeName}>
                              Ticket: {item.noticeName}
                            </div>
                            <div className={styles.description}>
                              Warehouse sent a note
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 替换货物库存不足 */}
                    {item.noticeStatus == 5 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="idea" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              Replacement out of stock
                            </div>
                            <div className={styles.noticeName}>
                              Ticket: {item.noticeName}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 工厂收到寄回的货物，且留有 note */}
                    {item.noticeStatus == 6 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="idea" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              Returning package received
                            </div>
                            <div className={styles.noticeName}>
                              Ticket: {item.noticeName}
                            </div>
                            <div className={styles.description}>
                              Warehouse sent a note
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 新的订单，负责的 deal 顾客成功下单 */}
                    {item.noticeStatus == 7 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="idea" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              New order placed
                            </div>
                            <div className={styles.noticeName}>
                              Deal: {item.noticeName}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default AttentionNeeded
