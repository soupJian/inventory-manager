export const dateList = [
    {
        label: "All Time",
        value: "All Time"
    },
    {
        label: "Today",
        value: "Today"
    },
    {
        label: "Yesterday",
        value: "Yesterday"
    },
    {
        label: "Last 7 days",
        value: "Last 7 days"
    },
    {
        label: "Last 30 days",
        value: "Last 30 days"
    },
    {
        label: "Last 90 days",
        value: "Last 90 days"
    },
    {
        label: "Last 180 days",
        value: "Last 180 days"
    },
    {
        label: "Last 365 days",
        value: "Last 365 days"
    }
]

export const settledHeaders = [
    {label: "ITEM NAME", key: "Name"},
    {label: "SKU", key: "SKU"},
    {label: "RECEIVED", key: "Received"},
    {label: "COUNT", key: "Stock"},
    {label: "SETTLED", key: "SettledTime"},
    {label: "LOCATION", key: "Location"},
]
export const unSettledHeaders = [
    {label: "ITEM NAME", key: "Name"},
    {label: "SKU", key: "SKU"},
    {label: "RECEIVED", key: "Received"},
    {label: "COUNT", key: "Stock"},
    {label: "LOCATION", key: "Location"},
]

export const locations = [
    {
        label: "Z08-K23",
        value: "Z08-K23"
    },
    {
        label: "Z10-K08",
        value: "Z10-K08"
    }
]

export const itemTemplate = {
    "SKU": "",
    "Available":0,
    "Barcode": "",
    "Cost": {
     "CustomEntryDuty": 0,
     "CustomerShipping": 0,
     "ItemCost": 0,
     "OceanFreight": 0,
     "WarehouseDelivery": 0
    },
    "Created": "",
    "Location": [],
    "Name": "",
    "ReorderAlert": 0,
    "Reserved": 0,
    "Settled": false,
    "SettledTime": "",
    "Sortable": 1,
    "Stock": 0,
    "Tags": [],
    "TagsInput": "",
    "TotalCost": 0,
    "Updated": "",
   }