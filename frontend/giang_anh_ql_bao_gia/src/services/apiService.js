import api from "../utils/api";
import request from "../configs/request";
// Product
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
        throw e;
    }
};

// lấy ra tất cả thiết bị
export const getFromProductAll = async ({ product, currentPage, pageSize }) => {
    try {
        // đường dẫn api hiển thị sản phẩm và phân trang
        const url = `${request.apiFromProduct}?currentPage=${currentPage}&pageSize=${pageSize}&productName=${product.productName}`;

        const res = await api.get(url);

        return res;
    } catch (e) {
        throw e;
    }
};

// Lấy tất cả product thành 1 list không phân trang
export const getAllProduct = async () => {
    try {
        // đường dẫn api hiển thị sản phẩm
        const url = `${request.apiAllProduct}`;

        const res = await api.get(url);

        return res;
    } catch (e) {
        throw e;
    }
};

// thêm sản phẩm
export const createProduct = async (product) => {
    try {
        const url = request.apiCreateProduct;

        const res = await api.post(url, product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return res;
    } catch (e) {
        throw new Error('Không thể tạo sản phẩm');
    }
}

export const getIdProduct = async (product) => {
    try {
        const res = await api.get(`${request.apiIdProduct}/${product.productId}`);

        return res;
    } catch (e) {
        throw new Error('Không thể lay ID sản phẩm');
    }
}

// edit
export const apiEditingProduct = async (product, formData) => {
    try {
        const res = await api.put(`${request.apiEditingProduct}/${product.productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return res;
    } catch (e) {
        throw new Error('Không thể sua sản phẩm');
    }
}

// delete product
export const deleteProduct = async (product) => {
    try {
        const res = await api.delete(`${request.apiDeleteProduct}/${product.productId}`);

        return res;
    } catch (e) {
        throw new Error('Không thể sua sản phẩm');
    }
}

/**
 * Báo giá
 * **/
export const getFromQuoteAll = async ({ quote, currentPage, pageSize }) => {
    try {
        const url = `${request.apiFromQuote}?currentPage=${currentPage}&pageSize=${pageSize}&categoryName=${quote.categoryName}&productName=${quote.productName}`

        const res = await api.get(url);

        return res;
    } catch (e) {
        throw e;
    }
}

// create quote
export const createQuote = async (quote) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Không có token');
        }

        const url = request.apiCreateQuote;
        const res = await api.post(url, quote);
        console.log('Create quote response:', res);
        return res;
    } catch (e) {
        throw e;
    }
}

export const getQuoteId = async (quoteId) => {
    try {
        const res = await api.get(`${request.apiEditingQuote}/${quoteId}`);

        return res;
    } catch (e) {
        throw e
    }
}
// sửa báo giá
export const editingQuote = async (quoteId, formData) => {
    try {
        const res = await api.put(`${request.apiEditingQuote}/${quoteId}`, formData);        

        return res; // Trả về dữ liệu từ response
    } catch (err) {
        throw new Error(err.response?.data?.message || 'Không thể sửa báo giá'); // Xử lý lỗi từ backend
    }
};

// sửa báo giá item
export const editingQuoteItem = async (quoteItemId, formData) => {
    try {
        const url = `${request.apiQuoteItem}/${quoteItemId.id}`;

        const res = await api.put(url, formData);

        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || 'Không thể sửa báo giá'); // Xử lý lỗi từ backend
    }
}

export const deleteQuote = async (quoteId) => {
    try {
        const url = `${request.apiDeleteQuote}/${quoteId}`;

        const res = await api.delete(url);

        return res;
    } catch (err) {
        throw new Error(err.response?.data?.message || 'Không thể sửa báo giá'); // Xử lý lỗi từ backend
    }
}

// phê duyệt báo giá
export const updateApproveQuote = async (quoteId) => {
    try {
        const url = `${request.apiApprove}/${quoteId}`;

        const res = await api.put(url);

        return res;
    } catch (err) {
        throw new Error(err.response?.data?.message || 'Không thể sửa báo giá'); // Xử lý lỗi từ backend
    }
}

// Chi tiết báo giá thiết bị
export const getDetailQuote = async (quoteId) => {
    try {
        const url = `${request.apiDetailQuotes}/${quoteId}`;

        const res = await api.get(url);

        return res;
    } catch (e) {
        throw new Error(err.response?.data?.message || 'Không thể xem chi tiết báo giá'); // Xử lý lỗi từ backend
    }
}

// chức năng download pdf
export const renderPdf = async (quoteId) => {
    try {
        const url = `${request.apiDownloadPdf}/${quoteId}`;

        const res = await api.get(url, {
            responseType: 'blob'
        });

        return res;
    } catch (e) {
        throw new Error(err.response?.data?.message || 'Không thể tải file pdf'); // Xử lý lỗi từ backend
    }
}