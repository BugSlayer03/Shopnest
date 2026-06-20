import axios from "axios";

const backendurl = "https://shopnest-backend-six.vercel.app";

const api = axios.create({
    baseURL: backendurl
})

export default api;
