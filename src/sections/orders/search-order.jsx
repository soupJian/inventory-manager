import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
// components
import { Flex, Icon, Text, Wrapper } from "@/components/commons"
import CurrentOrderContainer from "./components/current-order-table"
// api
import { searchOrder } from "@/service/orders"
// js
import { toggleLoading } from "@/store/slices/globalSlice"
// css

// main
const SearchPage = ({ router }) => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState(router.query.search || "")
  const [data, setData] = useState([])

  const getData = useCallback(() => {
    dispatch(toggleLoading(true))
    searchOrder(search, "currentOrders")
      .then((data) => {
        setData(data.Items)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch(toggleLoading(false))
      })
  }, [dispatch, search])

  useEffect(() => {
    setSearch(router.query.search)
  }, [router.query.search])

  useEffect(() => {
    if (search) {
      getData()
    }
  }, [dispatch, getData, router, router.query.search, search])
  return (
    <Wrapper
      styles={{
        "min-height": "100%",
        position: "relative",
        display: "flex",
        "flex-direction": "column",
        "align-items": "stretch"
      }}
      height="auto"
      padding="21px 29px"
    >
      <Flex
        styles={{ flex: "0 0 auto" }}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Icon
          onClick={() => router.back()}
          styles={{ cursor: "pointer", "margin-right": "41px" }}
          name="chevron"
          height="22px"
          width="14px"
        />
        <Flex
          styles={{ lineHeight: "1" }}
          gap="16px"
          direction="column"
          alignItems="flex-start"
        >
          <Text as="h1" weight="500" size="24px">
            Search for {`"${search}"`}
          </Text>
          <Text as="p" weight="400" size="18px">
            Showing {data.length || 0} results
          </Text>
        </Flex>
      </Flex>
      <Wrapper
        styles={{ position: "relative", flex: "1 0 auto" }}
        padding="23px 0px 0px"
      >
        <CurrentOrderContainer orderData={data} getData={getData} />
      </Wrapper>
    </Wrapper>
  )
}

export default SearchPage
