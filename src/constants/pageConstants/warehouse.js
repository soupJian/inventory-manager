export const dateList = [
  {
    label: 'Today',
    value: '1'
  },
  {
    label: 'Yesterday',
    value: '2'
  },
  {
    label: 'Last 7 days',
    value: '7'
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
    label: 'Last 365 days',
    value: '365'
  }
]

export const settledHeaders = [
  { label: 'ITEM NAME', key: 'Name' },
  { label: 'SKU', key: 'SKU' },
  { label: 'RECEIVED', key: 'Received' },
  { label: 'COUNT', key: 'Stock' },
  { label: 'SETTLED', key: 'SettledTime' },
  { label: 'LOCATION', key: 'Location' }
]
export const unSettledHeaders = [
  { label: 'ITEM NAME', key: 'Name' },
  { label: 'SKU', key: 'SKU' },
  { label: 'RECEIVED', key: 'Received' },
  { label: 'COUNT', key: 'Stock' },
  { label: 'LOCATION', key: 'Location' }
]

export const itemTemplate = {
  SKU: '',
  Available: 0,
  Barcode: '',
  Cost: {
    CustomEntryDuty: 0,
    CustomerShipping: 0,
    ItemCost: 0,
    OceanFreight: 0,
    WarehouseDelivery: 0
  },
  Created: '',
  Location: [],
  Name: '',
  ReorderAlert: 0,
  Reserved: 0,
  Settled: false,
  SettledTime: '',
  Sortable: 1,
  Stock: 0,
  Tags: [],
  TagsInput: '',
  TotalCost: 0,
  Updated: ''
}

export const locations = [
  {
    label: 'Z23-F12',
    value: 'Z23-F12'
  },
  {
    label: 'Z11-D21',
    value: 'Z11-D21'
  },
  {
    label: 'Z13-E33',
    value: 'Z13-E33'
  },
  {
    label: 'Z22-A32',
    value: 'Z22-A32'
  },
  {
    label: 'Z18-F22',
    value: 'Z18-F22'
  },
  {
    label: 'Z11-F33',
    value: 'Z11-F33'
  }
]
