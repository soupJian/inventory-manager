import React from 'react'
import styled from 'styled-components'

const TableCell = ({ children, styles, expanded, ...rest }) => {
  return (
    <TableCellWrapper expanded={expanded} styles={styles} {...rest}>
      {children}
    </TableCellWrapper>
  )
}

export default React.memo(TableCell)

export const TableCellWrapper = styled.td`
  border-spacing: 0;
  // padding-top: 12px;
  // padding-bottom: 12px;
  border-top: ${({ expanded }) => (expanded ? '2px solid #F0F0F0' : 'none')};
  ${({ styles }) => styles};

  &:first-of-type {
    padding-left: 20px;
    border-left: ${({ expanded }) => (expanded ? '2px solid #F0F0F0' : 'none')};
    border-top-left-radius: ${({ expanded }) => (expanded ? '10px' : '0px')};
  }
  &:last-of-type {
    padding-right: 20px;
    border-right: ${({ expanded }) =>
      expanded ? '2px solid #F0F0F0' : 'none'};
    border-top-right-radius: ${({ expanded }) => (expanded ? '10px' : '0px')};
  }
`
