import axios from "axios";

const api = axios.create ({
    baseURL: import.meta.env.VITE_APP_BASEURL || "http://localhost:3000/api",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
    }
})

export default api;