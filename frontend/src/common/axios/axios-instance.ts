import axios from 'axios';
import config from "./requestConfig"

const header = { Pragma: 'no-cache', 'Content-Type': 'application/json' };

export const axiosInstance = axios.create({
    headers: header,
    baseURL: config.BASE_API_URL
})