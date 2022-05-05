import { useEffect, useState } from "react";
import styled from "styled-components";
import scannerLogo from "../../public/images/scanner.png"
import Image from "next/image";
import { Alert, Box, Button as ButtonV1, Dropdown, Filter, Flex, Icon, Input, Loader, Modal, Popover, Tab, Table, TableCell, TableRow, Tabs, Wrapper } from "../components/commons";
import { Api, ISOStringToReadableDate } from "../utils/utils";
import { dateList, itemTemplate, locations, settledHeaders, unSettledHeaders } from "../constants/pageConstants/warehouse";
import Tooltip from "../components/commons/Tooltip/Tooltip";

const api = new Api()


const Warehouse = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [recievingType, setRecievingType] = useState(0);
    const [scanning, setScanning] = useState(false);
    const [scan, setScan] = useState(false);
    //for looking up an Item
    const [sku, setSku] = useState("");
    const [barcode, setBarcode] = useState("");
    const [lookedUpItem, setLookedUpItem] = useState(null);
    const [lookedUpItemCount, setLookedUpItemCount] = useState(0);
    const [lookUpLoading, setLookUpLoading] = useState(false);
    const [lookUpError, setLookUpError] = useState("");
    //for settling items
    const [settledDate, setSettledDate] = useState([]);
    const [settlingOption, setSettlingOption] = useState(0);
    const [settledItems, setSettledItems] = useState([])
    const [unSettledItems, setUnSettledItems] = useState([])
    const [locationList, setLocationList] = useState([])
    //for adding new Item
    const [newItem, setNewItem] = useState({...itemTemplate})
    const [newItemModal, setNewItemModal] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [newItemError, setNewItemError] = useState("");

    const lookUpItem = async (key) => {
        console.log(key)
        setLookedUpItem(null)
        setLookUpLoading(true)
        setLookUpError("")
        let param = {}
        if(key === "sku"){
            setBarcode("")
            param = {[key]:sku}
        }
        else{
            setSku("")
            param = {[key]:barcode}
        }
        api.getInventory(param)
        .then(data => {
            if(data.Items && data.Items.length === 0) {
                setLookUpError("Sorry, We can't find the item!")
            }
            else if (!data.Items && data.message) {
                setLookUpError(data.message)
            }
            setLookUpLoading(false)
            setLookedUpItem(data.Items[0])
        })
        .catch( err => {
            setLookUpLoading(false)
        })
    }

    const saveItem = () => {
        if(lookUpItem) {
            setLookUpLoading(true)
            api.updateInventory({...lookedUpItem, Updated: new Date(),Stock: parseInt(lookedUpItemCount)})
                .then((data) => {
                    lookUpItem(sku ? "sku" : "barcode")
                })
        }
    }

    const startScan = () => {
        setScan(true)
        setScanning(true)
    }

    const handleDate = (val) => {
        const idx = settledDate.findIndex(data => data.value === val.value)
        let newSettledDate = [...settledDate]
        if(idx >= 0) {
            newSettledDate.splice(idx, 1)
            setSettledDate(newSettledDate)
        }
        else {
            setSettledDate([...newSettledDate, val])
        }
    }

    const handleLocationList = (name,val) => {
        const idx = locationList[name].findIndex(loc => loc.value === val.value)
        let newLocationList = [...locationList[name]]
        if(idx >= 0) {
            newLocationList.splice(idx, 1)
            setLocationList({...locationList, [name]: newLocationList})
        }
        else {
            setLocationList({...locationList, [name]: [...newLocationList,val]})
        }

    }

    const saveLocations = (key) => {
        const locationsToBeSave = [...locationList[key].map(loc => loc.value)]
        let item = unSettledItems.filter(item => item.SKU === key)[0]
        api.updateInventory({...item, SettledTime: new Date(), Settled: true,["Location"]:locationsToBeSave})
            .then(data => {
                if(data) {
                    api.getUnsettledInventory()
                        .then(data => {
                        let locationListObj = {}
                        setUnSettledItems(data.Items)
                        data.Items.forEach((item) => locationListObj[item.SKU] = [])
                        setLocationList(locationListObj)
                    })
                }
            })
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
            let data = {...newItem, Updated: new Date(), Created: new Date(), TotalCost}
            delete data['TagsInput']
            api.updateInventory(data)
                .then(data => {
                    setNewItemLoading(false)
                    setNewItemModal(false)
                    setNewItemError("")
                    setNewItem({...itemTemplate})
                })
        }
    }

    useEffect(() => {
        if(lookedUpItem) setLookedUpItemCount(lookedUpItem.Stock)
    },[lookedUpItem])

    useEffect(() => {
        api.getSettledInventory()
        .then(data => {
            setSettledItems(data.Items)
        })
        api.getUnsettledInventory()
        .then(data => {
            console.log("fetching")
            let locationListObj = {}
            setUnSettledItems(data.Items)
            data.Items.forEach((item) => locationListObj[item.SKU] = [])
            console.log(locationListObj)
            setLocationList(locationListObj)
        })
    },[])

    return (
        <Wrapper styles={{"min-height": "100%"}} height="auto"  padding="21px 29px">
            <Flex justifyContent="space-between">
                <Tabs>
                    <Tab onClick={() => setActiveTab(0)} active={0 === activeTab} idx={0}>Receiving</Tab>
                    <Tab onClick={() => setActiveTab(1)} active={1 === activeTab} idx={1}>Settling</Tab>
                </Tabs>
                {
                    activeTab && <Input type="text" placeholder="Search name or SKU" startIcon={<Icon name="search" width="30px" height="30px"/>} />
                }
            </Flex>
            {
                activeTab ?
                    <Wrapper height="auto" padding="36px 0">
                        <Flex justifyContent="space-between" alignItems="center">
                            <Tabs>
                                <Tab contentStyles={{"font-size": "18px"}} onClick={() => setSettlingOption(0)} active={0 === settlingOption} idx={0}>Not Settled</Tab>
                                <Tab contentStyles={{"font-size": "18px"}}  onClick={() => setSettlingOption(1)} active={1 === settlingOption} idx={1}>Settled</Tab>
                            </Tabs>
                            <Filter value={settledDate} activeIndex={0} multiSelect label={settlingOption ? "Settled": "Recieved"} list={dateList} onSelect={handleDate} />
                        </Flex>
                        <Wrapper padding="22px 0">
                            {
                                settlingOption ?
                                <>
                                    <Table name="warehousing-settled" headers={settledHeaders}>
                                        {
                                            settledItems.map((item,idx) => (
                                                <TableRow
                                                    idx={idx} 
                                                    height="72px"
                                                    key={item.SKU}
                                                >
                                                    {
                                                        settledHeaders.map(i => (
                                                            <TableCell key={i.key}>
                                                                {
                                                                    i.key === "SettledTime" ?
                                                                    ISOStringToReadableDate(item[i.key])
                                                                    :
                                                                    i.key === "Location" ?
                                                                    <Flex justifyContent="flex-start"> 
                                                                    {item[i.key][0]}
                                                                        {
                                                                            item[i.key].length > 1 &&
                                                                            <Tooltip 
                                                                                wrapperStyles={{"margin-left": "4px"}}
                                                                                contentStyles={{"background-color": "#ffffff"}}
                                                                                place="top"
                                                                                content={
                                                                                    <Wrapper>
                                                                                        <HeaderText>All Locations</HeaderText>
                                                                                        <Flex>
                                                                                            {
                                                                                                item[i.key].map((loc) => (
                                                                                                    <SpanText key={loc}>
                                                                                                        {loc};
                                                                                                    </SpanText>
                                                                                                ))
                                                                                            }
                                                                                        </Flex>
                                                                                    </Wrapper>
                                                                                }
                                                                                >
                                                                                <Button styles={{"padding": "3px", "background-color": "#000000", "border-radius": "50%", width: "20px", height: "20px"}}>
                                                                                    <Icon name="add" width="100%" height="100%"/>
                                                                                </Button>
                                                                            </Tooltip>
                                                                        }
                                                                    </Flex>
                                                                    :
                                                                    item[i.key]
                                                                }
                                                            </TableCell>
                                                        ))
                                                    }
                                                </TableRow>
                                            ))
                                        }
                                    </Table>
                                </>
                                :
                                <>
                                    <Table name="warehousing-unsettled" headers={unSettledHeaders}>
                                        {
                                            unSettledItems.map((item,idx) => (
                                                <TableRow
                                                    idx={idx} 
                                                    height="72px"
                                                    key={item.SKU}
                                                >
                                                    {
                                                        unSettledHeaders.map(i => (
                                                            <TableCell key={i.key}>
                                                                {
                                                                    i.key === "Location" ?
                                                                    <Flex alignItems="stretch" justifyContent="flex-start">
                                                                        <Filter name={item.SKU} value={locationList[item.SKU]} label="" list={locations} multiSelect onSelect={handleLocationList} />
                                                                        <SettleButton onClick={() => saveLocations(item.SKU)}>Settle</SettleButton>
                                                                    </Flex>
                                                                    :
                                                                    item[i.key]
                                                                }
                                                            </TableCell>
                                                        ))
                                                    }
                                                </TableRow>
                                            ))
                                        }
                                    </Table>
                                </>
                            }
                        </Wrapper>
                    </Wrapper>
                :
                    <Wrapper height="auto"  padding="38px 0">
                        <Alert type="notification" styles={{display: "flex", "align-items": "center", borderRadius: "10px", width: "fit-content"}}>
                            <Icon name="notification" width="20px" height="20px"/>
                            <Text>For new products without SKU/Barcode, <TriggeringText>create one first</TriggeringText> </Text>
                        </Alert>

                        <Wrapper height="auto" padding="47px 0 0">
                            <Tabs>
                                <Tab contentStyles={{"font-size": "18px"}} onClick={() => setRecievingType(0)} active={0 === recievingType} idx={0}>Scan</Tab>
                                <Tab contentStyles={{"font-size": "18px"}}  onClick={() => setRecievingType(1)} active={1 === recievingType} idx={1}>Type SKU/Barcode</Tab>
                            </Tabs>
                            {
                                recievingType ?
                                <>
                                    <Flex alignItems="flex-start" justifyContent="flex-start" styles={{width: "100%", "padding-top": "58px", gap: "40px"}}>
                                        <CustomInputGroup>
                                            <Label htmlFor="warehouse-recieving-sku">SKU</Label>
                                            <Input readOnly={lookUpLoading} endIcon={<LookupBtn disabled={lookUpLoading} onClick={() => lookUpItem("sku")}>Look up</LookupBtn>} wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="Type" value={sku} onChange={(e) => setSku(e.target.value)} name="sku" type="text" id="warehouse-recieving-sku" />
                                        </CustomInputGroup>
                                        <Separator>
                                            or
                                        </Separator>
                                        <CustomInputGroup>
                                            <Label htmlFor="warehouse-recieving-barcode">Barcode</Label>
                                            <Input readOnly={lookUpLoading} endIcon={<LookupBtn disabled={lookUpLoading} onClick={() => lookUpItem("barcode")}>Look up</LookupBtn>} wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="Type" value={barcode} onChange={(e) => setBarcode(e.target.value)} name="barcode" type="text" id="warehouse-recieving-barcode" />
                                        </CustomInputGroup>
                                    </Flex>
                                    <Wrapper padding="16px 0">
                                        <Alert type="notification" styles={{display: "flex", "align-items": "center", borderRadius: "10px", width: "fit-content"}}>
                                            <Icon name="notification" width="20px" height="20px"/>
                                            <Text>Can’t find the item.<TriggeringText onClick={() => setNewItemModal(true)}> Add it to the system</TriggeringText> </Text>
                                        </Alert>
                                    </Wrapper>
                                    {
                                        lookUpLoading && 
                                        <Loader size={30} />
                                    }
                                    {
                                        lookUpError && 
                                        <ErrorMessage>
                                            {lookUpError}
                                        </ErrorMessage>
                                    }
                                    {
                                        lookedUpItem && !lookUpLoading && 
                                        <Wrapper padding="30px 0 39px">
                                            <LookedUpItemName>
                                                Intaking: <strong>{lookedUpItem.Name}</strong>
                                            </LookedUpItemName>

                                            <Wrapper padding="0" styles={{"max-width": "335px", "margin-top": "39px"}}>
                                                <InputGroup>
                                                    <Label htmlFor="warehouse-recieving-barcode">count</Label>
                                                    <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="Type" value={lookedUpItemCount} onChange={(e) => setLookedUpItemCount(e.target.value)} name="item-count" type="number" id="warehouse-recieving-lookedup-item" />
                                                </InputGroup>
                                                <ButtonV1 loading={lookUpLoading} onClick={saveItem} styles={{"margin-top": "36px"}} minWidth="78px" kind="primary">
                                                    Save
                                                </ButtonV1>
                                            </Wrapper>
                                        </Wrapper>

                                    }
                                </>
                                :
                                <>
                                <Flex alignItems="flex-start" styles={{width: "100%", "padding-top": "66px"}}>
                                    <Box 
                                        as="button" 
                                        borderType="dashed" 
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            startScan()
                                        }}
                                    >
                                        <LogoBox>
                                            <Image src={scannerLogo} alt="scan" layout="responsive"/>
                                        </LogoBox>
                                        <Text>Click to start scanning</Text>
                                    </Box>
                                </Flex>
                                {
                                    scan && 
                                    <Modal onClose={() => setScan(false)}>

                                    </Modal>
                                }
                                </>
                            }
                        </Wrapper>
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
                                                <Label htmlFor="warehouse-recieving-sku">REORDER ALERT</Label>
                                                <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="0" value={newItem.ReorderAlert} onChange={(e) => newItemHandler(e)} name="ReorderAlert" type="number" id="warehouse-new-item-reorder-alert"/>
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
                                            <ButtonV1 type="submit" kind="primary">Save</ButtonV1>
                                        </Flex>
                                    </Form>
                                </Wrapper>
                            </Modal>
                        }
                    </Wrapper>
            }
        </Wrapper>
    )
}

export default Warehouse;


const Text = styled.p`
    margin-left: 10px;
    font-size: ${({theme}) => theme.font.size.s};
    font-weight: ${({theme}) => theme.font.weight.normal};
    font-family: ${({theme}) => theme.font.family.primary};
    line-height: ${({theme}) => theme.font.lineHeight.normal};
    color: ${({theme}) => theme.colors.primaryText};
`
const TriggeringText = styled.span`
    color: ${({theme}) => theme.colors.accentText};
    text-decoration: underline;
    cursor: pointer;
`

const LogoBox = styled.div`
    width: 96px;
    height: 96px;
    margin-bottom: 20px;
`
const InputGroup = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
`
const CustomInputGroup = styled.div`
    position: relative;
    min-width: 335px;
    &:not(:last-of-type) {
        margin-bottom: 16px;
    }
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
const Separator = styled.div`
    font-family: ${({theme}) => theme.font.family.primary};
    font-size: 22px;
    font-weight: ${({theme}) => theme.font.weight.medium};
    align-self: center;
`

const LookedUpItemName = styled.h3`
    font-size: ${({theme}) => theme.font.size.md};
    font-family: ${({theme}) => theme.font.family.primary};
    line-height: ${({theme}) => theme.font.lineHeight.tight};
    color: ${({theme}) => theme.colors.primaryText};
    font-weight: ${({theme}) => theme.font.weight.normal};

    & > strong {
        font-weight: ${({theme}) => theme.font.weight.medium};
    }
`

const LookupBtn = styled.button `
    padding: 6px 12px;
    font-family: ${({theme}) => theme.font.family.secondary};
    font-size: ${({theme}) => theme.font.size.xs};
    font-weight: ${({theme}) => theme.font.weight.medium};
    color: #ffffff;
    background-color: #000000;
    white-space: nowrap;
    border-radius: 10px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:active {
        background-color: #ffffff;
        color: #000000;
        border: 1px solid #000000;
        transform: scale(0.975);
    }
    &:hover {
        background-color: #ffffff;
        color: #000000;
        border: 1px solid #000000;
    }
`
const SettleButton = styled.button `
    margin-left: 10px;
    padding: 8px 16px;
    font-family: ${({theme}) => theme.font.family.secondary};
    font-size: ${({theme}) => theme.font.size.xs};
    font-weight: ${({theme}) => theme.font.weight.medium};
    color: #ffffff;
    background-color: #000000;
    white-space: nowrap;
    border-radius: 10px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:active {
        background-color: #ffffff;
        color: #000000;
        border: 1px solid #000000;
        transform: scale(0.975);
    }
    &:hover {
        background-color: #ffffff;
        color: #000000;
        border: 1px solid #000000;
    }
`
const Button = styled.button`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #000000;
    cursor: pointer;
    padding: 5px;
    border: none;
`

const ErrorMessage = styled.p`
    font-size: ${({theme}) => theme.font.size.xs};
    font-family: ${({theme}) => theme.font.family.primary};
    line-height: ${({theme}) => theme.font.lineHeight.tight};
    color: ${({theme}) => theme.colors.error};
`

const HeaderText = styled.p`
    font-size: ${({theme}) => theme.font.size.xsss};
    font-family: ${({theme}) => theme.font.family.primary};
    line-height: ${({theme}) => theme.font.lineHeight.tight};
    color: ${({theme}) => theme.colors.secondaryText};
    white-space: nowrap;
    margin-bottom: 16px;
`
const SpanText = styled.span`
    font-size: ${({theme}) => theme.font.size.xss};
    font-family: ${({theme}) => theme.font.family.primary};
    line-height: ${({theme}) => theme.font.lineHeight.tight};
    color: ${({theme}) => theme.colors.primaryText};
    white-space: nowrap;
    margin-right: 4px;
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
