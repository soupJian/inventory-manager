import React, { useState, useEffect } from 'react'
// components
import { Row, Col, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  StatusOne,
  StatusTwo,
  StatusThree,
  StatusFour,
  StatusFive,
  StatusSix,
  StatusSeven,
  StatusEight
} from './timeline/status'
// css
import styles from './timeline.module.less'

// main
const DetailTimeLine = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const list = [
      {
        id: 1,
        type: 1,
        actionPerson: 'Cathy',
        toPerson: 'Neela',
        time: '5/27/2022 9:21 AM'
      },
      {
        id: 2,
        type: 2,
        actionPerson: 'Cathy',
        time: '5/27/2022 9:21 AM',
        note: 'This is the note example. This is the note example. This is the note example.Remember to remind the client to take a look at the revised mockup based on the suggestions from the client and also check the quote sent.'
      },
      {
        id: 3,
        type: 3,
        actionPerson: 'Cathy',
        time: '5/27/2022 9:21 AM',
        status: 'MockUp revising'
      },
      {
        id: 4,
        type: 4,
        time: '28/08/2022 10:00 AM',
        title: 'Remind the client to check the mockup and quote',
        reminder: '1 day before',
        detail:
          'Remember to make the new mockup based on the suggestions from the client and send it to the client.',
        taskStatus: 0 // 0 表示已完成 1 未完成
      },
      {
        id: 5,
        type: 5,
        actionPerson: 'Cathy',
        name: 'Kevin Bowden',
        phone: '13479291739',
        time: '5/27/2022 9:21 AM',
        status: 'Answered',
        notes: 'No note'
      },
      {
        id: 6,
        type: 6,
        actionPerson: 'Cathy',
        phone: '13479291739',
        time: '5/27/2022 9:21 AM',
        status: 'Answered',
        notes:
          'Interested in custom tent package; running restaurant, dining outside needs tents  may purchase 7 to 10 tents'
      },
      {
        id: 7,
        type: 7,
        actionPerson: 'Cathy',
        time: '5/27/2022 9:21 AM',
        name: 'Kevin Bowden',
        phone: '13479291739',
        status: 'Disconnected',
        summary:
          'Interested in custom tent package; running restaurant, dining outside needs tents  may purchase 7 to 10 tents'
      },
      {
        id: 8,
        type: 8,
        actionPerson: 'Cathy',
        time: '5/27/2022 9:21 AM'
      }
    ]
    setData(list)
  }, [])
  return (
    <div className={styles.timelineWrap}>
      <Row justify="space-between" className={styles['timeline-search-wrap']}>
        <Col>
          <Input
            placeholder="search task"
            prefix={<SearchOutlined />}
            allowClear
          />
        </Col>
      </Row>
      <div className={styles.weekContainer}>
        <div className={styles.weekTitle}>THIS WEEK</div>
        <div className={styles.weekContent}>
          {data.map((item) => {
            return (
              <div key={item.id} className={styles.contentItem}>
                {/* 状态一： deal 分配给另一个客服时候  */}
                {item.type == 1 && <StatusOne item={item} />}
                {/* 状态二 deal 中 添加 了一个 note */}
                {item.type == 2 && <StatusTwo item={item} />}
                {/* 状态三 客服修改 status 时候*/}
                {item.type == 3 && <StatusThree item={item} />}
                {/* 状态四 显示任务展开的全部内容*/}
                {item.type == 4 && <StatusFour item={item} />}
                {/* 状态五 当客服打了一个电话后，如果电话号码是有记录的联系人，显示联系人，没有联系人，显示号码，点击 Call contact 拨打号码*/}
                {item.type == 5 && <StatusFive item={item} />}
                {/* 状态六 客服接听电话，create或者assign 一个 deal， 显示人名或者号码 */}
                {item.type == 6 && <StatusSix item={item} />}
                {/* 状态七 客服与客户聊天结束 create 或者 assign 一个 deal*/}
                {item.type == 7 && <StatusSeven item={item} />}
                {/* 一个deal 刚被创建时候 */}
                {item.type == 8 && <StatusEight item={item} />}
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.weekContainer}>
        <div className={styles.weekTitle}>LAST WEEK</div>
        <div className={styles.weekContent}>
          {data.map((item) => {
            return (
              <div key={item.id} className={styles.contentItem}>
                {/* 状态一： deal 分配给另一个客服时候  */}
                {item.type == 1 && <StatusOne item={item} />}
                {/* 状态二 deal 中 添加 了一个 note */}
                {item.type == 2 && <StatusTwo item={item} />}
                {/* 状态三 客服修改 status 时候*/}
                {item.type == 3 && <StatusThree item={item} />}
                {/* 状态四 显示任务展开的全部内容*/}
                {item.type == 4 && <StatusFour item={item} />}
                {/* 状态五 当客服打了一个电话后，如果电话号码是有记录的联系人，显示联系人，没有联系人，显示号码，点击 Call contact 拨打号码*/}
                {item.type == 5 && <StatusFive item={item} />}
                {/* 状态六 客服接听电话，create或者assign 一个 deal， 显示人名或者号码 */}
                {item.type == 6 && <StatusSix item={item} />}
                {/* 状态七 客服与客户聊天结束 create 或者 assign 一个 deal*/}
                {item.type == 7 && <StatusSeven item={item} />}
                {/* 一个deal 刚被创建时候 */}
                {item.type == 8 && <StatusEight item={item} />}
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.weekContainer}>
        <div className={styles.weekTitle}>BEFORE LAST WEEK</div>
        <div className={styles.weekContent}>
          {data.map((item) => {
            return (
              <div key={item.id} className={styles.contentItem}>
                {/* 状态一： deal 分配给另一个客服时候  */}
                {item.type == 1 && <StatusOne item={item} />}
                {/* 状态二 deal 中 添加 了一个 note */}
                {item.type == 2 && <StatusTwo item={item} />}
                {/* 状态三 客服修改 status 时候*/}
                {item.type == 3 && <StatusThree item={item} />}
                {/* 状态四 显示任务展开的全部内容*/}
                {item.type == 4 && <StatusFour item={item} />}
                {/* 状态五 当客服打了一个电话后，如果电话号码是有记录的联系人，显示联系人，没有联系人，显示号码，点击 Call contact 拨打号码*/}
                {item.type == 5 && <StatusFive item={item} />}
                {/* 状态六 客服接听电话，create或者assign 一个 deal， 显示人名或者号码 */}
                {item.type == 6 && <StatusSix item={item} />}
                {/* 状态七 客服与客户聊天结束 create 或者 assign 一个 deal*/}
                {item.type == 7 && <StatusSeven item={item} />}
                {/* 一个deal 刚被创建时候 */}
                {item.type == 8 && <StatusEight item={item} />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DetailTimeLine
