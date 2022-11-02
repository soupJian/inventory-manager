import React from 'react'
// components
import { Icon } from '../../../../components/commons'
// css
import styles from '../index.module.scss'

// main
const TimeSensitive = ({ data }) => {
  console.log(data)
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
                    {/*  任务即将截止 提示 还有多少时间 */}
                    {item.noticeStatus == 1 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="clock-alarm" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              Task due in
                            </div>
                            <div className={styles.noticeName}>
                              {item.type == 'deal' ? 'Deal' : 'Ticket'}:{' '}
                              {item.noticeName}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 任务过期未完成 */}
                    {item.noticeStatus == 2 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="clock-alarm" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              Task overdue
                            </div>
                            <div className={styles.noticeName}>
                              {item.type == 'deal' ? 'Deal' : 'Ticket'}:{' '}
                              {item.noticeName}
                            </div>
                            <div className={styles.description}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 收到新邮件 */}
                    {item.noticeStatus == 3 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="clock-alarm" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              New email received
                            </div>
                            <div className={styles.noticeName}>
                              {item.type == 'deal' ? 'Deal' : 'Ticket'}:{' '}
                              {item.noticeName}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 有新的 ticket 或者 deal 分配 */}
                    {item.noticeStatus == 4 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="clock-alarm" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              New {item.type == 'deal' ? 'deal' : 'ticket'}{' '}
                              assigned
                            </div>
                            <div className={styles.noticeName}>
                              {item.type == 'deal' ? 'Deal' : 'Ticket'}:{' '}
                              {item.noticeName}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 有新的任务 */}
                    {item.noticeStatus == 5 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="clock-alarm" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              New task assigned
                            </div>
                            <div className={styles.noticeName}>
                              {item.type == 'deal' ? 'Deal' : 'Ticket'}:{' '}
                              {item.noticeName}
                            </div>
                            <div className={styles.description}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 如果 deal 或者 ticket 收到新邮件 但超过一天未读 */}
                    {item.noticeStatus == 6 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="clock-alarm" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              Reply to email
                            </div>
                            <div className={styles.noticeName}>
                              {item.type == 'deal' ? 'Deal' : 'Ticket'}:{' '}
                              {item.noticeName}
                            </div>
                            <div className={styles.description}>
                              A new email was received one day ago.
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* 收到 别的客服 通知  邮件的发送者出现在另外一个 deal 或者 ticket 中 */}
                    {item.noticeStatus == 7 && (
                      <>
                        <div className={styles.notice}>
                          <Icon name="clock-alarm" width="18px" height="18px" />
                          <div>
                            <div
                              className={styles.noticeHeader}
                              style={{
                                color: `${item.read ? '#999' : '#000'}`
                              }}
                            >
                              Email needs action
                            </div>
                            <div className={styles.noticeName}>Check email</div>
                            <div className={styles.description}>
                              You were notified to take action on an email
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

export default TimeSensitive
