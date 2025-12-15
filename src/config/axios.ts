import axios from "axios";

const httpAxios = axios.create({
    baseURL: "/api",
    withCredentials: true
})

export { httpAxios }