import React, { useState, createContext, useContext } from "react";
// Import các hook và hàm cần thiết từ React

// Tạo một context mới để quản lý trạng thái xác thực
const AuthContext = createContext();

// quản lý trạng thái đăng nhập
export const AuthProvider = ({ children }) => {
    // Khởi tạo state để lưu trữ trạng thái đăng nhập, mặc định là false
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('token') ? true : false,
    );

    // Hàm để thay đổi trạng thái đăng nhập thành true
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(
        localStorage.removeItem('token'),
        localStorage.removeItem('user'),
        false
    );

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {/* Cung cấp giá trị của context cho các component con */}
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
// Hook tùy chỉnh để sử dụng context AuthContext