import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://8d55-95-82-100-15.ngrok-free.app',
    headers: {
        'Content-Type': 'application/json',
        // 'Accept': '*',
        // 'Access-Control-Allow-Origin': '*'
        'ngrok-skip-browser-warning': '69420'
    },
})
