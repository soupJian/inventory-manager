import { Alert, Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getSearch } from '../../../service/search/search-inventory'
import styled from 'styled-components'
const { Option } = Select

import styles from '../index.module.scss'

const DebounceSelect = ({
  debounceTimeout = 500,
  name,
  placeholder,
  itemKey,
  selectedItem,
  idx,
  value,
  selectValue,
  setNewItemModal,
  setLookedUpItem
}) => {
  const user = useSelector((state) => state.user)
  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState([])
  const fetchRef = useRef(0)
  const handleSelect = (newValue) => {
    selectValue(newValue)
    const selectItem = data.filter((item) => item.SKU == newValue)[0]
    selectedItem(selectItem, idx)
  }
  const debounceFetcher = useMemo(() => {
    const loadOptions = async (value) => {
      selectValue(value)
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setData([])
      setFetching(true)
      if (value == '') {
        setFetching(false)
        return
      }
      const res = await getSearch(
        {
          search: value,
          column: name
        },
        `Bearer ${user.token}`
      )
      if (fetchId !== fetchRef.current) {
        // for fetch callback order
        return
      }
      setData(res?.Items)
      setFetching(false)
    }
    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout, name, user.token])
  useEffect(() => {
    if (value == '') {
      setData([])
    }
  }, [value])
  return (
    <Select
      value={value}
      showSearch
      placeholder={placeholder}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      showArrow={false}
      filterOption={false}
      onSearch={debounceFetcher}
      onSelect={handleSelect}
      onChange={(value) => selectValue(value)}
      optionLabelProp="label"
      name={name}
      className={styles.selectInput}
      dropdownRender={(menu) => {
        return (
          <>
            {menu}
            <Text>
              Can’t find the item.
              <TriggeringText
                onClick={() => {
                  setValue('')
                  setLookedUpItem(null)
                  setNewItemModal(true)
                }}
              >
                Add it to the system
              </TriggeringText>
            </Text>
          </>
        )
      }}
    >
      {data.map((d) => (
        <Option key={d.SKU} label={d[itemKey]}>
          <div style={{ marginLeft: '20px' }}>
            {itemKey == 'Name' ? (
              <>
                <div className={styles.selectTitle}>{d.Name}</div>
              </>
            ) : (
              <>
                <div className={styles.selectTitle}>{d[itemKey]}</div>
                <div className={styles.selectSubTitle}>{d.Name}</div>
              </>
            )}
          </div>
        </Option>
      ))}
    </Select>
  )
}

export default DebounceSelect

const Text = styled.div`
  margin: 10px;
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  color: ${({ theme }) => theme.colors.primaryText};
`
const TriggeringText = styled.span`
  color: ${({ theme }) => theme.colors.accentText};
  text-decoration: underline;
  cursor: pointer;
`
