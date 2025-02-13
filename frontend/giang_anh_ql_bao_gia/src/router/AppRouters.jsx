import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import { useAuth } from "../context/AuthContext";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";

const ProtectedRoute = ({ children }) => { // Sửa đổi từ Children thành children
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRouters = () => {
    return ( // Thêm câu lệnh return
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <DefaultLayout />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default AppRouters;