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
export const defaultInventoryItemsTableHeaders = [
  {
    label: 'Item Name',
    key: 'Name',
    value: 'Item Name',
    disabled: true,
    show: true
  },
  { label: 'SKU', key: 'SKU', value: 'SKU', show: true },
  { label: 'System ID', key: 'SystemId', value: 'System ID', show: true },
  { label: 'Barcode', key: 'Barcode', value: 'Barcode', show: true },
  {
    label: 'Available',
    key: 'Available',
    value: 'Available',
    disabled: true,
    show: true
  },
  { label: 'Location', key: 'Location', value: 'Location', show: true },
  { label: 'Us Cost', key: 'TotalCost', value: 'Us Cost', show: true }
]
export const defaultWarehouseItemsTableHeaders = [
  {
    label: 'Item Name',
    key: 'Name',
    value: 'Item Name',
    disabled: true,
    show: true
  },
  { label: 'SKU', key: 'SKU', value: 'SKU', show: true },
  { label: 'System ID', key: 'SystemId', value: 'System ID', show: true },
  { label: 'Stock', key: 'Stock', value: 'Stock', show: true, disabled: true },
  {
    label: 'Available',
    key: 'Available',
    value: 'Available',
    show: true
  },
  { label: 'Barcode', key: 'Barcode', value: 'Barcode', show: true },
  { label: 'Location', key: 'Location', value: 'Location', show: true },
  { label: 'Us Cost', key: 'TotalCost', value: 'Us Cost', show: true }
]
export const ExpandedTableHeaders = [
  {
    label: 'TAGS',
    key: 'Tags'
  }
]
// 每一个items 的基础构建
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
  ReorderAlert: 10,
  // Reserved: 0,
  Settled: 0,
  Unsetttled: 0,
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
