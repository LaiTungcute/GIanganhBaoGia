import React from "react";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import Login from "../pages/Login/Login";
import { useAuth } from "../context/AuthContext";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Profile from "../pages/Profile/Profile";
import Product from "../pages/Product/Product";
import Quote from "../pages/Quote/Quote";
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

                {
                    private_routers.map((route, index) => {
                        const Page = route.component;

                        return <Route key={index} path={route.path} element={
                            <ProtectedRoute>
                                <Page />
                            </ProtectedRoute>
                        } />
                    })
                }
            </Routes>
        </div>
    );
}

export default AppRouters;