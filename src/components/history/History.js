import styled from "styled-components"
import { ISOStringToReadableDate } from "../../utils/utils"
import { Flex, Icon, Text, Wrapper } from "../commons"
import RangeAccordion from "./RangeAccordion"

const History = ({children, show, onClose, user}) => {
    
    return (
        <HistoryWrapper show={show}>
            <Content>
                <Title>
                    <Text size="20px" weight="500" as="h3">Activity History</Text>
                </Title>
                <CloseWrapper>
                    <CloseButton onClick={onClose}>
                        <Icon name="close-rounded" width="24px" height="24px" />
                    </CloseButton>
                </CloseWrapper>
                <Body>
                    <RangeAccordion rangeParams={`from=${new Date().toISOString().split("T")[0]}`} user={user} label="Today" />
                    <RangeAccordion user={user} label="Yesterday" />
                    <RangeAccordion user={user} label="Last 7 days" />
                    <RangeAccordion user={user} label="Last 30 days" />
                </Body>
            </Content>
        </HistoryWrapper>
    )
}

export default History

const HistoryWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    z-index: ${({theme}) => theme.zIndex.modal};
    transform: ${({show}) => show ? "translateX(0)" : "translateX(110%)"};
    transition: all .3s ease-in-out;
`
const Content = styled.div`
    position: relative;
    width: 350px;
    height: 100%;
    background-color: #FFFFFF;
    box-shadow: -8px 0px 16px rgba(0, 0, 0, 0.2);
    padding: 56px 16px 0px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`
const CloseWrapper = styled.div`
    position: absolute;
    top: 24px;
    right: 24px;
`
const CloseButton = styled.div`
    background-color: transparent;
    border: none;
    cursor: pointer;
`
const Title = styled.div`
    padding: 20px;
`

const Body = styled.div`
    margin-top: 32px;
    flex: 1 1 auto;
`
