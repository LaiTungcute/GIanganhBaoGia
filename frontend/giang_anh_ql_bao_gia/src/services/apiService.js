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
        // đường dẫn api hiển thị sản phẩm và phân trang
        const url = `${request.apiFromProduct}?currentPage=${currentPage}&pageSize=${pageSize}&categoryName=${product.categoryName}&productName=${product.productName}`;

        const res = await api.get(url);

        return res;
    } catch (e) {
        throw e;
    }
};

// thêm sản phẩm
export const createProduct = async (product) => {
    try {
        // url = http://localhost:8090/api/product/
        const url = request.apiCreateProduct;

        const res = await api.post(url, product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return res;
    } catch (e) {
        console.log('Lỗi khi tạo sản phẩm: ', e?.response?.data || e.message);
        throw new Error('Không thể tạo sản phẩm');
    }
}

// danh muc
export const category = async () => {
    try {
        const url = request.apiCategory;

        const res = await api.get(url);
        console.log("📌 Dữ liệu từ API:", res);
        return res; // Trả về dữ liệu trực tiếp
    }
    catch (e) {
        throw e
    }
}