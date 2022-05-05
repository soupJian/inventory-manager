import { useState } from "react";
import { Alert, Box, Filter, Flex, Icon, Input, Tab, Tabs, Wrapper } from "../components/commons";

const dateList = [
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

const Orders = () => {
    const [activeTab, setActiveTab] = useState(0)
    const [shipDate, setShipDate] = useState([])
    const [orderDate, setOrderDate] = useState([])

    return (
        <Wrapper styles={{"min-height": "100%"}} height="auto" padding="21px 29px">
            <Flex styles={{"flex-wrap": "nowrap"}} justifyContent="space-between">
                <Tabs>
                    <Tab onClick={() => setActiveTab(0)} active={0 === activeTab} idx={0}>Current Orders</Tab>
                    <Tab onClick={() => setActiveTab(1)} active={1 === activeTab} idx={1}>Order History</Tab>
                </Tabs>
                <Input type="text" placeholder="Search order number" startIcon={<Icon name="search" width="30px" height="30px"/>} />
            </Flex>
            <Flex justifyContent="flex-end" styles={{"margin-top": "27px", gap: "12px"}}>
                {
                    activeTab === 1 &&  <Filter value={shipDate} label="Ship date" list={dateList} multiSelect onSelect={setShipDate} />
                }
                <Filter value={orderDate} label="Order date" list={dateList} multiSelect onSelect={setOrderDate} />
            </Flex>
        </Wrapper>
    )
}

export default Orders
