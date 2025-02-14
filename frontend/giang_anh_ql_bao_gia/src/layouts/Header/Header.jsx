import React from "react";
import classNames from "classnames/bind";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from './Header.module.scss';
import { Menu } from "antd";
import { useAuth } from '../../context/AuthContext.jsx';

const cx = classNames.bind(styles);

const Head = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogOut = () => {
        logout();
        navigate('/login');
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    <FaUserCircle className={cx('icon-avatar')} />
                    <Menu>
                        <Menu.SubMenu key="avatar" title="Manh Hung">
                            <Menu.Item key="subWatchProfile" onClick={handleProfileClick}>
                                Hồ sơ
                            </Menu.Item>
                            <Menu.Item key="subLogout" onClick={handleLogOut}>
                                Đăng xuất
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Head;