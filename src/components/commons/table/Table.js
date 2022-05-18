import React from "react"
import { useState } from "react"
import styled from "styled-components"
import { Checkbox } from ".."
import Icon from "../icons/Icon"
import { Flex, Wrapper } from "../styled-elements"

//Note on using this component, use TableCell in rendering table data when using a table row without nested/expanded content

export const TableCell = ({children,styles, expanded, ...rest}) => {
    return (
        <TableCellWrapper expanded={expanded} styles={styles} {...rest}>
            {children}
        </TableCellWrapper>
    )
}

export const TableRow = ({ idx, nested, selected, selectable, onSelect, dataId, expandedContent, redirectOnClick, children, ...rest}) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <>
            {
                nested ?
                <>
                    <TableRowWrapper
                        {...rest} 
                        bgColor={(idx && idx%2 !== 0) ? "#F6F7F9" : "transparent"} 
                        onClick={() =>setExpanded(true)}
                        expanded={expanded}>
                        {
                            selectable &&
                            <TableCell expanded={expanded}>
                                <Checkbox inputId={`select-item-${dataId}`} selected={selected} onSelect={onSelect} />
                            </TableCell>
                        }
                        {
                            React.Children.map(children, (child) => {
                                return (
                                    <TableCell expanded={expanded}>
                                        {child}
                                    </TableCell>
                                )
                            })
                        }
                    </TableRowWrapper>
                    {
                        (expanded && expandedContent) &&
            
                        <TableRowWrapper bgColor="transparent">
                            <ExpandedTableCellWrapper  expanded={expanded} styles={{"padding-bottom": "0","padding-top": "0"}}></ExpandedTableCellWrapper>
                            <ExpandedTableCellWrapper  expanded={expanded} styles={{"padding-bottom": "0","padding-top": "0"}} colSpan={14}>
                                <Wrapper styles={{position: "relative"}} padding="42px 0 40px">
                                    <Flex styles={{position: "absolute", top: "4px", right: "0"}}>
                                        <ActionButton onClick={redirectOnClick}>
                                            <Icon name="edit" width="15px" height="15px"/>
                                        </ActionButton>
                                        <ActionButton onClick={() => setExpanded(false)}>
                                            <Icon name="close" width="15px" height="15px"/>
                                        </ActionButton>
                                    </Flex>
                                    {expandedContent}
                                </Wrapper>
                            </ExpandedTableCellWrapper>
                        </TableRowWrapper>
                    }
                </>
                :
                <>
                    <TableRowWrapper
                        {...rest} 
                        bgColor={(idx && idx%2 !== 0) ? "#F6F7F9" : "transparent"} 
                        >
                        {
                            selectable &&
                            <TableCell expanded={expanded}>
                                <Checkbox inputId={`select-item-${dataId}`} selected={selected} onSelect={onSelect} />
                            </TableCell>
                        }
                        {
                            children
                        }
                    </TableRowWrapper>
                </>
            }
        
        </>
    )
}

const Table = ({children, onSelectAll, selectedAll, headers, selectable, name, styles, paginationComponent}) => {
    return (
        <CustomTableWrapper>
            <CustomTable styles={styles} border="0" cellSpacing="0" cellPadding="0">
                <TableHead>
                    <TableRowWrapper>
                        {
                            selectable && onSelectAll &&
                                <TableHeadCell>
                                    <Checkbox inputId={`select-all-${name}`} selected={selectedAll} onSelect={onSelectAll} />
                                </TableHeadCell>
                        }
                        {
                            headers.map((head,idx) => (
                                <TableHeadCell key={head.key}>
                                    {head.label.toUpperCase()}
                                </TableHeadCell>
                            ))
                        }
                    </TableRowWrapper>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </CustomTable>
            {
                paginationComponent && children &&  <> {paginationComponent} </>
            }
        </CustomTableWrapper>
    )
}

export default Table;

const CustomTableWrapper = styled.div`
    width: 100%;
    padding: 30px 28px 48px 33px;
    background-color: #ffffff;
    border-radius: 10px 10px 0px 0px;
`
const CustomTable = styled.table`
    width: 100%;
    ${({styles}) => styles};
`

const TableHead = styled.thead`

`
const TableHeadCell = styled.th`
    font-family: ${({theme}) => theme.font.family.primary};
    font-size: ${({theme}) => theme.font.size.xss};
    font-weight: ${({theme}) => theme.font.weight.medium};
    line-height: ${({theme}) => theme.font.lineHeight.normal};
    color: ${({theme}) => theme.colors.primaryText};
    text-align: left;
    padding-bottom: 20px;
    
    &:first-of-type {
        padding-left: 20px;
    }
    &:last-of-type {
        padding-right: 20px;
    }
    ${({styles}) => styles};
`
const TableRowWrapper = styled.tr`
    padding: 12px 20px;
    border: ${({expanded, theme}) => expanded ? "1px solid " + theme.colors.borderColor : "none"};
    border-radius: ${({expanded}) => expanded ? "10px" : "0px"};
    background-color: ${({bgColor}) => bgColor};
    cursor: pointer;
`

const TableBody = styled.tbody`

`
const TableCellWrapper = styled.td`
    border-spacing:0;
    padding-top: 12px;
    padding-bottom: 12px;
    border-top: ${({expanded}) => expanded ? "2px solid #F0F0F0" : "none"};
    ${({styles}) => styles};

    &:first-of-type {
        padding-left: 20px;
        border-left: ${({expanded}) => expanded ? "2px solid #F0F0F0" : "none"};
        border-top-left-radius: ${({expanded}) => expanded ? "10px" : "0px"};
        
    }
    &:last-of-type {
        padding-right: 20px;
        border-right: ${({expanded}) => expanded ? "2px solid #F0F0F0" : "none"};
        border-top-right-radius: ${({expanded}) => expanded ? "10px" : "0px"};

    }

`
const ExpandedTableCellWrapper = styled(TableCellWrapper)`
    border-bottom: ${({expanded}) => expanded ? "2px solid #F0F0F0" : "none"};
    border-top: ${({expanded}) => expanded ? "none" : "inherit"};
    ${({styles}) => styles};

    &:first-of-type {
        border-left: ${({expanded}) => expanded ? "2px solid #F0F0F0" : "none"};
        border-bottom-left-radius: ${({expanded}) => expanded ? "10px" : "0px"};
        border-top-left-radius: ${({expanded}) => expanded ? "0px" : "inherit"};
        
    }
    &:last-of-type {
        border-right: ${({expanded}) => expanded ? "2px solid #F0F0F0" : "none"};
        border-bottom-right-radius: ${({expanded}) => expanded ? "10px" : "0px"};
        border-top-right-radius: ${({expanded}) => expanded ? "0px" : "inherit"};
    }

`

const ActionButton = styled.button`
    padding: 10px;
    margin: 0 5px;
    background-color: ${({theme}) => theme.colors.borderColor};
    border-radius: 8px;
    display: grid;
    place-items: center;
    border: none;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:active {
        transform: scale(0.995);
    }
`
