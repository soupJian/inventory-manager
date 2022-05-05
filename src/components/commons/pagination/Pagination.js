import styled from "styled-components";
import Icon from "../icons/Icon";

const Pagination = ({totalPages, totalItems, itemsInPage, currentPage}) => {
    return (
        <PaginationWrapper>
            <Content>
                <Showing>
                    Showing {itemsInPage} of {totalItems} items
                </Showing>
                {
                    totalPages > 1 &&
                    <Navigation>
                        <PrevButton disabled={currentPage === 1}>
                            <Icon name="chevron" width="10px" height="10px"/>
                        </PrevButton>
                        <NextButton disabled={currentPage === totalPages}>
                            <Icon name="chevron" width="10px" height="10px"/>
                        </NextButton>
                    </Navigation>
                }
            </Content>
        </PaginationWrapper>
    )
}

export default Pagination;

const PaginationWrapper = styled.div`
    width: 100%;
`
const Content = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`
const Showing = styled.p`
    font-family: ${({theme}) => theme.font.family.secondary};
    font-size: ${({theme}) => theme.font.size.xs};
    font-weight: ${({theme}) => theme.font.weight.normal};
    color: ${({theme}) => theme.colors.textPrimary};
`

const Navigation = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`
const PageButton = styled.button`
    width: 32px;
    height: 32px;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    border-color: #D9D9D9;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
`
const PrevButton = styled(PageButton)`
    
    cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};
    & img {
        filter: ${({disabled}) => disabled ? "invert(78%) sepia(1%) saturate(1656%) hue-rotate(3deg) brightness(79%) contrast(83%)" : "none"};
    }
`
const NextButton = styled(PageButton)`
    cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};
    transform: rotate(180deg);

    & img {
        filter: ${({disabled}) => disabled ? "invert(78%) sepia(1%) saturate(1656%) hue-rotate(3deg) brightness(79%) contrast(83%)" : "none"};
    }
`
const PageNumber = styled(PageButton)`
    background-color: ${({active}) => active ? "#000000" : ""};
    border-color: ${({active}) => active ? "#000000" : "#D9D9D9"};
    color: ${({active}) => active ? "#000000" : "#ffffff"};
`