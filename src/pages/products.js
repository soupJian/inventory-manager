import { useState } from "react"
import { Button, Filter, Flex, Icon, Input, Tab, Table, Tabs, Wrapper } from "../components/commons"


const statusList = [
    {
        label: "In stock",
        value: "IN_STOCK"
    },
    {
        label: "Out of stock",
        value: "OUT_OF_STOCK"
    },
    {
        label: "Low stock",
        value: "LOW_STOCK"
    }
]

const categoryList = [
    {
        label: "All categories",
        value: "all"
    }
]

const TableHeaders = ["Product Name", "SKU", "Stock", "Available", "Reserved"]

const Products = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [status, setStatus] = useState([])
    const [category, setCategory] = useState([])

    return (
        <Wrapper styles={{"min-height": "100%"}} height="auto" padding="21px 29px">
            <Flex styles={{"flex-wrap": "nowrap"}} justifyContent="space-between">
                <Tabs>
                    <Tab onClick={() => setActiveTab(0)} active={0 === activeTab} idx={0}>Product List</Tab>
                    <Tab onClick={() => setActiveTab(1)} active={1 === activeTab} idx={1}>Item Categories</Tab>
                </Tabs>
                <Flex styles={{gap: "9px"}}>
                    <Button type="primary" startIcon={<Icon name="add" width="18px" height="19px" /> }></Button>
                    <Input type="text" placeholder="Search name or SKU" startIcon={<Icon name="search" width="30px" height="30px"/>} />
                </Flex>
            </Flex>
            <Flex justifyContent="flex-end" styles={{"margin-top": "27px", gap: "12px"}}>
                <Filter value={category} label="Category" list={categoryList} multiSelect onSelect={setCategory} />
                <Filter value={status} label="Status" list={statusList} multiSelect onSelect={setStatus} />
            </Flex>
            <Wrapper padding="23px 0px 0px">
                <Table name="products-items" selectable onSelectAll={() => {}} headers={TableHeaders}>

                </Table>
            </Wrapper>
        </Wrapper>
    )
}

export default Products

