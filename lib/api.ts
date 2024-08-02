import axios from 'axios'

const apiUrl = 'http://127.0.0.1:8002'

const api = axios.create({
    baseURL:apiUrl
})

export default api

//https://axios-http.com/docs/interceptors