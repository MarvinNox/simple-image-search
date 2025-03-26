import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from 'axios';

export async function makeSearch(searchWords) {
    return axios.get(`https://pixabay.com/api/`, {
        params: {
            key: '49472978-10c322c2b56102295a27a1e47',
            q: searchWords,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 21,
        }
    })
};