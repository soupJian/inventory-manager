import React from 'react'
import styled from 'styled-components'
import { Checkbox, Loader } from '..'
import { Text } from '../styled-elements'
import { TableRowWrapper } from './TableRow'

const Table = ({
  children,
  loading,
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
      {loading && (
        <LoadingWrapper>
          {children?.length > 3 && <Loader size={70} />}
          <Text>Loading data...</Text>
        </LoadingWrapper>
      )}
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
  background-color: #ffffff;
  border-radius: 10px 10px 0px 0px;
  position: relative;
`
const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`
const CustomTable = styled.table`
  width: 100%;
  ${({ styles }) => styles};
`

const TableHead = styled.thead``
const TableHeadCell = styled.th`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: ${({ theme }) => theme.font.size.xss};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  color: ${({ theme }) => theme.colors.primaryText};
  text-align: left;
  padding-bottom: 10px;

  &:first-of-type {
    padding-left: 20px;
  }
  &:last-of-type {
    padding-right: 20px;
  }
  ${({ styles }) => styles};
`

const TableBody = styled.tbody``
