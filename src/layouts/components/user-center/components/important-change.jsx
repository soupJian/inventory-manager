import React from 'react'
// components
import { Icon } from '../../../../components/commons'
// css
import styles from '../index.module.scss'

// main
const ImportantChange = ({ data }) => {
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
                    {/* // 任务即将截止 提示 还有多少时间 */}
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
                              Task assignee changed
                            </div>
                            <div className={styles.noticeName}>
                              {item.type == 'deal' ? 'Deal' : 'Ticket'}:{' '}
                              {item.noticeName}
                            </div>
                            <div className={styles.description}>
                              The assignee was changed from you to{' '}
                              {item.toPerson} by {item.actionPerson}
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
                              Owner changed
                            </div>
                            <div className={styles.noticeName}>
                              {item.type == 'deal' ? 'Deal' : 'Ticket'}:{' '}
                              {item.noticeName}
                            </div>
                            <div className={styles.description}>
                              The owner was changed from you to {item.toPerson}{' '}
                              by {item.actionPerson}
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
                              Access change
                            </div>
                            <div className={styles.description}>
                              Your access has been changed from{' '}
                              {item.beforeAccess} to {item.access}
                              by {item.actionPerson}
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

export default ImportantChange
