import styled from "styled-components";
import Icon from "../icons/Icon";

const Pagination = ({totalPages, currentPage, totalItems, itemsInPage, onPageChange}) => {

    return (
        <PaginationWrapper>
            <Content>
                <Showing>
                    Showing {itemsInPage} of {totalItems} items
                </Showing>
                {
                    totalPages > 1 &&
                    <Navigation>
                        <PrevButton onClick={() => currentPage === 1 ? null : onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                            <Icon name="chevron" width="10px" height="10px"/>
                        </PrevButton>
                        {   totalPages <= 8 ?
                                [...new Array(totalPages)].map((_,idx) => (
                                    <PageNumber onClick={() => currentPage === idx + 1 ? null : onPageChange(idx + 1)} active={idx + 1 === currentPage} key={idx}>{idx+1}</PageNumber>
                                ))
                                :
                                <>
                                    {
                                        currentPage > 6?
                                            <>
                                                <PageNumber onClick={() => currentPage === 1 ? null : onPageChange(1)} active={1 === currentPage}>{1}</PageNumber>
                                                <PageNumber onClick={() => onPageChange(currentPage - 5)} active={1 === currentPage}>...</PageNumber>
                                                {
                                                    currentPage < totalPages - 5 ?
                                                    <>
                                                    {
                                                        [...new Array(5)].map((_,idx) => (
                                                            <PageNumber key={idx + currentPage} onClick={() => currentPage === currentPage + idx ? null : onPageChange(currentPage + idx)} active={currentPage + idx === currentPage}>{currentPage + idx}</PageNumber>
                                                            
                                                        ))
                                                    }
                                                        <PageNumber onClick={() => onPageChange(currentPage + 5)} active={1 === currentPage}>...</PageNumber>
                                                        <PageNumber onClick={() => currentPage === totalPages ? null : onPageChange(totalPages)} active={totalPages === currentPage}>{totalPages}</PageNumber>

                                                    </>
                                                    :
                                                    <>
                                                    {
                                                        [...new Array(6)].map((_,idx) => (
                                                            <PageNumber key={idx + currentPage} onClick={() => currentPage === totalPages - (5 - idx) ? null : onPageChange(totalPages - (5 - idx))} active={totalPages - (5 - idx) === currentPage}>{totalPages - (5 - idx)}</PageNumber>
                                                            
                                                        ))
                                                    }
                                                    </>
                                                }
                                            </>
                                        :
                                        <>
                                            {
                                                currentPage < totalPages - 5 ?
                                                <>
                                                {
                                                    [...new Array(6)].map((_,idx) => (
                                                        <PageNumber key={idx + 1} onClick={() => currentPage === 1 + idx ? null : onPageChange(1 + idx)} active={1 + idx === currentPage}>{1 + idx}</PageNumber>
                                                        
                                                    ))
                                                }
                                                <PageNumber onClick={() => onPageChange(6 + 1)}>...</PageNumber>
                                                <PageNumber onClick={() => currentPage === totalPages ? null : onPageChange(totalPages)} active={totalPages === currentPage}>{totalPages}</PageNumber>

                                                </>
                                                :
                                                <>
                                                {
                                                    [...new Array(6)].map((_,idx) => (
                                                        <PageNumber key={idx + 1} onClick={() => currentPage === 1 + idx ? null : onPageChange(1 + idx)} active={1 + idx === currentPage}>{1 + idx}</PageNumber>
                                                        
                                                    ))
                                                }
                                                </>
                                            }
                                        </>
                                    }
                                </>

                        }
                        <NextButton onClick={() => currentPage === totalPages ? null : onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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
    color: ${({theme}) => theme.colors.primaryText};
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
    color: ${({active}) => active ? "#ffffff" : "#000000"};
    cursor: pointer;
`