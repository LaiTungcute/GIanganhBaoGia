import axios from "axios";
import api from "../utils/api";
import { request } from "../configs/request";

// xử lý api liên quan đến đăng nhập (login)
export const loginService = async (email, password) => {
    try {
        const response = await api.post('/api/v1/users', { email, password });
        return response;
    } catch (e) {
        throw e;
    }
};