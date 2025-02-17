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

// lấy ra tất cả thiết bị
export const getFromProductAll = async ({ product, currentPage, pageSize }) => {
    try {
        const url = `${request.apiFromProduct}?currentPage=${currentPage}&pageSize=${pageSize}&categoryName=${product.categoryName}&productName=${product.productName}`;

        const res = await api.get(url);

        return res;
    } catch (e) {
        console.error(e);
        throw e;
    }
};