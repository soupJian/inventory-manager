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

export const TableHeaders = [
  { label: 'Item Name', key: 'Name' },
  { label: 'SKU', key: 'SKU' },
  { label: 'system ID', key: 'SystemId' },
  // { label: 'Stock', key: 'Stock' },
  // { label: 'Reserved', key: 'Reserved' },
  { label: 'Available', key: 'Available' },
  { label: 'Location', key: 'Location' },
  { label: 'barcode', key: 'Barcode' },
  { label: 'Us Cost', key: 'TotalCost' }
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
  // Available: 0,
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
