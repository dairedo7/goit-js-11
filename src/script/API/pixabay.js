import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const KEY = "24546244-2fe39103bf24816f7c49d8399";

export async function fetchPictures(name, page, perPage) {
    const params = new URLSearchParams({
        key: KEY,
        per_Page: perPage,
        page: page,
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    })
    try {
        const response = await axios.get(`?${params}`);
        console.log(response);
        return response.data;
    } catch (error) {
        Notify.failure("SERVER ERROR!")
    }
}