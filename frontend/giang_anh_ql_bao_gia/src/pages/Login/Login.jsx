import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm"; // Fix typo in component name

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

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