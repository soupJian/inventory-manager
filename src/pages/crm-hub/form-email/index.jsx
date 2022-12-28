// react next -------------
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Head from "next/head"
// antd -------------
import { Row, Col } from "antd"
// components ------------
import FromEmailHeader from "@/sections/crm-hub/form-email/form-eamil-header"
import FromEmailList from "@/sections/crm-hub/form-email/form-email-list"
import FromEmailDetail from "@/sections/crm-hub/form-email/form-email-detail"
// js -------
import { getEmailList, getSearchEmail } from "@/service/crm-hub/form-email"
import { toggleLoading } from "@/store/slices/globalSlice"
// css---------
import styles from "./index.module.less"
const limit = 2
// main FC----------------
const FormEmail = () => {
  const dispatch = useDispatch()
  // 邮件列表
  const [emailList, setEmailList] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [general, setGeneral] = useState("")
  const [value, setValue] = useState("")
  const [hasMore, setHasMore] = useState(true)
  const [LastEvaluatedKey, setLastEvaluatedKey] = useState(null)
  const getData = async (params) => {
    const res = await getEmailList({
      ...params
    })
    if (res.LastEvaluatedKey) {
      setLastEvaluatedKey(res.LastEvaluatedKey)
    } else {
      setHasMore(false)
    }
    return res.Items
  }
  const handleChangeType = async (value) => {
    setLastEvaluatedKey(null)
    const res = await getData({
      limit,
      general: value
    })
    setGeneral(value)
    setEmailList(res)
    setSelectedIndex(0)
  }
  const handleSearch = async (value) => {
    setLastEvaluatedKey(null)
    const params = {
      limit,
      search: value
    }
    if (general) {
      params.general = general
    }
    const res = await getData({ ...params })
    setEmailList(res)
    setSelectedIndex(0)
  }
  const loadMoreData = async () => {
    const params = {
      limit
    }
    if (value) {
      params.search = value
    }
    if (general) {
      params.general = general
    }
    if (LastEvaluatedKey) {
      params.LastEvaluatedKey = JSON.stringify(LastEvaluatedKey)
    }
    const res = await getData({ ...params })
    setEmailList(emailList.concat(res))
  }
  const clearSearch = () => {
    getData({ limit, general }).then((res) => {
      setEmailList(res)
    })
  }
  const chooseSelectIndex = (index) => {
    setSelectedIndex(index)
  }
  const handleDeleteEmail = () => {
    console.log(emailList)
  }
  // 获取 邮件列表
  useEffect(() => {
    dispatch(toggleLoading(true))
    getData({ limit, general }).then((res) => {
      setEmailList(res)
      dispatch(toggleLoading(false))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Head>
        <title>CRM Hub | Form & email</title>
      </Head>
      <Row className={styles.FormEmail}>
        <Col span={24}>
          <FromEmailHeader
            general={general}
            handleChangeType={handleChangeType}
            handleSearch={handleSearch}
            clearSearch={clearSearch}
          />
        </Col>
        <Col span={24} className={styles.FormEmailContent}>
          <Row gutter={16} className={styles.FormEmailContainer}>
            <Col span={12} style={{ height: "100%" }}>
              <FromEmailList
                emailList={emailList}
                selectedIndex={selectedIndex}
                chooseSelectIndex={(index) => chooseSelectIndex(index)}
                loadMoreData={loadMoreData}
                hasMore={hasMore}
              />
            </Col>
            <Col span={12} style={{ height: "100%" }}>
              <FromEmailDetail
                email={emailList[selectedIndex]}
                handleDeleteEmail={handleDeleteEmail}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default FormEmail
