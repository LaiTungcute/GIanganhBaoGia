import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";

const AppRouters = () => {
    return ( // Thêm câu lệnh return
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
}

export default AppRouters;