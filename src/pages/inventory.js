import { withRouter } from "next/router";
import { useEffect, useReducer, useState } from "react"
import { Filter, Flex, Icon, Input, Pagination, Tab, Table, TableCell, TableRow, Tabs, Wrapper } from "../components/commons"
import { categoryList, ExpandedTableHeaders, statusList, TableHeaders, variantList } from "../constants/pageConstants/inventory";
import { Api, objectsToQueryString } from "../utils/utils";

const api = new Api()

const initialState = {
    activeTab: 0,
    page: 1,
}
const inventoryReducer = (state, {type, payload}) => {
    console.log(type, payload)
    switch (type) {
        case "changeTab":
            return {...state, activeTab:payload, page: 1}
        case "changePaginateNumber":
            return {...state, page:payload }
        default:
            return state
    }
}

const Inventory = ({router}) => {
    const [inventoryState, dispatch] = useReducer(inventoryReducer, {
        activeTab: router.query.type === "items" ? 0 : router.query.type === "products" ? 1 : 0,
        page: parseInt(router.query.page) || 1
    })
    const [status, setStatus] = useState([])
    const [category, setCategory] = useState([])
    const [variant, setVariant] = useState([])
    const [inventorySKUs, setInventorySKUs] = useState([])
    const [inventoryData, setInventoryData] = useState(null)
    const [selection, setSelection] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(2)

    const handlePage = (page) =>  {
        router.replace(`/inventory?${objectsToQueryString({...router.query, page})}`, null, {shallow:true})
        dispatch({type:"changePaginateNumber",payload:page})
    }

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
        console.log(inventoryState)
        api.getAllInventory("projectionExpression=SKU")
            .then(data => {
                console.log(data)
                setInventorySKUs(data.Items)
            })
    }, [])

    useEffect(() => {
        if(inventoryState.activeTab === 0) {
            const skusToShow = inventorySKUs.slice(inventoryState.page * itemsPerPage - itemsPerPage, inventoryState.page * itemsPerPage)
            if(skusToShow.length){
                let str = ""
                skusToShow.forEach(i => { Object.values(i).map(val => { str += val+","})})
                console.log(str)
                api.getMultipleInventory(`skus=${str}`) .then(data => { 
                    setInventoryData(data)
                })
            }
            else {
                setInventoryData({})
            }

        }
        else {

        }
    },[inventoryState.page, inventorySKUs])
    
    useEffect(() => {
        if(!router.query.type) {
            router.replace("/inventory?type=items", null,{shallow:true})
        }
        else if(inventoryState.activeTab === 0 && router.query.type === "products") {
            router.replace("/inventory?type=items", null,{shallow:true})
        }
        else if ((inventoryState.activeTab === 1 && router.query.type === "items") ) {
            router.replace("/inventory?type=products", null,{shallow:true})
        }
    }, [inventoryState.activeTab])
    
    return (
        <Wrapper styles={{"min-height": "100%"}} height="auto" padding="21px 29px">
            <Flex styles={{"flex-wrap": "nowrap"}} justifyContent="space-between">
                <Tabs>
                    <Tab onClick={() => dispatch({type: "changeTab", payload: 0})} active={0 === inventoryState.activeTab} idx={0}>Items</Tab>
                    <Tab onClick={() => dispatch({type: "changeTab", payload: 1})} active={1 === inventoryState.activeTab} idx={1}>Products</Tab>
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
                    paginationComponent={ <Wrapper padding="32px 0 0"><Pagination itemsInPage={itemsPerPage} totalItems={inventorySKUs?.length} totalPages={Math.floor(inventorySKUs?.length / itemsPerPage)} onPageChange={handlePage} currentPage={inventoryState.page} /> </Wrapper>}
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

export default withRouter(Inventory)

