import { withRouter } from "next/router";
import { useEffect, useReducer, useState } from "react"
import { BaseButton, Dialog, Filter, Flex, FloatingBar, Icon, Input, Pagination, Tab, Table, TableCell, TableRow, Tabs, Text, Wrapper } from "../components/commons"
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
    const [loadingTable, setLoadingTable] = useState(false)
    const [status, setStatus] = useState([])
    const [category, setCategory] = useState([])
    const [variant, setVariant] = useState([])
    const [inventorySKUs, setInventorySKUs] = useState([])
    const [inventoryData, setInventoryData] = useState(null)
    const [selection, setSelection] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [dialog, setDialog] = useState({
        message: "",
        onConfirm: "",
        show: false
    })

    const handlePage = (page) =>  {
        router.replace(`/inventory?${objectsToQueryString({...router.query, page})}`, null, {shallow:true})
        dispatch({type:"changePaginateNumber",payload:page})
    }

    const confirmAction = (cb, message) => {
        setDialog({ 
            message, 
            show: true,
            onConfirm: () => {
                cb()
                return setDialog({message: "", onConfirm: "",show: false})
            }
        })
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

    const clearSelectedItems = () => {
        setLoadingTable(true)
        const itemsToBeCleared = inventoryData.Items.filter(item => selection.includes(item.SKU))
        Promise.all(
            itemsToBeCleared.map((item) => {
                return api.updateInventory(item)
            })
        )
        .then(values => {
            setLoadingTable(false)
            setSelection([])
            fetchSKUs()
        })
        .catch((err) => {
            setLoadingTable(false)
        })
    }
    const deleteSelectedItems = () => {
        setLoadingTable(true)
        Promise.all(
            selection.map((item) => {
                return api.deleteInventory(item)
            })
        )
        .then(values => {
            setLoadingTable(false)
            setSelection([])
            fetchSKUs()
        })
        .catch((err) => {
            console.log(err)
            setLoadingTable(false)
        })
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

    const fetchSKUs = () => {
        return api.getAllInventory("projectionExpression=SKU")
                .then(data => {
                    console.log(data)
                    setInventorySKUs(data.Items)
                })
    }

    useEffect(() => {
        console.log(inventoryState)
        fetchSKUs()
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
            <Wrapper styles={{position: "relative"}} padding="23px 0px 0px">
                <Table 
                    name="inventory-items" 
                    selectable 
                    selectedAll={selection.length === inventoryData?.Items?.length} 
                    onSelectAll={selectAll} headers={TableHeaders}
                    paginationComponent={ <Wrapper padding="32px 0 0"><Pagination itemsInPage={inventoryData?.Count} totalItems={inventorySKUs?.length} totalPages={Math.floor(inventorySKUs?.length / itemsPerPage)} onPageChange={handlePage} currentPage={inventoryState.page} /> </Wrapper>}
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
                {
                    dialog.message && dialog.show && 
                    <Dialog>
                        <Wrapper padding="60px 54px">
                            <Text size="20px">
                                {dialog.message}
                            </Text>
                            <Flex gap="16px" styles={{width: "100%", "max-width": "416px", "margin-top": "24px"}}>
                                <BaseButton styles={{flex: "1", "border-radius": "8px"}} minWidth="auto" kind="primary" onClick={() => dialog.onConfirm()}>
                                    Yes
                                </BaseButton>
                                <BaseButton styles={{flex: "1", "background-color": "#ffffff", "border-radius": "8px"}} minWidth="auto" onClick={() => setDialog({
                                    message: "",
                                    onConfirm: "",
                                    show: false
                                })}>
                                    No
                                </BaseButton>
                            </Flex>
                        </Wrapper>
                    </Dialog>
                }
                {
                    selection.length > 0 &&
                    <FloatingBar styles={{position: "fixed"}}>
                        <Flex alignItems="center" justifyContent="space-between" >
                            <Flex alignItems="center"> 
                                <BaseButton  onClick={() => setSelection([])} minWidth="auto" minHeight="auto" styles={{"filter":"invert(92%) sepia(93%) saturate(0%) hue-rotate(202deg) brightness(106%) contrast(106%);"}}> <Icon width="16px" height="16px" name="close"/> </BaseButton>
                                <Text styles={{"margin-left": "20px"}} color="#ffffff">{selection.length} {selection.length > 1 ? "items selected" : "item selected"}</Text> 
                            </Flex>
                            <Flex alignItems="center" gap="16px"> 
                                <BaseButton onClick={() => confirmAction(clearSelectedItems, "Are you sure you want to clear these items’ stock?")} minWidth="auto" minHeight="auto" styles={{"background-color": "#ffffff", padding: "12px 14px", "border-radius": "8px", gap: "10px"}}>
                                    <Icon name="clear" width="22px" height="22px" />
                                    <Text>Clear</Text>
                                </BaseButton>
                                <BaseButton onClick={() => confirmAction(deleteSelectedItems, "Are you sure you want to delete these items?")} minWidth="auto" minHeight="auto" styles={{"background-color": "#ffffff", padding: "12px 14px", "border-radius": "8px", gap: "10px"}}>
                                    <Icon name="delete" width="22px" height="22px" />
                                    <Text>Delete</Text>
                                </BaseButton>
                            </Flex>
                        </Flex>
                    </FloatingBar>
                }
            </Wrapper>
        </Wrapper>
    )
}

export default withRouter(Inventory)

