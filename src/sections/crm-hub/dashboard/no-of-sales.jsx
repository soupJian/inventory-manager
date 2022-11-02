import React, { useEffect, useRef } from 'react'
// components
import { Row, Col } from 'antd'
// css
import styles from './index.module.scss'

// main
const SalesRange = ({ salesRange, echarts }) => {
  const barRef = useRef(null)
  // 渲染柱状图
  const initBar = () => {
    const colorList = ['#2EBEBD', '#2C88DD', '#F6BC64']
    const Xdata = ['$700 or less', '$701 - $1,400', '$1,401 or more']
    const barChart = echarts.init(barRef.current)
    const option = {
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'shadow'
      //   }
      // },
      legend: {
        show: false
      },
      grid: {
        left: 0,
        right: 0,
        top: 20,
        bottom: 24,
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#E5E6EB',
            type: 'dashed'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#C9CDD4'
          }
        }
      },
      yAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        data: Xdata
      },
      series: [
        {
          name: '2011',
          type: 'bar',
          data: salesRange,
          label: {
            show: true,
            position: 'right'
          },
          itemStyle: {
            normal: {
              borderRadius: [0, 16, 16, 0],
              color: (params) => {
                return colorList[params.dataIndex]
              }
            }
          },
          barWidth: 32
        }
      ]
    }
    barChart.setOption(option)
  }
  useEffect(() => {
    barRef.current && initBar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={styles['sales-range']}>
      <Row justify="space-between">
        <Col className={styles.title}>No. of Sales</Col>
        <Col className={styles.subTitle}>In last 90 days</Col>
      </Row>
      <div ref={barRef} className={styles.bar}></div>
    </div>
  )
}

export default SalesRange
