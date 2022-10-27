import React from 'react'
import styled from 'styled-components'
import { Checkbox } from '..'
import { TableRowWrapper } from './TableRow'

const Table = ({
  children,
  onSelectAll,
  selectedAll,
  headers,
  selectable,
  name,
  styles,
  paginationComponent,
  className
}) => {
  return (
    <CustomTableWrapper className={className}>
      <CustomTable styles={styles} border="0" cellSpacing="0" cellPadding="0">
        <TableHead>
          <TableRowWrapper>
            {selectable && onSelectAll && (
              <TableHeadCell>
                <Checkbox
                  inputId={`select-all-${name}`}
                  selected={selectedAll}
                  onSelect={onSelectAll}
                />
              </TableHeadCell>
            )}
            {headers.map((head, idx) => (
              <TableHeadCell key={head.key}>
                {head.label.toUpperCase()}
              </TableHeadCell>
            ))}
          </TableRowWrapper>
        </TableHead>
        <TableBody>{children}</TableBody>
      </CustomTable>
      {paginationComponent && children && <> {paginationComponent} </>}
    </CustomTableWrapper>
  )
}

export default React.memo(Table)

const CustomTableWrapper = styled.div`
  width: 100%;
  padding: 0 25px 30px 33px;
  background-color: #ffffff;
  border-radius: 10px 10px 0px 0px;
`
const CustomTable = styled.table`
  width: 100%;
  ${({ styles }) => styles};
`
const TableHead = styled.thead`
  text-align: left;
  tr {
    th {
      &:first-of-type {
        padding-left: 20px;
      }
      &:last-of-type {
        padding-right: 20px;
      }
    }
  }
`
const TableHeadCell = styled.th`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`

const TableBody = styled.tbody``
