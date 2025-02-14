import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import { useAuth } from "../context/AuthContext";
import { private_routers } from "./index";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRouters = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* cấu hình route nội bộ chỉ khi đăng nhập mới vào đc trang */}
                {
                    private_routers.map((route, index) => {
                        const Page = route.component;

                        const Layout = route.layout || React.Fragment;

                        return (
                            <Route key={index} path={route.path} element={
                                <ProtectedRoute>
                                    {/* Layout sẽ bọc các thành phần trang Page */}
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </ProtectedRoute>
                            } />
                        );
                    })
                }
            </Routes>
        </div>
    );
}

export default AppRouters;