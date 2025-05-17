import axios from "axios";

const http = axios.create({
    //baseURL: 'http://localhost:3500/'
    baseURL: process.env.API_URL
})

export default http