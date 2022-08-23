import React, { useEffect, useState } from 'react'
import ImgWrap from './reposoitory/img-wrap'
import styles from './repository.module.scss'

const DetailRepository = () => {
  const [logoList, setLogoList] = useState([])
  useEffect(() => {
    const list = [
      {
        id: 1,
        name: 'Kevin_logo_1.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/395f8c9a-6f16-4ecc-8f82-0426c04bcdbb-01e4f6f6e426fcff620f9a9a837c2780.jpg'
      },
      {
        id: 2,
        name: 'Kevin_logo_2.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/2c6688c4-dc63-4315-8477-25d9b5887f8d-2830f4bca095de2937191375053f2dfc.jpg'
      },
      {
        id: 3,
        name: 'Kevin_logo_1.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/395f8c9a-6f16-4ecc-8f82-0426c04bcdbb-01e4f6f6e426fcff620f9a9a837c2780.jpg'
      },
      {
        id: 4,
        name: 'Kevin_logo_2.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/2c6688c4-dc63-4315-8477-25d9b5887f8d-2830f4bca095de2937191375053f2dfc.jpg'
      },
      {
        id: 5,
        name: 'Kevin_logo_1.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/395f8c9a-6f16-4ecc-8f82-0426c04bcdbb-01e4f6f6e426fcff620f9a9a837c2780.jpg'
      },
      {
        id: 6,
        name: 'Kevin_logo_2.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/2c6688c4-dc63-4315-8477-25d9b5887f8d-2830f4bca095de2937191375053f2dfc.jpg'
      }
    ]
    setLogoList(list)
  }, [])
  return (
    <div className={styles.repository}>
      <ImgWrap list={logoList} title="LOGOS" />
      <ImgWrap list={logoList} title="MOCKUPS" />
      <ImgWrap list={logoList} title="QUOTES & others" />
    </div>
  )
}

export default DetailRepository
