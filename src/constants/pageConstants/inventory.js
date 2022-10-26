export const statusList = [
  {
    label: 'In stock',
    value: 'in'
  },
  {
    label: 'Out of stock',
    value: 'out'
  },
  {
    label: 'Low stock',
    value: 'low'
  }
]
export const sortByList = [
  {
    label: 'Available (high to low)',
    value: 'desc'
  },
  {
    label: 'Available (low to high)',
    value: 'asc'
  }
]

export const variantList = [
  {
    label: 'All variants',
    value: 'all'
  }
]

export const categoryList = [
  {
    label: 'All categories',
    value: 'all'
  }
]
// disabled 表头不可取消展示
// value和label保持一致
export const defaultTableHeaders = [
  {
    label: 'Item Name',
    key: 'Name',
    value: 'Item Name',
    disabled: true,
    show: true
  },
  { label: 'SKU', key: 'SKU', value: 'SKU', show: true },
  { label: 'system ID', key: 'SystemId', value: 'system ID', show: true },
  // { label: 'Stock', key: 'Stock' },
  // { label: 'Reserved', key: 'Reserved' },
  {
    label: 'Available',
    key: 'Available',
    value: 'Available',
    disabled: true,
    show: true
  },
  { label: 'Location', key: 'Location', value: 'Location', show: true },
  { label: 'Barcode', key: 'Barcode', value: 'Barcode', show: true },
  { label: 'Us Cost', key: 'TotalCost', value: 'Us Cost', show: true }
]
export const ExpandedTableHeaders = [
  // {label: "Barcode", key: "Barcode"},
  // {label: "Reorder Alert", key: "ReorderAlert"},
  // {label: "US Cost", key: "TotalCost"},
  // {label: "Location", key: "Location"}
  {
    label: 'TAGS',
    key: 'Tags'
  }
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
  // Reserved: 0,
  Settled: false,
  SettledTime: '',
  Sortable: 1,
  Stock: 0,
  Tags: [],
  TagsInput: '',
  TotalCost: 0,
  Updated: '',
  attr: {
    weight: 0,
    length: 0,
    width: 0,
    height: 0
  }
}
