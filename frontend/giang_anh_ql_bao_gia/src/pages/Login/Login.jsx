import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";

const Login = () => {
    const { login, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLoginSuccess = (res) => {
        // lưu token hoặc thông tin người dùng vào loca hoặc state
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('user', res.user.username);
        console.log(res.user);
        
        localStorage.setItem('auth', res.user.auth);
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