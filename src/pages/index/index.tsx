import CommonHeader from '@/components/common/header/CommonHeader'
import CommonSearchBar from '@/components/common/searchBar/CommonSearchBar'
import styles from './styles/index.module.scss'
import CommonNav from '@/components/common/navigation/CommonNav'
import CommonFooter from '@/components/common/footer/CommonFooter'
import Card from './components/Card'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CardDTO } from './types/card'

function IndexPage() {
    const [imgUrls, setImgUrls] = useState([])

    const getData = async () => {
        // 오픈 API 호출
        const API_URL = 'https://api.unsplash.com/search/photos'
        // 👉 Vite 기준: .env에 VITE_UNSPLASH_ACCESS_KEY=... 로 넣고 import.meta.env로 읽기 권장
        const API_KEY = '9YF28rxXkOi8d42eshG8Lkib4DYLMJdcOY-SbrN_2wY'
        const PER_PAGE = 30

        const searchValue = 'Korea'
        const pageValue = 100

        try {
            const res = await axios.get(API_URL, {
                params: {
                    query: searchValue,
                    client_id: API_KEY,
                    page: pageValue,     // ✅ 수정
                    per_page: PER_PAGE,  // ✅ 유지
                },
            })
            console.log(res.data)
            // res.data.results라는 배열을 활용할 예정

            if(res.status === 200){
                setImgUrls(res.data.results);
            }

        } catch (error) {
            console.error(error)
        }
    }

    const cardList = imgUrls.map((card: CardDTO) => {
        return <Card data={card} key={card.id} />
        
    })

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.page}>
            {/* 공통 헤더 */}
            <CommonHeader />
            {/* 공통 네비게이션 */}
            <CommonNav />
            <div className={styles.page__contents}>
                <div className={styles.page__contents__introBox}>
                    <div className={styles.wrapper}>
                        <span className={styles.wrapper__title}>PhotoSplash</span>
                        <span className={styles.wrapper__desc}>
                            인터넷의 시각 자료 출처입니다. <br />
                            모든 지역에 있는 크리에이터들의 지원을 받습니다.
                        </span>
                        {/* 검색상 UI */}
                        <CommonSearchBar />
                    </div>
                </div>
                <div className={styles.page__contents__imageBox}>{cardList}</div>
            </div>
            {/* 공통 푸터 */}
            <CommonFooter />
        </div>
    )
}

export default IndexPage
