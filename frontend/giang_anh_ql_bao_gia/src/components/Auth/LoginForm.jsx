import PropTypes from "prop-types";
import classNames from "classnames/bind";
import React, { useState, useEffect } from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import styles from "./LoginFrom.module.scss";
import toastr from "toastr";
import { loginService } from "../../services/apiService";
import { InputGroup } from 'react-bootstrap'; // Sửa import
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Image from "../../assest/images/logo.jpg.webp";

const cx = classNames.bind(styles);

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // lưu email và password vào localStorage nếu rememberMe = true
        const savedEmail = localStorage.getItem('email');

        // nếu tồn tại email và password thì set vào state
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email hoặc mật khẩu chưa điền thông tin');
            return;
        }

        try {
            const response = await loginService(email, password);

            if (rememberMe) {
                localStorage.setItem('email', email);
            } else {
                localStorage.removeItem('email');
            }

            onLoginSuccess(response); // Gọi onLoginSuccess khi đăng nhập thành công
            toastr.success('Đăng nhập thành công')
            
        } catch (error) {
            setError('Tên email hoặc mật khẩu không đúng');
        }
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx('with-cart')}>
                <div className="card card-outline card-primary">
                    <div className="card-header" style={{ backgroundColor: '#fff' }}>
                        <a href="#" className="link-dark text-center link-offset-2 link-opacity-100 link-opacity-50-hover text-decoration-none">
                            <h1 className={cx('login')}>
                                <img src={Image} alt="" width={'200px'} />
                            </h1>
                        </a>
                    </div>

                    <div className={cx('card-body login-card-body')} style={{ marginTop: '14px' }}>
                        <form onSubmit={handleSubmit}>
                            <div className={cx('input-group')}>
                                <div className={cx('form-floating')}>
                                    <InputGroup className="mb-3">
                                        <Input id="loginEmail" type="email" value={email} placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <InputGroup.Text><MdEmail className={cx('icon')} /></InputGroup.Text>
                                    </InputGroup>
                                </div>
                            </div>

                            <div className="input-group mb-1">
                                <div className="form-floating">
                                    <InputGroup className="mb-3">
                                        <Input
                                            id="loginPassword"
                                            type="password"
                                            className="form-control"
                                            placeholder="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputGroup.Text>
                                            <FaLock className={cx('icon')} />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </div>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <div className="row">
                                <div className="col-8 d-inline-flex align-items-center">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            id="flexCheckDefault"
                                        />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="d-grid gap-2">
                                        <Button type="submit" className={cx('btn btn-primary customBtn')} >Đăng Nhập</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

LoginForm.propTypes = {
    onLoginSuccess: PropTypes.func
}

export default LoginForm;
