import axios from "axios";

const backendurl = "https://shopnest-backend-nmkhf16p0-bugslayer03s-projects.vercel.app";

const api = axios.create({
    baseURL: backendurl
})

export default api;
