import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'

const LineSale = ({ echarts }) => {
  const pie = useRef(null)
  const initPie = (Xdata, Ydata) => {
    const option = {
      xAxis: {
        type: 'category',
        data: Xdata,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(228, 228, 228, 0.6)'
          }
        },
        axisLabel: {
          color: '#4E5969'
        }
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        top: 10,
        left: 30,
        bottom: 20,
        right: 0
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'line',
          symbol: 'circle',
          symbolSize: 10,
          lineStyle: {
            color: '#2EBEBD'
          },
          itemStyle: {
            normal: {
              color: '#2EBEBD'
            }
          },
          data: Ydata
        }
      ]
    }
    const pieChart = echarts.init(pie.current)
    pieChart.setOption(option)
  }
  useEffect(() => {
    // 获取数据后 initpie
    const Xdata = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const Ydata = [150, 230, 224, 218, 135, 147, 260]
    initPie(Xdata, Ydata)
  }, [])
  return (
    <div className={styles['pie-total-open-deals']}>
      <div className={styles.title}>Avg. days of deal to sale</div>
      <div ref={pie} className={styles.line}></div>
    </div>
  )
}

export default LineSale
