import React,{useEffect, useState} from 'react'
import {useRouter} from 'next/router'

const DealDetail = () => {
  const router = useRouter()
  const [ids,setIds] = useState([])
  useEffect(()=>{
    const dealIds = localStorage.getItem('dealIds')
    console.log(dealIds);
    console.log(dealIds);

    // 如果本地没有 ids 路由回到 deals列表页面
    if(!dealIds){
      router.replace('/crm-hub/deals')
    }
    // 如果有的话一定是一个数组
    setIds(JSON.parse(dealIds))
    // 页面退出， 清除本地的 dealIds
    return ()=>localStorage.removeItem('dealIds')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div>DealDetail</div>
  )
}

export default DealDetail