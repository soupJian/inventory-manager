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
export const defaultInventoryProductsTableHeaders = [
  {
    label: 'Product Name',
    key: 'Name',
    value: 'Product Name',
    disabled: true,
    show: true
  },
  { label: 'SKU', key: 'SKU', value: 'SKU', show: true },
  { label: 'System ID', key: 'SystemId', value: 'System ID', show: true },
  {
    label: 'Available',
    key: 'Available',
    value: 'Available',
    disabled: true,
    show: true
  },
  { label: 'Us Cost', key: 'TotalCost', value: 'Us Cost', show: true }
]
export const defaultWarehouseProductsTableHeaders = [
  {
    label: 'Product Name',
    key: 'Name',
    value: 'Product Name',
    disabled: true,
    show: true
  },
  { label: 'SKU', key: 'SKU', value: 'SKU', show: true },
  { label: 'System ID', key: 'SystemId', value: 'System ID', show: true },
  {
    label: 'Stock',
    key: 'Stock',
    value: 'Stock',
    show: true,
    disabled: true
  },
  {
    label: 'Available',
    key: 'Available',
    value: 'Available',
    show: true
  },
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
  { label: 'parts NAME', key: 'Name' },
  { label: 'count', key: 'Quantity' },
  { label: 'location', key: 'Location' },
  { label: 'SKU', key: 'SKU' },
  { label: 'BARCODE', key: 'Barcode' },
  { label: 'Available', key: 'Available' },
  { label: 'US COST', key: 'TotalCost' }
]
