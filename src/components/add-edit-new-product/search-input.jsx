import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import React, { useMemo, useRef, useState } from 'react'
import { getSearch } from '../../service/search/search-inventory'
const { Option } = Select

import styles from './index.module.less'

const DebounceSelect = ({
  debounceTimeout = 500,
  name,
  placeholder,
  itemKey,
  selectPart,
  idx,
  selectValue
}) => {
  const [value, setValue] = useState(selectValue)
  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState([])
  const fetchRef = useRef(0)
  const handleSelect = (newValue) => {
    setValue(newValue)
    const selectItem = data.filter((item) => item.SKU == newValue)[0]
    selectPart(selectItem, idx)
  }
  const debounceFetcher = useMemo(() => {
    const loadOptions = async (value) => {
      setValue(value)
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setData([])
      setFetching(true)
      if (value == '') {
        setFetching(false)
        return
      }
      const res = await getSearch({
        search: value,
        column: name
      })
      if (fetchId !== fetchRef.current) {
        // for fetch callback order
        return
      }
      setData(res?.Items)
      setFetching(false)
    }
    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout, name])
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
      onChange={setValue}
      optionLabelProp="label"
      name={name}
      className={styles.selectInput}
    >
      {data.map((d) => (
        <Option key={d.SKU} label={d[itemKey]}>
          <div style={{ marginLeft: '20px' }}>
            <div className={styles.selectTitle}>{d[itemKey]}</div>
            <div className={styles.selectSubTitle}>{d.Name}</div>
          </div>
        </Option>
      ))}
    </Select>
  )
}

export default DebounceSelect
