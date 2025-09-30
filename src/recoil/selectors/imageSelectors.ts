import { selector } from 'recoil'
import { searchState } from '../atoms/searchState'
import { pageState } from '../atoms/pageState'

import axios from 'axios'
const API_URL = 'https://api.unsplash.com/search/photos'
const API_KEY = '9YF28rxXkOi8d42eshG8Lkib4DYLMJdcOY-SbrN_2wY'
const PER_PAGE = 30

export const imageData = selector({
    key: "imageData",
    get: async ({ get }) => {
        const searchValue = get(searchState)
        const pageValue = get(pageState)

        // API 호출
        try{
             const res = await axios.get(API_URL, {
                params: {
                    query: searchValue,
                    client_id: API_KEY,
                    page: pageValue,     // ✅ 수정
                    per_page: PER_PAGE,  // ✅ 유지
                },
            })
            console.log(res);
            return res;
        }catch(error){
            console.log(error);
        }
    }
})