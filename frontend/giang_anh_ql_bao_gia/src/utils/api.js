import axios from "axios";

const api = axios.create({
    baseURL: '', // URL backend
    headers: {
        'Content-Type': 'application/json',
    }
});

// xử lý lỗi chung
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error.message);
        }
    }
);

export default api;
