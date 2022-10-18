export const statusList = [
  {
    label: 'In stock',
    value: 'in'
  },
  {
    label: 'Out of stock',
    value: 'out'
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
    label: 'Product Name',
    key: 'Name',
    value: 'Product Name',
    disabled: true,
    show: true
  },
  { label: 'SKU', key: 'SKU', value: 'SKU', show: true },
  { label: 'system ID', key: 'SystemId', value: 'system ID', show: true },
  {
    label: 'Stock',
    key: 'Stock',
    value: 'Stock',
    disabled: true,
    show: true
  },
  {
    label: 'Available',
    key: 'Available',
    value: 'Available',
    show: true
  },
  // {
  //   label: 'Reserved',
  //   key: 'Reserved',
  //   value: 'Reserved',
  //   show: true
  // }
  { label: 'Us Cost', key: 'TotalCost', value: 'Us Cost', show: true }
]

export const productTemplate = {
  SKU: '',
  Available: 0,
  Created: 'Z',
  Image: '',
  LastSync: '',
  Name: '',
  Parts: [],
  ReorderAlert: 0,
  Reserved: 0,
  Sortable: 1,
  Stock: 0,
  TotalCost: 0,
  Updated: '',
  TagsInput: '',
  Tags: []
}
export const ExpandedTableHeaders = [
  { label: 'parts NAME', key: 'parts NAME' },
  { label: 'count', key: 'count' },
  { label: 'location', key: 'location' },
  { label: 'SKU', key: 'SKU' },
  { label: 'BARCODE', key: 'BARCODE' },
  { label: 'Available', key: 'Available' },
  { label: 'US COST', key: 'US COST' }
]
