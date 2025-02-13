import api from "../utils/api";

// xử lý api liên quan đến đăng nhập (login)
export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response;
    } catch (e) {
        throw e;
    }
};