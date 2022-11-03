import React, { useEffect, useRef } from 'react'
// css
import styles from './index.module.less'

// main
const NoofSalesAmount = ({ noSales, salesAmount, echarts }) => {
  const barRef = useRef(null)
  const barInit = () => {
    const barChart = echarts.init(barRef.current)
    const Xdata = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
    const option = {
      // tooltip: {
      //   trigger: 'axis'
      // },
      grid: {
        top: 50,
        left: 80,
        bottom: 40,
        right: 80
      },
      legend: {
        show: true,
        right: 45,
        top: 0,
        data: ['No. of sales', 'Sales amount']
      },
      xAxis: {
        type: 'category',
        data: Xdata,
        splitLine: {
          show: false
        }
      },
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(228, 228, 228, 0.6)'
            }
          },
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          }
        },
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(228, 228, 228, 0.6)'
            }
          },
          axisLine: {
            show: true
          },
          axisLabel: {
            formatter: '{value}K'
          }
        }
      ],
      series: [
        {
          type: 'bar',
          name: 'No. of sales',
          yAxisIndex: 0,
          data: noSales,
          barWidth: 22,
          barGap: '70%',
          itemStyle: {
            normal: {
              borderRadius: [11, 11, 0, 0],
              color: '#2EBEBD'
            }
          },
          label: {
            show: true,
            position: 'top'
          }
        },
        {
          type: 'bar',
          name: 'Sales amount',
          yAxisIndex: 1,
          barWidth: 22,
          barGap: '70%',
          itemStyle: {
            normal: {
              borderRadius: [11, 11, 0, 0],
              color: '#2C88DD'
            }
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}K'
          },
          data: salesAmount
        }
      ]
    }
    barChart.setOption(option)
  }
  useEffect(() => {
    barInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={styles['no-of-sales-amount']}>
      <div className={styles.title}>No. of sales & sales amount</div>
      <div className={styles.bar} ref={barRef}></div>
    </div>
  )
}

export default NoofSalesAmount
