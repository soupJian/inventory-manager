import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'

const PieTotalOpenDeals = ({ echarts, data }) => {
  const pie = useRef(null)
  const initPie = () => {
    const total = data.reduce(
      (pre, cur) => {
        return { value: pre.value + cur.value }
      },
      { value: 0 }
    )
    const option = {
      title: [
        {
          text: '{name|Total}',
          top: 90,
          textStyle: {
            rich: {
              name: {
                fontSize: 16,
                fontWeight: 400,
                color: '#4E5969',
                lineHeight: 20,
                fontFamily: 'Rubik',
                width: 225,
                align: 'center'
              }
            }
          }
        },
        {
          text: `{val|${total.value.toLocaleString()}}`,
          top: 110,
          textStyle: {
            rich: {
              val: {
                fontFamily: 'Helvetica Neue',
                fontSize: 32,
                lineHeight: 40,
                fontWeight: 500,
                color: '#1D2129',
                width: 225,
                align: 'center'
              }
            }
          }
        }
      ],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        top: 10,
        right: '0',
        padding: [14, 0],
        textStyle: {
          fontFamily: 'Rubik',
          fontWeight: 400,
          fontSize: 15,
          lineHeight: 22
        },
        formatter: (params) => {
          const cur = data.filter((item) => item.name == params)[0]
          const precent = parseInt((cur.value / total.value) * 100)
          return `{name|${params}} {value|${precent}%}`
        }
      },
      textStyle: {
        rich: {
          name: { width: 110, align: 'left' },
          value: { width: 50, align: 'right' }
        }
      },
      color: ['#FF7B7B', '#F6BC64', '#2C88DD', '#77D755', '#2EBEBD', '#B7B7B7'],
      series: [
        {
          type: 'pie',
          top: 10,
          radius: ['70%', '90%'],
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          center: [113, 113],
          data
        }
      ]
    }
    const pieChart = echarts.init(pie.current)
    pieChart.setOption(option)
  }
  useEffect(() => {
    initPie()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={styles['pie-total-open-deals']}>
      <div className={styles.title}>Total open deals</div>
      <div ref={pie} className={styles.pie}></div>
    </div>
  )
}

export default PieTotalOpenDeals
