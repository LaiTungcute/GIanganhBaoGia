import api from "../utils/api";
import request from "../configs/request";

// xử lý api liên quan đến đăng nhập (login)
export const loginService = async (email, password) => {
    try {
        const url = request.apiLogin;
        const res = await api.post(url, {
            email,
            password
        });
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getUserName = async () => {
    try {
        const url = request.apiLogin;
        const res = await api.get(url, {
            username
        });
        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
}