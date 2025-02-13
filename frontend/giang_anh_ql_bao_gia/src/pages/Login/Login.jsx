import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm"; // Fix typo in component name

const Login = () => {
    // gọi hàm login đã tạo ở file context/AuthContext.jsx
    const { login } = useAuth();
    const navigate = useNavigate();

    // hàm xử lý đăng nhập
    const handleLoginSuccess = () => {
        login();
        navigate("/");
    }

    return (
        <div>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
};

export default Login;