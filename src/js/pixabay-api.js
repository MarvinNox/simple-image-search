import axios from 'axios';

export const pageLimit = 15;
const GET_URL = 'https://pixabay.com/api/';
const API_KEY = '49472978-10c322c2b56102295a27a1e47';

export async function makeSearch(searchWords, page = 1) {
    return await axios.get(`${GET_URL}`, {
        params: {
            key: API_KEY,
            q: searchWords,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: pageLimit,
            page,
        }
    })
};