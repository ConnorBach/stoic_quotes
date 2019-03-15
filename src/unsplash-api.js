import Unsplash from 'unsplash-js';

export const API_KEY = process.env.REACT_APP_UNSPLASH_APPLICATION_ID
export const API_SECRET = process.env.REACT_APP_UNSPLASH_SECRET
export const unsplash_api = "https://api.unsplash.com/"

const unsplash = new Unsplash({
    applicationId: API_KEY,
    secret: API_SECRET
})

export const test_key = () => {
    console.log(API_KEY, API_SECRET)
}

export default {unsplash, API_KEY, API_SECRET, unsplash_api} 