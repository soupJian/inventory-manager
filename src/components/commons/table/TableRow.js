import React, { useState } from 'react'
import styled from 'styled-components'
import TableCell from './TableCell'
import { Checkbox } from '..'
import Icon from '../icons/Icon'
import { Flex, Wrapper } from '../styled-elements'
import { TableCellWrapper } from './TableCell'

const TableRow = ({
  idx,
  nested,
  selected,
  selectable,
  onSelect,
  dataId,
  expandedContent,
  children,
  rowClick,
  noShowExpand = false,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      {nested ? (
        <>
          <TableRowWrapper
            {...rest}
            bgColor={idx && idx % 2 !== 0 ? '#F6F7F9' : 'transparent'}
            onClick={() => {
              noShowExpand ? rowClick() : setExpanded(true)
            }}
            expanded={expanded}
          >
            {selectable && (
              <TableCell expanded={expanded}>
                <Checkbox
                  inputId={`select-item-${dataId}`}
                  selected={selected}
                  onSelect={onSelect}
                />
              </TableCell>
            )}
            {React.Children.map(children, (child) => {
              return <TableCell expanded={expanded}>{child}</TableCell>
            })}
          </TableRowWrapper>
          {expanded && expandedContent && (
            <TableRowWrapper bgColor="transparent" style={{ padding: 0 }}>
              {/* <ExpandedTableCellWrapper
                expanded={expanded}
                styles={{ 'padding-bottom': '0', 'padding-top': '0' }}
              ></ExpandedTableCellWrapper> */}
              <ExpandedTableCellWrapper
                expanded={expanded}
                styles={{ padding: '0 !important' }}
                colSpan={14}
              >
                <Wrapper onClick={() => setExpanded(false)} padding="0">
                  {/* <Wrapper styles={{position: "relative"}} padding="42px 0 40px"> */}
                  {/* <Flex styles={{position: "absolute", top: "4px", right: "0"}}>
                                      <ActionButton onClick={redirectOnClick}>
                                          <Icon name="edit" width="15px" height="15px"/>
                                      </ActionButton>
                                      <ActionButton onClick={() => setExpanded(false)}>
                                          <Icon name="close" width="15px" height="15px"/>
                                      </ActionButton>
                                  </Flex> */}
                  {expandedContent}
                </Wrapper>
              </ExpandedTableCellWrapper>
            </TableRowWrapper>
          )}
        </>
      ) : (
        <>
          <TableRowWrapper
            {...rest}
            bgColor={idx && idx % 2 !== 0 ? '#F6F7F9' : 'transparent'}
          >
            {selectable && (
              <TableCell expanded={expanded}>
                <Checkbox
                  inputId={`select-item-${dataId}`}
                  selected={selected}
                  onSelect={onSelect}
                />
              </TableCell>
            )}
            {children}
          </TableRowWrapper>
        </>
      )}
    </>
  )
}

export default React.memo(TableRow)

export const TableRowWrapper = styled.tr`
  padding: 12px 20px;
  border: ${({ expanded, theme }) =>
    expanded ? '1px solid ' + theme.colors.borderColor : 'none'};
  border-radius: ${({ expanded }) => (expanded ? '10px' : '0px')};
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
`
const ExpandedTableCellWrapper = styled(TableCellWrapper)`
  border-bottom: ${({ expanded }) => (expanded ? '2px solid #F0F0F0' : 'none')};
  border-top: ${({ expanded }) => (expanded ? 'none' : 'inherit')};
  ${({ styles }) => styles};

  &:first-of-type {
    border-left: ${({ expanded }) => (expanded ? '2px solid #F0F0F0' : 'none')};
    border-bottom-left-radius: ${({ expanded }) => (expanded ? '10px' : '0px')};
    border-top-left-radius: ${({ expanded }) => (expanded ? '0px' : 'inherit')};
  }
  &:last-of-type {
    border-right: ${({ expanded }) =>
      expanded ? '2px solid #F0F0F0' : 'none'};
    border-bottom-right-radius: ${({ expanded }) =>
      expanded ? '10px' : '0px'};
    border-top-right-radius: ${({ expanded }) =>
      expanded ? '0px' : 'inherit'};
  }
`
const ActionButton = styled.button`
  padding: 10px;
  margin: 0 5px;
  background-color: ${({ theme }) => theme.colors.borderColor};
  border-radius: 8px;
  display: grid;
  place-items: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:active {
    transform: scale(0.995);
  }
`
