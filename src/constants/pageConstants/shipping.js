import { getDayCount } from '../../utils/formatTime'
const currentYear = new Date().getFullYear()
export const dateList = [
  {
    label: 'All time',
    value: ''
  },
  {
    label: 'Today',
    value: '1'
  },
  {
    label: 'Yesterday',
    value: '2'
  },
  {
    label: 'Last 30 days',
    value: '30'
  },
  {
    label: 'Last 90 days',
    value: '90'
  },
  {
    label: 'Last 180 days',
    value: '180'
  },
  {
    label: 'This year',
    value: getDayCount(`${currentYear}/1/1`) + ''
  }
]
export const UnShippedTableHeaders = [
  {
    label: 'ORDER NO.',
    key: 'Id'
  },
  {
    label: 'CUSTOMER',
    key: 'Fullname'
  },
  {
    label: 'DESTINATION',
    key: 'Address'
  },
  {
    label: 'ORDER DATE',
    key: 'Created'
  },
  {
    label: 'DETAIL',
    key: 'Detail'
  },
  {
    label: '',
    key: 'ShipBtn'
  }
]

export const ShippedTableHeaders = [
  {
    label: 'ORDER NO.',
    key: 'Id'
  },
  {
    label: 'DESTINATION',
    key: 'Address'
  },
  {
    label: 'CUSTOMER',
    key: 'Fullname'
  },
  {
    label: 'PAYMENT',
    key: 'Payment'
  },
  {
    label: 'ORDER DATE',
    key: 'Created'
  },
  {
    label: 'STATUS',
    key: 'Status'
  }
]
