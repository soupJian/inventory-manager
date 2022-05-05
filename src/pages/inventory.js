import { useCallback, useEffect, useState } from "react"
import { Filter, Flex, Icon, Input, Pagination, Tab, Table, TableCell, TableRow, Tabs, Wrapper } from "../components/commons"
import { categoryList, ExpandedTableHeaders, statusList, TableHeaders, variantList } from "../constants/pageConstants/inventory";
import { Api } from "../utils/utils";

const api = new Api()


const Inventory = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [status, setStatus] = useState([])
    const [category, setCategory] = useState([])
    const [variant, setVariant] = useState([])
    const [inventoryData, setInventoryData] = useState(null)
    const [inventoryTotalCount, setInventoryTotalCount] = useState(0)
    const [selection, setSelection] = useState([])

    const addSelection = (sku) => {
        const idx = selection.indexOf(sku)
        const newSelection = [...selection]

        if(idx < 0) {
            return setSelection([...selection, sku])
        }
        else {
            newSelection.splice(idx,1)
            return setSelection(newSelection)
        }
    }

    const selectAll = () => {
        const skus = inventoryData?.Items?.map(item => item.SKU);
        if(selection.length === inventoryData?.Items.length) setSelection([])
        else setSelection(skus)
        
    }
    const handleStatus = (val) => {
        const idx = status.findIndex(data => data.value === val.value)
        let newStatus = [...status]
        if(idx >= 0) {
            newStatus.splice(idx, 1)
            setStatus(newStatus)
        }
        else {
            setStatus([...newStatus, val])
        }
    }
    const handleCategory = (val) => {
        const idx = category.findIndex(data => data.value === val.value)
        let newCategory = [...category]
        if(idx >= 0) {
            newCategory.splice(idx, 1)
            setCategory(newCategory)
        }
        else {
            setCategory([...newCategory, val])
        }
    }

    useEffect(() => {
        api.getAllInventory("limit=10")
            .then(data => {
                console.log(data)
                setInventoryData(data)
            })
    }, [])

    return (
        <Wrapper styles={{"min-height": "100%"}} height="auto" padding="21px 29px">
            <Flex styles={{"flex-wrap": "nowrap"}} justifyContent="space-between">
                <Tabs>
                    <Tab onClick={() => setActiveTab(0)} active={0 === activeTab} idx={0}>Items</Tab>
                    <Tab onClick={() => setActiveTab(1)} active={1 === activeTab} idx={1}>Products</Tab>
                </Tabs>
                <Input type="text" placeholder="Search name or SKU" startIcon={<Icon name="search" width="30px" height="30px"/>} />
            </Flex>
            <Flex justifyContent="flex-end" styles={{"margin-top": "27px", gap: "12px"}}>
                <Filter value={category} activeIndex={0} label="Category" list={categoryList} multiSelect onSelect={handleCategory} />
                <Filter value={status} activeIndex={0} label="Status" list={statusList} multiSelect onSelect={handleStatus} />
            </Flex>
            <Wrapper padding="23px 0px 0px">
                <Table 
                    name="inventory-items" 
                    selectable 
                    selectedAll={selection.length === inventoryData?.Items?.length} 
                    onSelectAll={selectAll} headers={TableHeaders}
                    paginationComponent={ <Wrapper padding="32px 0 0"><Pagination itemsInPage={inventoryData?.ScannedCount} totalItems={inventoryData?.Count} totalPages={Math.floor(inventoryData?.Count * 10)} currentPage={1} /> </Wrapper>}
                    >
                    {
                        inventoryData?.Items?.map((item, idx) => (
                            <TableRow
                                nested
                                idx={idx} 
                                height="72px" 
                                selectable
                                selected={selection.includes(item.SKU)}
                                onSelect={() => addSelection(item.SKU)}
                                dataId={item.Barcode}
                                key={item.Barcode}
                                expandedContent={
                                    <Wrapper padding="4px 0">
                                        <Table styles={{'background-color': 'transparent', padding: "0"}} name={`inventory-item-expanded-${item.Name}`} headers={ExpandedTableHeaders}>
                                            <TableRow>
                                                {
                                                    ExpandedTableHeaders.map((header, idx) => (
                                                        <TableCell key={idx}>
                                                           { header.key === "TotalCost" ?
                                                                "$"+item[header.key]
                                                            :
                                                            header.key === "Location" ?
                                                            <>
                                                                {item[header.key].map(i => (
                                                                    <span key={i}>{i+"; "}</span>
                                                                ))}
                                                            </>
                                                            :
                                                            item[header.key]}
                                                        </TableCell>
                                                    ))
                                                }
                                            </TableRow>
                                        </Table>
                                    </Wrapper>
                                }
                                >
                                {
                                    TableHeaders.map(header => (
                                                header.key === "Location"?
                                                item[header.key][0]
                                                :
                                                item[header.key]
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </Table>
            </Wrapper>
        </Wrapper>
    )
}

export default Inventory

