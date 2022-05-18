import { useEffect, useState } from "react";
import styled from "styled-components";
import { Api, ISOStringToReadableDate } from "../../utils/utils";
import { Flex, Icon, Loader, Text, Wrapper } from "../commons";

const api = new Api()
//from=${ISOStringToReadableDate(new Date()).replace("/", "-")

const RangeAccordion = ({user, label, rangeParams}) => {
    const [isOpen,setIsOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [data,setData] = useState({});
    const fetchData = () => {
        setIsLoading(true)
        api.getHistory(`${rangeParams}`,{"Authorization": `Bearer ${user.accessToken}`})
            .then(data => {
                setData(data)
                setIsLoading(false)
                console.log(data)
            })
    }

    useEffect(() => {
        if(isOpen && !Object.keys(data).length) {
            fetchData()
        }
    }, [isOpen])
    
    return (
        <AccordionWrapper>
            <Header onClick={() => setIsOpen(!isOpen)}>
                <Flex alignItems="center" justifyContent="space-between">
                    <Text size="16px" weight="500">
                        {label}
                    </Text>
                    <Icon styles={{transform: isOpen ? "rotate(90deg)": "rotate(270deg)"}} name="chevron" width="8px" height="12px" />
                </Flex>
            </Header>
            {
                isOpen &&
                <Content>
                    {
                        isLoading ?
                            <Loader size={30} />
                            :
                            data.Items?.length ?
                                <HistoryItems>
                                    {
                                        data.Items?.map((data) => (
                                            <HistoryItem key={data.Id}>
                                                <Text size="16px" color="#808080">{data.Created.match(/\d\d:\d\d/)[0]}</Text>
                                                <Flex styles={{"margin-top": "20px"}} justifyContent="flex-start" alignItems="center" gap="8px">
                                                    <Icon name="user" width="18px" height="18px"/>
                                                    <Text weight="500" color="#000000" size="16px">User ID: {data.UserId}</Text>
                                                </Flex>
                                                <Wrapper padding="20px 26px">
                                                    <Text as="p" size="14px" color="#808080">{data.NewItem.Name || data.OldItem.Name}</Text>
                                                    <Text as="p" styles={{"margin-top": "8px"}} size="14px" color="#000000">
                                                        {
                                                            data.Manipulation === "Create" ?
                                                                "Added item to the system "
                                                            :
                                                            data.Manipulation === "Delete" ?
                                                                "Deleted from the system"
                                                            :
                                                            "Available changed from 150 to 180"
                                                        }
                                                    </Text>
                                                </Wrapper>
                                            </HistoryItem>
                                        ))
                                    }
                                </HistoryItems>
                            :
                            <Text>No Activity</Text>
                    }
                </Content>
            }
        </AccordionWrapper>
    )
}

export default RangeAccordion

const AccordionWrapper = styled.div`
    width: 100%;
    padding: 0 16px;
    &:not(:last-of-type) {
        margin-bottom: 24px;
    }
`

const Header = styled.div`
    width: 100%;
    cursor: pointer;
`
const Content = styled.div`
    width: 100%;
    padding-top: 24px;
`

const HistoryItems = styled.div`
    padding: 20px;
    border: 2px solid #F0F0F0;
    border-radius: 10px;
`

const HistoryItem = styled.div`
    padding: 20px 0;
    &:first-of-type {
        padding: 0 0 20px;
    }
    &:last-of-type {
        padding: 20px 0 0;
    }
    &:not(:last-of-type) {
        border-bottom: 1px solid #f0f0f0;
    }
`