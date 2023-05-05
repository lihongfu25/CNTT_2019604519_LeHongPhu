import axios from "axios";
export const BASE_URL = "//localhost:8000/";

const axiosClient = axios.create({
    baseURL: BASE_URL + "api/",
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosClient;
