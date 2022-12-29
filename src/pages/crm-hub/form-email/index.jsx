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
// main FC----------------
const FormEmail = () => {
  const dispatch = useDispatch()
  // 邮件列表
  const [emailList, setEmailList] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [params, setParams] = useState({
    genre: "",
    search: ""
  })

  const getData = async () => {
    const searchParams = {}
    if (params.genre) {
      searchParams.genre = params.genre
    }
    if (params.search) {
      searchParams.search = params.search
    }
    const res = await getEmailList({
      ...searchParams
    })
    setEmailList(res.Items)
    setSelectedIndex(0)
  }
  const handleSearch = () => {
    dispatch(toggleLoading(true))
    getData()
    dispatch(toggleLoading(false))
  }
  const handleChangeType = (value) => {
    setParams({
      ...params,
      genre: value
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
    getData()
    dispatch(toggleLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.genre])
  return (
    <>
      <Head>
        <title>CRM Hub | Form & email</title>
      </Head>
      <Row className={styles.FormEmail}>
        <Col span={24}>
          <FromEmailHeader
            params={params}
            setParams={setParams}
            handleSearch={handleSearch}
            handleChangeType={handleChangeType}
          />
        </Col>
        <Col span={24} className={styles.FormEmailContent}>
          <Row gutter={16} className={styles.FormEmailContainer}>
            <Col span={12} style={{ height: "100%" }}>
              <FromEmailList
                emailList={emailList}
                selectedIndex={selectedIndex}
                chooseSelectIndex={(index) => chooseSelectIndex(index)}
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
