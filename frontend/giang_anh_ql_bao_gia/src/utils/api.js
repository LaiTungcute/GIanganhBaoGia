import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL, // URL backend
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
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
