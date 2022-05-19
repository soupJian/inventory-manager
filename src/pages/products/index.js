import { withRouter } from "next/router";
import { useSelector } from "react-redux"
import { useEffect, useReducer, useState } from "react"
import styled from "styled-components";
import { Button, Filter, Flex, Icon, Input, Modal, Pagination, Tab, Table, TableCell, TableRow, Tabs, Text, Wrapper } from "../../components/commons"
import { categoryList, productTemplate, statusList, TableHeaders } from "../../constants/pageConstants/products";
import { Api, objectsToQueryString } from "../../utils/utils";
import product from "./product";


const api = new Api()

const productReducer = (state, {type, payload}) => {
    console.log(type, payload)
    switch (type) {
        case "changeTab":
            return {...state, activeTab:payload, page: 1}
        case "changeStatus":
            return {...state, status:payload}
        case "changePaginateNumber":
            return {...state, page:payload }
        default:
            return state
    }
}

const Products = ({router}) => {
    const user = useSelector(state => state.user.user)
    const [productState, dispatch] = useReducer(productReducer, {
        page: parseInt(router.query.page) || 1,
        status: router.query.status ? router.query.status.split(",") : []
    })
    const [loadingTable, setLoadingTable] = useState(false)
    const [status, setStatus] = useState([])
    const [products, setProducts] = useState({})
    const [productSKUs, setProductSKUs] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [selection, setSelection] = useState([])
    const [newProduct, setNewProduct] = useState({...productTemplate})
    const [newProductModal, setNewProductModal] = useState(false)
    const [newProductLoading, setNewProductLoading] = useState(false)
    const [newProductError, setNewProductError] = useState("");
    const [partsInput, setPartsInput] = useState([{barcode:"", count: 1, item: {}}])
    const [lookUpLoading, setLookUpLoading] = useState(false)
    const [lookUpError, setLookUpError] = useState("");

    const lookUpItem = (idx) => {
        setLookUpLoading(true)
        setLookUpError("")
        console.log({barcode:partsInput[idx]["barcode"]})
        api.getInventory({barcode:partsInput[idx]["barcode"]}, {"Authorization": `Bearer ${user.accessToken}`})
        .then(data => {
            console.log(data)
            if(data.Items && data.Items.length === 0) {
                console.log("message")
                setLookUpError("Sorry, We can't find the item!")
            }
            else if (!data.Items && data.message) {
                console.log("error")
                setLookUpError(data.message)
            }
            else {
                setLookUpLoading(false)
                let newPartsInput = [...partsInput]
                let itemData = {item:data.Items[0]}
                let inputData = {...partsInput[idx], ...itemData}
                newPartsInput.splice(idx,1,inputData)
                setPartsInput(newPartsInput)
            }
        })
        .catch( err => {
            setLookUpLoading(false)
        })
    }

    const handlePartsInput = (idx, e) => {
        let data = [...partsInput]
        data[idx][e.target.name] = e.target.value
        console.log(data[idx])
        setPartsInput(data)
    }

    const addPart = () => {
        let newField = {sku:"", count:1, item: {}}
        setPartsInput([...partsInput, newField])
    }
    const removePart = (idx) => {
        let newParts = [...partsInput]
        newParts.splice(idx,1)
        setPartsInput(newParts)
    }
    const handleStatus = (val) => {
        const idx = productState.status.findIndex(data => data === val)
        let newStatus = [...productState.status]
        if(idx >= 0) {
            newStatus.splice(idx, 1)
            if(newStatus.length) {
                console.log(newStatus, "----> has status")

                dispatch({type: "changeStatus", payload:newStatus})
                router.replace(`/products?${objectsToQueryString({...router.query, status:newStatus.join(",")})}`, null, {shallow:true})

            }
            else {
                console.log(newStatus, "----> no status")
                dispatch({type: "changeStatus", payload:newStatus})
                let params = {...router.query}
                delete params['status']
                router.replace(`/products?${objectsToQueryString({...params})}`, null, {shallow:true})

            }

        }
        else {
            router.replace(`/products?${objectsToQueryString({...router.query, status:[...newStatus, val].join(",")})}`, null, {shallow:true})
            dispatch({type: "changeStatus", payload:[...newStatus, val]})
        }
    }

    const newProductFieldHandler = (e,nestedKey) => {
        if(nestedKey) {
            return setNewProduct({...newProduct, Cost: {...newProduct.Cost,[e.target.name]:e.target.value}})
        }
        else if(e.target.name === "Tags") {
            let newTags = e.target.value.split(",")
            newTags.pop()
            setNewProduct({...newProduct, TagsInput:e.target.value, Tags:newTags})
        }
        else {
            return setNewProduct({...newProduct, [e.target.name]:e.target.value})
        }
    }
    const removeTag = (tag) => {
        const idx = newProduct.Tags.indexOf(tag);
        if(idx >= 0) {
            let newTags = [...newProduct.Tags]
            newTags.splice(idx,1)
            setNewProduct({...newProduct, TagsInput:newTags.join(","), Tags:newTags})
        }
    }

    const submitnewProduct = (e) => {
        setNewProductLoading(true)
        setNewProductError("")
        e.preventDefault();
        console.log("submit")
        if(!newProduct.Name) {
            setNewProductLoading(false)
            setNewProductError("Required")
        }
        else if (Object.keys(partsInput[0].item).length === 0) {
            setNewProductLoading(false)
            setNewProductError("Required")
        }
        else {
            const Parts = partsInput.map((part) => ({SKU:part.item.SKU, Quantity: parseInt(part.count)}))
            let data = {...newProduct, Updated: new Date(), Created: new Date(), Parts}
            delete data['TagsInput']
            console.log(data)
            api.updateProduct(data, {"Authorization": `Bearer ${user.accessToken}`})
                .then(data => {
                    setNewProductLoading(false)
                    setNewProductModal(false)
                    setNewProductError("")
                    setNewProduct({...productTemplate})
                    fetchSKUs()
                })
                .catch(err => {
                    alert(err.message)
                    setNewProductLoading(false)
                    setNewProductModal(false)
                    setNewProductError("")
                    setNewProduct({...productTemplate})
                })
        }
    }

    const fetchSKUs = () => {
        setLoadingTable(true)
        return api.getAllProducts(`projectionExpression=SKU${productState.status ? `&status=${productState.status.join(',')}` : ""}`, {"Authorization": `Bearer ${user.accessToken}`})
                .then(data => {
                    setProductSKUs(data.Items)
                    setLoadingTable(false)
                })
                .catch(err => {
                    setLoadingTable(false)
                    console.log(err)
                })
    }

    const handlePage = (page) => {
        router.replace(`/products?${objectsToQueryString({...router.query, page})}`, null, {shallow:true})
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
        if(products.Items.length > 0) {
            if(products.Items.length === selection.length) {
                setSelection([])
            }
            else {
                const skus = products.Items?.map(item => item.SKU)
                setSelection(skus)
                console.log(skus)
            }
        }
    }


    useEffect(() => {
        fetchSKUs()
    }, [productState.status])

    useEffect(() => {
        if(productSKUs.length) {
            setLoadingTable(true)
            const skusToShow = productSKUs.slice(productState.page * itemsPerPage - itemsPerPage, productState.page * itemsPerPage)
            let str = ""
            skusToShow.forEach(i => { Object.values(i).map(val => { str += val+","})})
            api.getMultipleProducts(`skus=${str}`, {"Authorization": `Bearer ${user.accessToken}`})
                .then((data) => {
                    setProducts(data)
                    setLoadingTable(false)
                })
                .catch(err => {
                    setLoadingTable(false)
                })
        }
    }, [productSKUs, productState.page])

    return (
        <Wrapper styles={{"min-height": "100%"}} height="auto" padding="21px 29px">
            <Flex styles={{"flex-wrap": "nowrap", "align-items": "flex-start"}} justifyContent="space-between">
                <Text as="h1" size="24px" weight="500">Product List</Text>
                <Flex styles={{gap: "9px"}}>
                    <Button onClick={() => setNewProductModal(true)} minWidth="auto" kind="primary" startIcon={<Icon name="add" width="18px" height="19px" styles={{"margin-right": "12px"}} /> }>New</Button>
                    <Input type="text" placeholder="Search name or SKU" startIcon={<Icon name="search" width="30px" height="30px"/>} />
                </Flex>
            </Flex>
            <Flex justifyContent="flex-end" styles={{"margin-top": "27px", gap: "12px"}}>
                <Filter value={productState.status} label="Status" list={statusList} multiSelect onSelect={handleStatus} />
            </Flex>
            <Wrapper padding="23px 0px 0px">
                <Table
                    loading={loadingTable}
                    name="products-items" 
                    selectable 
                    onSelectAll={selectAll}
                    selectedAll={selection.length === products?.Items?.length} 
                    headers={TableHeaders}
                    paginationComponent={<Wrapper padding="32px 0 0"><Pagination itemsInPage={products?.Count} totalItems={productSKUs?.length} totalPages={Math.ceil(productSKUs?.length / itemsPerPage)} onPageChange={handlePage} currentPage={productState.page} /> </Wrapper>}
                    >
                    {
                        products.Items?.map((item,idx) => (
                            <TableRow
                                key={item.SKU+idx}
                                idx={idx} 
                                height="72px" 
                                selectable
                                selected={selection.includes(item.SKU)}
                                onSelect={() => addSelection(item.SKU)}
                                dataId={item.SKU+idx}
                                >
                                {
                                    TableHeaders.map((header, idx) => (
                                        <TableCell key={header.key + idx}>
                                            {
                                                header.key === "Location"?
                                                item[header.key][0]
                                                :
                                                item[header.key]
                                            }
                                        </TableCell>
                                    ))
                                }
                                <TableCell onClick={() => router.push(`/products/product?sku=${item.SKU}`)}>
                                    <Icon styles={{transform: "rotate(180deg)"}} name="chevron" width="8px" height="12px" />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </Table>
            </Wrapper>
            {
                newProductModal && 
                <Modal loading={newProductLoading} title={"Add new product"} closeOnClickOutside={false} onClose={() => setNewProductModal(false)}>
                    <Wrapper padding="10px 0 0">
                        <Text>
                            Add the product’s parts by typing the parts barcode:
                        </Text>
                    </Wrapper>
                    <Wrapper padding="22px 0 0" styles={{"width": "632px"}}>
                        <Form onSubmit={submitnewProduct}>
                            <Wrapper padding="0 0 0">
                                {
                                    partsInput.map((input,idx) => (

                                        <Wrapper key={idx} padding="12px 0">
                                            <Flex styles={{"margin-bottom": "16px"}} alignItems="center" justifyContent="space-between">
                                                <Text weight="500" size="16px" color="#999999">
                                                    Part {idx+1}
                                                </Text>
                                                {
                                                    partsInput.length > 1 && 
                                                    <TriggeringText onClick={() => removePart(idx)}>
                                                        Remove
                                                    </TriggeringText>
                                                }
                                            </Flex>
                                            <InputGroup>
                                                <Label htmlFor="products-new-product-name">BARCODE</Label>
                                                <Input endIcon={<LookupBtn disabled={lookUpLoading} onClick={() => lookUpItem(idx)}>Look up</LookupBtn>} wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="Type barcode to look up the part" value={input.barcode} onChange={(e) => handlePartsInput(idx, e)} name="barcode" type="text" id={`product-part-${idx}`}/>
                                            </InputGroup>
                                            {
                                                Object.keys(input.item).length > 0 &&
                                                <Wrapper padding="16px 0 0">
                                                    <Flex alignItems="flex-start" justifyContent="space-between">
                                                        <InputGroup>
                                                            <Label htmlFor="products-new-product-name">PART NAME</Label>
                                                            <Text size="14px" color="#000000" styles={{"margin-top": "10px"}}>{input.item.Name}</Text>
                                                        </InputGroup>
                                                        <InputGroup>
                                                            <Label htmlFor="products-new-product-name">How many to be used?*</Label>
                                                            <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="Type" value={input.count} onChange={(e) => handlePartsInput(idx, e)} name="count" type="number" id="products-new-product-name"/>
                                                        </InputGroup>
                                                    </Flex>
                                                </Wrapper>
                                            }
                                        </Wrapper>
                                    )) 
                                }
                                <Button onClick={addPart} minWidth="170px" styles={{"gap": "6px", "margin-top": "24px"}} kind="primary">
                                    <Icon name="add" width="14px" height="14px" /> New parts
                                </Button>
                            </Wrapper>
                            <Wrapper padding="24px 0 0">
                                <InputGroup>
                                    <Label htmlFor="products-new-product-name">PRODUCT NAME</Label>
                                    <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="Type" value={newProduct.Name} onChange={(e) => newProductFieldHandler(e)} name="Name" type="text" id="products-new-product-name"/>
                                </InputGroup>
                            </Wrapper>
                            <Wrapper padding="24px 0 0">
                                <InputGroup>
                                    <Label htmlFor="products-new-product-sku">SKU</Label>
                                    <Input wrapperStyles={{"margin-top": "16px", "min-height": "59px"}} inputStyles={{width: "100%"}} placeholder="Type" value={newProduct.SKU} onChange={(e) => newProductFieldHandler(e)} name="SKU" type="text" id="products-new-product-sku"/>
                                </InputGroup>
                            </Wrapper>
                            <Wrapper padding="24px 0 0">
                                <Label htmlFor="warehouse-recieving-sku">TAGS (use comma to seperate)</Label>
                                <CustomInput>
                                    <Tags>
                                        {
                                            newProduct.Tags?.map((tag) => {
                                                if(tag.length) {
                                                    return <Tag  onClick={(e) => removeTag(tag)}  type='button' key={tag}>{tag}<Icon name="close-rounded" width="12px" height="12px" /> </Tag>
                                                }
                                            })
                                        }
                                    </Tags>
                                    <input type="text" name="Tags" value={newProduct.TagsInput} onChange={(e) => newProductFieldHandler(e)} />
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
    )
}

export default withRouter(Products)


const Form = styled.form`
    width: 100%;
    overflow: hidden;
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

const TriggeringText = styled.span`
    color: ${({theme}) => theme.colors.accentText};
    font-family: ${({theme}) => theme.font.family.secondary};
    font-size: 17px;
    cursor: pointer;
`