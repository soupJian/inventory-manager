import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Api } from '../../utils/utils'
const { Option } = Select
import styles from './index.module.scss'

const api = new Api()
let timeout
let currentValue

const SearchInput = ({
  name,
  placeholder,
  itemKey,
  selectPart,
  idx,
  selectValue
}) => {
  const user = useSelector((state) => state.user)
  const [data, setData] = useState([])
  const [value, setValue] = useState(selectValue)
  const fetch = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    currentValue = value
    const fake = async () => {
      const res = await api.getInventory(`${name}=${value}`, {
        Authorization: `Bearer ${user.accessToken}`
      })
      if (!res.Items) {
        callback([])
      } else {
        const data = res.Items.map((item) => ({
          selectTitle: item[itemKey],
          ...item
        }))
        callback(data)
      }
    }
    timeout = setTimeout(fake, 300)
  }
  const handleSearch = (newValue) => {
    if (newValue) {
      fetch(newValue, setData)
    } else {
      setData([])
    }
  }
  const handleChange = (newValue) => {
    setValue(newValue)
    const selectItem = data.filter((item) => item.SKU == newValue)[0]
    selectPart(selectItem, idx)
  }
  const options = data.map((d) => (
    <Option key={d.SKU} label={d[itemKey]}>
      <div style={{ marginLeft: '20px' }}>
        <div className={styles.selectTitle}>{d.selectTitle}</div>
        <div className={styles.selectSubTitle}>{d.Name}</div>
      </div>
    </Option>
  ))
  return (
    <Select
      value={value}
      showSearch
      placeholder={placeholder}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      onSelect={handleChange}
      name={name}
      optionLabelProp="label"
      className={styles.selectInput}
    >
      {options}
    </Select>
  )
}
export default SearchInput
