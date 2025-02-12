import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm"; // Fix typo in component name

const Login = () => {
    const navigate = useNavigate();

    // ham sử lý đăng nhập
    const handleLoginSuccess = () => {
        navigate("/");
    }

    return (
        <div>
            <LoginForm onLoginSuccess={handleLoginSuccess} /> {/* Fix typo in component name */}
        </div>
    );
};

export default Login;