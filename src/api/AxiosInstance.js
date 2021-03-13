import axios from 'axios'
const baseURL = 'http://127.0.0.1:5000/'

// Creates an axios instance for sending API requests through axios
export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: baseURL,
})
