import { withRouter } from "next/router";
import { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BaseButton, Button, Dialog, Filter, Flex, FloatingBar, Icon, Input, Loader, Modal, Pagination, Tab, Table, TableCell, TableRow, Tabs, Text, Wrapper, Popover } from "../../components/commons"
import WarehouseUnit from "../../components/pageComponents/inventory/WarehouseUnit";
import { ExpandedTableHeaders, itemTemplate, statusList, TableHeaders } from "../../constants/pageConstants/inventory";
import { locations } from "../../constants/pageConstants/locations";
import { Api, ISOStringToReadableDate, objectsToQueryString } from "../../utils/utils";

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
        case "changeStatus":
            return {...state, status:payload}
        case "changePageType":
            return {...state, pageType:payload, page: 1}
        case "changePaginateNumber":
            return {...state, page:payload }
        default:
            return state
    }
}

const Inventory = ({router}) => {
    const user = useSelector(state => state.user.user)
    const [inventoryState, dispatch] = useReducer(inventoryReducer, {
        page: parseInt(router.query.page) || 1,
        status: router.query.status ? router.query.status.split(",") : [],
        pageType: router.query.pageType ? router.query.pageType : "inventory"
    })
    const [loadingTable, setLoadingTable] = useState(false)
    const [status, setStatus] = useState([])
    const [inventorySKUs, setInventorySKUs] = useState([])
    const [inventoryData, setInventoryData] = useState(null)
    const [selection, setSelection] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [newItem, setNewItem] = useState({...itemTemplate})
    const [newItemModal, setNewItemModal] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [newItemError, setNewItemError] = useState("");
    //warehouse
    const [warehouseData, setWarehouseData] = useState({});
    const [loadingWarehouse,setLoadingWarehouse] = useState(false);
    const [locatedItem, setLocatedItem] = useState({});
    const [locatedItemInput, setLocatedItemInput] = useState("");
    const [locatedItemError, setLocatedItemError] = useState("");
    const [locateItemLoading, setLocateItemLoading] = useState(false);
    const [showLocationPopover, setShowLocationPopover] = useState(false);
    const [activeLocationKey, setActiveLocationKey] = useState([]);
    
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
                return api.updateInventory({...item, Stock: 0, Reserved: 0, Available: 0}, {"Authorization": `Bearer ${user.accessToken}`})
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
                return api.deleteInventory(item, {"Authorization": `Bearer ${user.accessToken}`})
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
        console.log(val)
        const idx = inventoryState.status.findIndex(data => data === val)
        let newStatus = [...inventoryState.status]
        if(idx >= 0) {
            newStatus.splice(idx, 1)
            if(newStatus.length) {
                console.log(newStatus, "----> has status")

                dispatch({type: "changeStatus", payload:newStatus})
                router.replace(`/inventory?${objectsToQueryString({...router.query, status:newStatus.join(",")})}`, null, {shallow:true})

            }
            else {
                console.log(newStatus, "----> no status")
                dispatch({type: "changeStatus", payload:newStatus})
                let params = {...router.query}
                delete params['status']
                router.replace(`/inventory?${objectsToQueryString({...params})}`, null, {shallow:true})

            }

        }
        else {
            router.replace(`/inventory?${objectsToQueryString({...router.query, status:[...newStatus, val].join(",")})}`, null, {shallow:true})
            dispatch({type: "changeStatus", payload:[...newStatus, val]})
        }
    }
    const newItemHandler = (e,nestedKey) => {
        if(nestedKey) {
            return setNewItem({...newItem, Cost: {...newItem.Cost,[e.target.name]:e.target.value}})
        }
        else if(e.target.name === "Tags") {
            let newTags = e.target.value.split(",")
            newTags.pop()
            setNewItem({...newItem, TagsInput:e.target.value, Tags:newTags})
        }
        else {
            return setNewItem({...newItem, [e.target.name]:e.target.value})
        }
    }
    const removeTag = (tag) => {
        const idx = newItem.Tags.indexOf(tag);
        if(idx >= 0) {
            let newTags = [...newItem.Tags]
            newTags.splice(idx,1)
            setNewItem({...newItem, TagsInput:newTags.join(","), Tags:newTags})
        }
    }

    const handleNewLocationList = (name, val) => {
        const idx = newItem.Location.findIndex(loc => loc.value === val)
        let newLocationList = [...newItem.Location]
        if(idx >= 0) {
            newLocationList.splice(idx, 1)
            setNewItem({...newItem, [name]: newLocationList})
        }
        else {
            setNewItem({...newItem, [name]: [...newLocationList,val]})
        }
    }

    const submitNewItem = (e) => {
        setNewItemLoading(true)
        setNewItemError("")
        e.preventDefault();
        if(!newItem.Name || !newItem.Barcode) {
            setNewItemLoading(false)
            setNewItemError("Required")
        }
        else {
            const TotalCost = Object.values(newItem.Cost).reduce((total, cost) => total + parseInt(cost), 0)
            let data = {...newItem, Updated: new Date(), Recieved: new Date(),Created: new Date(), TotalCost}
            delete data['TagsInput']
            api.updateInventory(data, {"Authorization": `Bearer ${user.accessToken}`})
                .then(data => {
                    setNewItemLoading(false)
                    setNewItemModal(false)
                    setNewItemError("")
                    setNewItem({...itemTemplate})
                })
        }
    }
    

    const locateItem = () => {
        setLocateItemLoading(true)
        api.getInventory(`barcode=${locatedItemInput}`, {"Authorization": `Bearer ${user.accessToken}`})
            .then(data => {
                if(data.Items && data.Items?.length === 0) {
                    setLocatedItemError("Sorry, We can't find the item!")
                }
                else if (!data.Items && data.message) {
                    setLocatedItemError(data.message)
                }
                setLocateItemLoading(false)
                setLocatedItem(data)
                console.log(data)
            })
            .catch( err => {
                setLocateItemLoading(false)
            })
    }
    const cancelLocatedItem = () => {
        setLocatedItem({})
        setLocatedItemInput("")
    }

    const handleGridItem = (val) => {
        console.log(warehouseData[val])
        setActiveLocationKey(val)
        setShowLocationPopover(true)
    }

    const fetchSKUs = () => {
        setLoadingTable(true)
        return api.getAllInventory(`projectionExpression=SKU${inventoryState.status.length ? `&status=${inventoryState.status.join(",")}` : ""}`, {"Authorization": `Bearer ${user.accessToken}`})
                .then(data => {
                    setInventorySKUs(data.Items)
                    setLoadingTable(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoadingTable(false)
                })
    }
    const fetchItems = () => {
        setLoadingWarehouse(true)
        return api.getAllInventory(`projectionExpression=SKU,Location,Name,SettledTime`, {"Authorization": `Bearer ${user.accessToken}`})
                .then(data => {
                    let dataObj = {}
                    data.Items.forEach(item => {
                        item.Location.forEach(loc => {
                            if(!(loc in dataObj)) {
                                dataObj[loc] = [item]
                            }
                            else {
                                dataObj[loc] = [...dataObj[loc], item]
                            }
                            return
                        })
                    })
                    console.log(dataObj)
                    setWarehouseData(dataObj)
                    setLoadingWarehouse(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoadingWarehouse(false)
                })
    }
    const handleLocateItem = (e) => {
        if(locatedItemInput) {
            locateItem()
        }
        e.preventDefault()
    }

    useEffect(() => {
        console.log(inventoryState.pageType)
        if(inventoryState.pageType === "inventory") {
            router.replace(`/inventory?pageType=inventory`, null, {shallow: true})
            fetchSKUs()
        }
        else {
            router.replace("/inventory?pageType=warehouse", null, {shallow: true})
            fetchItems()
        }
    }, [inventoryState.pageType])

    useEffect(() => {
        const skusToShow = inventorySKUs?.slice(inventoryState.page * itemsPerPage - itemsPerPage, inventoryState.page * itemsPerPage)
        if(skusToShow?.length){
            setLoadingTable(true)
            let str = ""
            skusToShow.forEach(i => { Object.values(i).map(val => { str += val+","})})
            api.getMultipleInventory(`skus=${str}`, {"Authorization": `Bearer ${user.accessToken}`}) 
                .then(data => { 
                    setInventoryData(data)
                    setLoadingTable(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoadingTable(false)
                })
        }
        else {
            setInventoryData({})
        }
    },[inventoryState.page, inventorySKUs])
    
    
    return (
        <Wrapper styles={{"min-height": "100%"}} height="auto" padding="21px 29px">
            <Flex styles={{"flex-wrap": "nowrap"}} justifyContent="space-between">
                <Tabs>
                    <Tab onClick={() => dispatch({type: "changePageType", payload: "inventory"})} active={"inventory" === inventoryState.pageType} idx={0}>Items</Tab>
                    <Tab onClick={() => dispatch({type: "changePageType", payload: "warehouse"})} active={"warehouse" === inventoryState.pageType} idx={1}>Warehouse</Tab>
                </Tabs>
                {
                    inventoryState.pageType === "inventory" &&
                        <Flex styles={{gap: "9px"}}>
                            <Button onClick={() => setNewItemModal(true)} minWidth="auto" kind="primary" startIcon={<Icon name="add" width="18px" height="19px" styles={{"margin-right": "12px"}} /> }>New</Button>
                            <Input inputStyles={{height: "100%"}} type="text" placeholder="Search name or SKU" startIcon={<Icon name="search" width="30px" height="30px"/>} />
                        </Flex> 
                }
            </Flex>
            {
                inventoryState.pageType === "inventory" ?
                <>
                    <Flex justifyContent="flex-end" styles={{"margin-top": "27px", gap: "12px"}}>
                        <Filter value={inventoryState.status} label="Status" list={statusList} multiSelect onSelect={handleStatus} />
                    </Flex>
                    <Wrapper styles={{position: "relative"}} padding="23px 0px 0px">
                        <Table
                            loading={loadingTable}
                            name="inventory-items" 
                            selectable 
                            selectedAll={selection.length === inventoryData?.Items?.length} 
                            onSelectAll={selectAll} headers={TableHeaders}
                            paginationComponent={ <Wrapper padding="32px 0 0"><Pagination itemsInPage={inventoryData?.Count} totalItems={inventorySKUs?.length} totalPages={Math.ceil(inventorySKUs?.length / itemsPerPage)} onPageChange={handlePage} currentPage={inventoryState.page} /> </Wrapper>}
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
                                        dataId={item.SKU + idx}
                                        key={item.SKU + idx}
                                        redirectOnClick={() => router.push(`/inventory/item?sku=${item.SKU}`)}
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
                        {
                            newItemModal && 
                                <Modal loading={newItemLoading} title={"Add a new item"} closeOnClickOutside={false} onClose={() => setNewItemModal(false)}>
                                    <Wrapper padding="32px 0 0" styles={{"width": "632px"}}>
                                        <Form onSubmit={submitNewItem}>
                                            <InputGroup>
                                                <Label htmlFor="warehouse-recieving-sku">Name*</Label>
                                                <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px", "border": newItemError && !newItem.Name ? "2px solid #CB0000" : ""}} inputStyles={{width: "100%"}} placeholderStyles={{"color": newItemError && !newItem.Name ? "#CB0000" : ""}} placeholder={newItemError && !newItem.Name ? "Required" : "Type"} value={newItem.Name} onChange={(e) => newItemHandler(e)} name="Name" type="text" id="warehouse-new-item-name"/>
                                            </InputGroup>
                                            <Flex alignItems="flex-start" justifyContent="flex-start" styles={{width: "100%", "margin-top": "24px", gap: "24px"}}>
                                                <InputGroup>
                                                    <Label htmlFor="warehouse-recieving-sku">SKU</Label>
                                                    <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="Type" value={newItem.SKU} onChange={(e) => newItemHandler(e)} name="SKU" type="text" id="warehouse-new-item-sku"/>
                                                </InputGroup>
                                                <InputGroup>
                                                    <Label htmlFor="warehouse-recieving-sku">BARCODE*</Label>
                                                    <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px", "border": newItemError && !newItem.Barcode ? "2px solid #CB0000" : ""}} inputStyles={{width: "100%"}} placeholderStyles={{"color": newItemError && !newItem.Barcode ? "#CB0000" : ""}} placeholder={newItemError && !newItem.Barcode ? "Required" : "Type"} value={newItem.Barcode} onChange={(e) => newItemHandler(e)} name="Barcode" type="text" id="warehouse-new-item-barcode"/>
                                                </InputGroup>
                                            </Flex>
                                            <Flex alignItems="flex-start" justifyContent="flex-start" styles={{width: "100%", "margin-top": "24px", gap: "24px"}}>
                                                <InputGroup>
                                                    <Label htmlFor="warehouse-recieving-sku">COUNT</Label>
                                                    <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="0" value={newItem.Stock} onChange={(e) => newItemHandler(e)} name="Stock" type="number" id="warehouse-new-item-count"/>
                                                </InputGroup>
                                                <InputGroup>
                                                    <Label htmlFor="warehouse-recieving-sku">AVAILABLE</Label>
                                                    <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="0" value={newItem.Available} onChange={(e) => newItemHandler(e)} name="Available" type="number" id="warehouse-new-item-available"/>
                                                </InputGroup>
                                                <InputGroup>
                                                    <Label htmlFor="warehouse-recieving-sku">RESERVED</Label>
                                                    <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="0" value={newItem.Reserved} onChange={(e) => newItemHandler(e)} name="Reserved" type="number" id="warehouse-new-item-reserved"/>
                                                </InputGroup>
                                                <InputGroup>
                                                    <Label htmlFor="warehouse-recieving-sku">REORDER ALERT</Label>
                                                    <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="0" value={newItem.ReorderAlert} onChange={(e) => newItemHandler(e)} name="ReorderAlert" type="number" id="warehouse-new-item-reorder-alert"/>
                                                </InputGroup>
                                            </Flex>
                                            <Flex alignItems="flex-start" justifyContent="flex-start" styles={{width: "100%", "margin-top": "24px", gap: "24px"}}>
                                                <InputGroup>
                                                    <Label htmlFor="warehouse-recieving-sku">LOCATION</Label>
                                                    <Filter wrapperStyles={{width: "100%", "margin-top": "10px"}} name="Location" value={newItem.Location} label="" list={locations} multiSelect onSelect={handleNewLocationList} />
                                                </InputGroup>
                                            </Flex>
                                            <Wrapper padding="24px 0 0">
                                                <Label htmlFor="warehouse-recieving-sku">US COST</Label>
                                                <Flex alignItems="stretch" justifyContent="flex-start" styles={{width: "100%", "margin-top": "16px", gap: "9px"}}>
                                                    <InputGroup>
                                                        <ModifiedLabel htmlFor="warehouse-recieving-sku">ITEM COST ($)</ModifiedLabel>
                                                        <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="0" value={newItem.Cost.ItemCost} onChange={(e) => newItemHandler(e, "Cost")} name="ItemCost" type="number" id="warehouse-new-item-cost"/>
                                                    </InputGroup>
                                                    <InputGroup>
                                                        <ModifiedLabel htmlFor="warehouse-recieving-sku">CUSTOM ENTRY DUTY ($)</ModifiedLabel>
                                                        <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="0" value={newItem.Cost.CustomEntryDuty} onChange={(e) => newItemHandler(e, "Cost")} name="CustomEntryDuty" type="number" id="warehouse-new-item-ced"/>
                                                    </InputGroup>
                                                    <InputGroup>
                                                        <ModifiedLabel htmlFor="warehouse-recieving-sku">OCEAN FREIGHT ($)</ModifiedLabel>
                                                        <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="0" value={newItem.Cost.OceanFreight} onChange={(e) => newItemHandler(e, "Cost")} name="OceanFreight" type="number" id="warehouse-new-item-of"/>
                                                    </InputGroup>
                                                    <InputGroup>
                                                        <ModifiedLabel htmlFor="warehouse-recieving-sku">WAREHOUSE DELIVERY ($)</ModifiedLabel>
                                                        <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="0" value={newItem.Cost.WarehouseDelivery} onChange={(e) => newItemHandler(e, "Cost")} name="WarehouseDelivery" type="number" id="warehouse-new-item-wd"/>
                                                    </InputGroup>
                                                    <InputGroup>
                                                        <ModifiedLabel htmlFor="warehouse-recieving-sku">CUSTOMER SHIPPING ($)</ModifiedLabel>
                                                        <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="0" value={newItem.Cost.CustomerShipping} onChange={(e) => newItemHandler(e, "Cost")} name="CustomerShipping" type="number" id="warehouse-new-item-cs"/>
                                                    </InputGroup>
                                                </Flex>
                                            </Wrapper>
                                            <Wrapper padding="24px 0 0">
                                                <Label htmlFor="warehouse-recieving-sku">TAGS (use comma to seperate)</Label>
                                                <CustomInput>
                                                    <Tags>
                                                        {
                                                            newItem.Tags?.map((tag) => {
                                                                if(tag.length) {
                                                                    return <Tag  onClick={(e) => removeTag(tag)}  type='button' key={tag}>{tag}<Icon name="close-rounded" width="12px" height="12px" /> </Tag>
                                                                }
                                                            })
                                                        }
                                                    </Tags>
                                                    <input type="text" name="Tags" value={newItem.TagsInput} onChange={(e) => newItemHandler(e)} />
                                                </CustomInput>
                                            </Wrapper>
                                            <Flex styles={{"max-width": "78px", "margin-left": "auto", "margin-top": "24px"}}>
                                                <Button type="submit" kind="primary">Save</Button>
                                            </Flex>
                                        </Form>
                                    </Wrapper>
                                </Modal>
                            }
                        </Wrapper>
                    </>
                :
                <Wrapper padding="35px 0">
                    <Flex styles={{width:"fit-content"}} alignItems="flex-end" justifyContent="flex-start">
                        <Flex as="form" onSubmit={handleLocateItem} alignItems="flex-end" gap="8px">
                            <InputGroup>
                                <Label htmlFor="warehouse-barcode">Locate item</Label>
                                <Input inputStyles={{height: "100%"}} startIcon={<Icon name="search" width="30px" height="30px" />} wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} placeholder="Type barcode" value={locatedItemInput} onChange={(e) => setLocatedItemInput(e.target.value)} name="Barcode" type="text" id="warehouse-barcode"/>
                            </InputGroup>
                            <Flex direction="column"  justifyContent="flex-end" gap="9px" alignItems="flex-start">
                                {
                                    locatedItemError && <Text styles={{"white-space": "nowrap"}} color="#CB0000" size="15px">{`"Invalid Barcode"`}</Text>
                                }
                                {
                                    locateItemLoading && <Loader size={30} />
                                }
                                {
                                    !locatedItemError && locatedItem?.Items?.length && !locateItemLoading &&
                                    <>
                                        <Text styles={{"white-space": "nowrap"}} color="#000000" size="15px">{locatedItem?.Items[0]?.Name}</Text>
                                        <Text styles={{"white-space": "nowrap"}} weight="500" color="#2EBEBD" size="15px">{locatedItem?.Items[0]?.Location.join(";")}</Text>
                                    </>
                                    
                                }
                            </Flex>
                            {
                                !locatedItemError && locatedItem?.Items?.length && !locateItemLoading &&
                                <Button onClick={cancelLocatedItem} styles={{padding: "8px 16px", "align-self": "fles-start"}} minWidth="auto" kind="primary">Cancel</Button>
                            }
                        </Flex>
                    </Flex>
                    <Wrapper styles={{display: "flex", "flex-direction": "column", "align-items": "flex-start"}} padding="41px 0 35px">
                        <Flex styles={{"margin-bottom": "50px", "max-width": "1100px"}} alignItems="flex-start" gap="58px">
                            <WarehouseUnit unit="A" label="Against the left wall" yLabel={["R1","R2","R3"].reverse()} xLabel={["A1","A2","A3","A4"]}>
                                {
                                    ["R1","R2","R3"].reverse().map(row => (
                                        <GridRow key={row+"A"}>
                                            {
                                                ["A1","A2","A3","A4"].map(col => (
                                                    <Popover
                                                        isOpen={showLocationPopover && activeLocationKey === [col,row].join("-")} 
                                                        key={[col,row].join("-")}
                                                        onClose={() => setShowLocationPopover(false)}
                                                        contentStyles={{"background-color": "#ffffff", "padding": "24px",transform: "translate(50%, 100%)"}}
                                                        content={
                                                            <Wrapper padding="0" styles={{"min-width": "340px"}}>
                                                                <Text family="Rubik" weight="500" size="16px" color="#000000">{[col,row].join("-")}</Text>
                                                                {
                                                                    warehouseData[[col,row].join("-")]?.length &&
                                                                    <Wrapper padding="20px 0 0">
                                                                        {
                                                                            warehouseData[[col,row].join("-")]?.map((item) => (
                                                                                <Text key={item.SKU} styles={{"margin-top": "10px"}} as="div" family="Rubik" weight="400" size="15px" color="#000000">{item.Name}</Text>
                                                                            ))
                                                                        }
                                                                    </Wrapper>
                                                                }
                                                                {
                                                                    warehouseData[[col,row].join("-")]?.length &&
                                                                    <Wrapper padding="16px 0 0">
                                                                        <Text color="#999999" as="p" size="15px" weight="500">Last Settled</Text>
                                                                        <Flex direction="column" alignItems="flex-start" gap="10px" styles={{"margin-top": "10px"}}>
                                                                            {
                                                                                <>
                                                                                <Text color="#999999" as="p" size="15px" weight="400">{ISOStringToReadableDate([...warehouseData[[col,row].join("-")]?.sort((a,b) => -a.SettledTime.localeCompare(b.SettledTime))][0].SettledTime)}</Text>
                                                                                <Text color="#000000" as="p" size="15px" weight="400">{[...warehouseData[[col,row].join("-")]?.sort((a,b) => -a.SettledTime.localeCompare(b.SettledTime))][0].Name}</Text>
                                                                                </>
                                                                            }
                                                                        </Flex>
                                                                    </Wrapper>
                                                                }
                                                            </Wrapper>
                                                        }
                                                    >
                                                        <GridItem onMouseLeave={() => setShowLocationPopover(false)} active={(showLocationPopover && activeLocationKey === [col,row].join("-") )||(locatedItem?.Items?.length && locatedItem?.Items[0]?.Location.filter(val => val === [col,row].join("-")).length)} onClick={(e) => handleGridItem([row,col].reverse().join("-"))} data-location={[row,col].join("-")}></GridItem>
                                                    </Popover>
                                                ))
                                            }
                                        </GridRow>
                                    ))
                                }
                            </WarehouseUnit>
                            <WarehouseUnit unit="B" label="In the center facing the left" xLabel={["B1","B2","B3","B4"]} yLabel={["R1","R2","R3"].reverse()}>
                                {
                                    ["R1","R2","R3"].reverse().map(row => (
                                        <GridRow key={row+"B"}>
                                            {
                                                ["B1","B2","B3","B4"].map(col => (
                                                    <Popover
                                                        isOpen={showLocationPopover && activeLocationKey === [col,row].join("-")} 
                                                        key={[col,row].join("-")}
                                                        onClose={() => setShowLocationPopover(false)}
                                                        contentStyles={{"background-color": "#ffffff", "padding": "24px",transform: "translate(50%, 100%)"}}
                                                        content={
                                                            <Wrapper padding="0" styles={{"min-width": "340px"}}>
                                                                <Text family="Rubik" weight="500" size="16px" color="#000000">{[col,row].join("-")}</Text>
                                                                {
                                                                    warehouseData[[col,row].join("-")]?.length &&
                                                                    <Wrapper padding="20px 0 0">
                                                                        {
                                                                            warehouseData[[col,row].join("-")]?.map((item) => (
                                                                                <Text key={item.SKU} styles={{"margin-top": "10px"}} as="div" family="Rubik" weight="400" size="15px" color="#000000">{item.Name}</Text>
                                                                            ))
                                                                        }
                                                                    </Wrapper>
                                                                }
                                                                {
                                                                    warehouseData[[col,row].join("-")]?.length &&
                                                                    <Wrapper padding="16px 0 0">
                                                                        <Text color="#999999" as="p" size="15px" weight="500">Last Settled</Text>
                                                                        <Flex direction="column" alignItems="flex-start" gap="10px" styles={{"margin-top": "10px"}}>
                                                                            {
                                                                                <>
                                                                                <Text color="#999999" as="p" size="15px" weight="400">{ISOStringToReadableDate([...warehouseData[[col,row].join("-")]?.sort((a,b) => -a.SettledTime.localeCompare(b.SettledTime))][0].SettledTime)}</Text>
                                                                                <Text color="#000000" as="p" size="15px" weight="400">{[...warehouseData[[col,row].join("-")]?.sort((a,b) => -a.SettledTime.localeCompare(b.SettledTime))][0].Name}</Text>
                                                                                </>
                                                                            }
                                                                        </Flex>
                                                                    </Wrapper>
                                                                }
                                                            </Wrapper>
                                                        }
                                                    >
                                                        <GridItem onMouseLeave={() => setShowLocationPopover(false)} active={(showLocationPopover && activeLocationKey === [col,row].join("-") )||(locatedItem?.Items?.length && locatedItem?.Items[0]?.Location.filter(val => val === [col,row].join("-")).length)} onClick={(e) => handleGridItem([row,col].reverse().join("-"))} data-location={[row,col].join("-")}></GridItem>
                                                    </Popover>
                                                ))
                                            }
                                        </GridRow>
                                    ))
                                }
                            </WarehouseUnit>
                        </Flex>
                        <Flex styles={{"margin-bottom": "50px", "max-width": "1100px"}} alignItems="flex-start" gap="58px">
                            <WarehouseUnit unit="C" label="In the center facing the left" xLabel={["C1","C2","C3","C4"]} yLabel={["R1","R2","R3","R4"].reverse()}>
                                {
                                    ["R1","R2","R3","R4"].reverse().map(row => (
                                        <GridRow key={row+"C"}>
                                            {
                                                ["C1","C2","C3","C4"].map(col => (
                                                    <Popover
                                                        isOpen={showLocationPopover && activeLocationKey === [col,row].join("-")} 
                                                        key={[col,row].join("-")}
                                                        onClose={() => setShowLocationPopover(false)}
                                                        contentStyles={{"background-color": "#ffffff", "padding": "24px",transform: "translate(50%, 100%)"}}
                                                        content={
                                                            <Wrapper padding="0" styles={{"min-width": "340px"}}>
                                                                <Text family="Rubik" weight="500" size="16px" color="#000000">{[col,row].join("-")}</Text>
                                                                {
                                                                    warehouseData[[col,row].join("-")]?.length &&
                                                                    <Wrapper padding="20px 0 0">
                                                                        {
                                                                            warehouseData[[col,row].join("-")]?.map((item) => (
                                                                                <Text key={item.SKU} styles={{"margin-top": "10px"}} as="div" family="Rubik" weight="400" size="15px" color="#000000">{item.Name}</Text>
                                                                            ))
                                                                        }
                                                                    </Wrapper>
                                                                }
                                                                {
                                                                    warehouseData[[col,row].join("-")]?.length &&
                                                                    <Wrapper padding="16px 0 0">
                                                                        <Text color="#999999" as="p" size="15px" weight="500">Last Settled</Text>
                                                                        <Flex direction="column" alignItems="flex-start" gap="10px" styles={{"margin-top": "10px"}}>
                                                                            {
                                                                                <>
                                                                                <Text color="#999999" as="p" size="15px" weight="400">{ISOStringToReadableDate([...warehouseData[[col,row].join("-")]?.sort((a,b) => -a.SettledTime.localeCompare(b.SettledTime))][0].SettledTime)}</Text>
                                                                                <Text color="#000000" as="p" size="15px" weight="400">{[...warehouseData[[col,row].join("-")]?.sort((a,b) => -a.SettledTime.localeCompare(b.SettledTime))][0].Name}</Text>
                                                                                </>
                                                                            }
                                                                        </Flex>
                                                                    </Wrapper>
                                                                }
                                                            </Wrapper>
                                                        }
                                                    >
                                                        <GridItem onMouseLeave={() => setShowLocationPopover(false)} active={(showLocationPopover && activeLocationKey === [col,row].join("-") )||(locatedItem?.Items?.length && locatedItem?.Items[0]?.Location.filter(val => val === [col,row].join("-")).length)} onClick={(e) => handleGridItem([row,col].reverse().join("-"))} data-location={[row,col].join("-")}></GridItem>
                                                    </Popover>
                                                ))
                                            }
                                        </GridRow>
                                    ))
                                }
                            </WarehouseUnit>
                            <WarehouseUnit unit="D" label="Against the right wall and near entrance" xLabel={["D1","D2","D3"]} yLabel={["R1","R2","R3","R4"].reverse()}>
                                {
                                    ["R1","R2","R3","R4"].reverse().map(row => (
                                        <GridRow key={row+"B"}>
                                            {
                                                ["D1","D2","D3",].map(col => (
                                                    <Popover
                                                        isOpen={showLocationPopover && activeLocationKey === [col,row].join("-")} 
                                                        key={[col,row].join("-")}
                                                        onClose={() => setShowLocationPopover(false)}
                                                        contentStyles={{"background-color": "#ffffff", "padding": "24px",transform: "translate(50%, 100%)"}}
                                                        content={
                                                            <Wrapper padding="0" styles={{"min-width": "340px"}}>
                                                                <Text family="Rubik" weight="500" size="16px" color="#000000">{[col,row].join("-")}</Text>
                                                                {
                                                                    warehouseData[[col,row].join("-")]?.length &&
                                                                    <Wrapper padding="20px 0 0">
                                                                        {
                                                                            warehouseData[[col,row].join("-")]?.map((item) => (
                                                                                <Text key={item.SKU} styles={{"margin-top": "10px"}} as="div" family="Rubik" weight="400" size="15px" color="#000000">{item.Name}</Text>
                                                                            ))
                                                                        }
                                                                    </Wrapper>
                                                                }
                                                                {
                                                                    warehouseData[[col,row].join("-")]?.length &&
                                                                    <Wrapper padding="16px 0 0">
                                                                        <Text color="#999999" as="p" size="15px" weight="500">Last Settled</Text>
                                                                        <Flex direction="column" alignItems="flex-start" gap="10px" styles={{"margin-top": "10px"}}>
                                                                            {
                                                                                <>
                                                                                <Text color="#999999" as="p" size="15px" weight="400">{ISOStringToReadableDate([...warehouseData[[col,row].join("-")]?.sort((a,b) => -a.SettledTime.localeCompare(b.SettledTime))][0].SettledTime)}</Text>
                                                                                <Text color="#000000" as="p" size="15px" weight="400">{[...warehouseData[[col,row].join("-")]?.sort((a,b) => -a.SettledTime.localeCompare(b.SettledTime))][0].Name}</Text>
                                                                                </>
                                                                            }
                                                                        </Flex>
                                                                    </Wrapper>
                                                                }
                                                            </Wrapper>
                                                        }
                                                    >
                                                        <GridItem onMouseLeave={() => setShowLocationPopover(false)} active={(showLocationPopover && activeLocationKey === [col,row].join("-") )||(locatedItem?.Items?.length && locatedItem?.Items[0]?.Location.filter(val => val === [col,row].join("-")).length)} onClick={(e) => handleGridItem([row,col].reverse().join("-"))} data-location={[row,col].join("-")}></GridItem>
                                                    </Popover>
                                                ))
                                            }
                                        </GridRow>
                                    ))
                                }
                            </WarehouseUnit>
                        </Flex>
                        <Flex styles={{"margin-bottom": "50px"}} alignItems="flex-start" gap="58px">
                            <WarehouseUnit unit="E" label="Against the right wall" xLabel={["E1"]} yLabel={["R1","R2","R3"].reverse()}>
                                {
                                    ["R1","R2","R3"].reverse().map((row,idx) => (
                                        <GridRow key={row+"E"}>
                                            {
                                                ["E1"].map(col => (
                                                    <Popover
                                                        isOpen={showLocationPopover && activeLocationKey === [col,row].join("-")} 
                                                        key={[col,row].join("-")}
                                                        onClose={() => setShowLocationPopover(false)}
                                                        contentStyles={{"background-color": "#ffffff", "padding": "24px",transform: "translate(50%, 100%)"}}
                                                        content={
                                                            <Wrapper padding="0" styles={{"min-width": "340px"}}>
                                                                <Text family="Rubik" weight="500" size="16px" color="#000000">{[col,row].join("-")}</Text>
                                                                {
                                                                    warehouseData[[col,row].join("-")]?.length &&
                                                                    <Wrapper padding="20px 0 0">
                                                                        {
                                                                            warehouseData[[col,row].join("-")]?.map((item) => (
                                                                                <Text key={item.SKU} styles={{"margin-top": "10px"}} as="div" family="Rubik" weight="400" size="15px" color="#000000">{item.Name}</Text>
                                                                            ))
                                                                        }
                                                                    </Wrapper>
                                                                }
                                                                {
                                                                    warehouseData[[col,row].join("-")]?.length &&
                                                                    <Wrapper padding="16px 0 0">
                                                                        <Text color="#999999" as="p" size="15px" weight="500">Last Settled</Text>
                                                                        <Flex direction="column" alignItems="flex-start" gap="10px" styles={{"margin-top": "10px"}}>
                                                                            {
                                                                                <>
                                                                                <Text color="#999999" as="p" size="15px" weight="400">{ISOStringToReadableDate([...warehouseData[[col,row].join("-")]?.sort((a,b) => -a.SettledTime.localeCompare(b.SettledTime))][0].SettledTime)}</Text>
                                                                                <Text color="#000000" as="p" size="15px" weight="400">{[...warehouseData[[col,row].join("-")]?.sort((a,b) => -a.SettledTime.localeCompare(b.SettledTime))][0].Name}</Text>
                                                                                </>
                                                                            }
                                                                        </Flex>
                                                                    </Wrapper>
                                                                }
                                                            </Wrapper>
                                                        }
                                                    >
                                                        <GridItem onMouseLeave={() => setShowLocationPopover(false)} active={(showLocationPopover && activeLocationKey === [col,row].join("-") )||(locatedItem?.Items?.length && locatedItem?.Items[0]?.Location.filter(val => val === [col,row].join("-")).length)} onClick={(e) => handleGridItem([row,col].reverse().join("-"))} data-location={[row,col].join("-")}></GridItem>
                                                    </Popover>
                                                ))
                                            }
                                        </GridRow>
                                    ))
                                }
                            </WarehouseUnit>
                        </Flex>
                    </Wrapper>
                </Wrapper>
            }
        </Wrapper>
    )
}

export default withRouter(Inventory)

const InputGroup = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
`
const Label = styled.label`
    font-size: ${({theme}) => theme.font.size.xs};
    font-family: ${({theme}) => theme.font.family.primary};
    line-height: ${({theme}) => theme.font.lineHeight.tight};
    color: ${({theme}) => theme.colors.primaryText};
    text-transform: uppercase;
    font-weight: ${({theme}) => theme.font.weight.medium};
    cursor: pointer;
`

const ModifiedLabel = styled(Label)`
    font-size: ${({theme}) => theme.font.size.xsss};
`
const Form = styled.form`
    width: 100%;
    overflow: hidden;
`

const CustomInput = styled.div`
    min-height: 59px;
    width: 100%;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    overflow: hidden;
    background-color: #ffffff;
    gap: 10px;
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    overflow-x: auto;

    & > input {
        flex: 1 0 auto;
        background: transparent;
        border: none;
        font-size: ${({theme}) => theme.font.size.s};
        line-height: ${({theme}) => theme.font.lineHeight.wide};
        font-weight: ${({theme}) => theme.font.weight.medium};
        color: ${({theme}) => theme.colors.primaryText};
        height: 100%;
        outline: none;
    }
`

const Tags = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 0 1 auto;
`

const Tag = styled.button`
    padding: 6px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #000000;
    border-radius: 30px;
    background-color: transparent;
    filter: invert(100%) brightness(0%);
    cursor: pointer;
`
const GridRow = styled.div`
    width: fit-content;
    display: flex;
    flex-wrap: nowrap;
    &:not(:last-of-type) > div > div:first-of-type {
        border-bottom: 1px solid #999999;
    }
    &>div:not(:last-of-type) {
        border-right: 3px solid #999999;
    }
`
const GridItem = styled.div`
    width: 120px;
    height: 90px;
    transition: all .3s ease-in;
    background-color: ${({active}) => active ? "rgba(46, 190, 189, .4)" : "#D9D9D9"};
    position: relative;

    &:hover {
        background-color: #2EBEBD;
    }

`