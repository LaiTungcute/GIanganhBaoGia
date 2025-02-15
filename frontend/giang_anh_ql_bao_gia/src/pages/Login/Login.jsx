import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLoginSuccess = (res) => {
        // lưu token hoặc thông tin người dùng vào loca hoặc state
        localStorage.setItem('toke', res.accessToken);
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