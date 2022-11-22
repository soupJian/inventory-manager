import React from "react"
// components
import { Row, Col } from "antd"
// js
import { formatTimeStr } from "@/utils/formatTime"
// css
import styles from "../index.module.less"

// main
const ModalShipping = ({ info }) => {
  console.log(info)
  return (
    <div className={styles.shipModal}>
      {info.packageInfo.map((item, index) => {
        return (
          <div key={item.id}>
            <Row gutter={[0, 15]}>
              <Col span={24} className={styles.infoIndex}>
                Package {index + 1}
              </Col>
              <Col span={24}>
                <Row justify="space-between">
                  <Col className={styles.infoName}>Carrier</Col>
                  <Col className={styles.infoValue}>{item.cappier}</Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="space-between">
                  <Col className={styles.infoName}>Tracking number</Col>
                  <Col
                    className={`${styles.infoValue} ${styles.infoValueTrackId}`}
                  >
                    {item.cappier == "Fedex" && (
                      <a
                        href={`https://www.fedex.com/fedextrack/?trknbr=${item.trackingId}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.trackingId}
                      </a>
                    )}
                    {item.cappier == "UPS" && (
                      <a
                        href={`https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=${item.trackingId}&requester=ST/`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.trackingId}
                      </a>
                    )}
                    {item.cappier == "USPS" && (
                      <a
                        href={`https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=${item.trackingId}%2C&tABt=false`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.trackingId}
                      </a>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="space-between">
                  <Col className={styles.infoName}>Shipped on</Col>
                  <Col className={styles.infoValue}>
                    {formatTimeStr(item.shippedTime, "DD/MM/YYYY")}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )
      })}
    </div>
  )
}

export default ModalShipping
