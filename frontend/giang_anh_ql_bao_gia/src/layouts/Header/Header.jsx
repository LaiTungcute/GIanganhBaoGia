import React from "react";
import classNames from "classnames/bind";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from './Header.module.scss';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
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

    const items = [
        {
            key: '1',
            label: 'Hồ sơ',
            onClick: handleProfileClick,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Đăng xuất',
            event: 'click',
            onClick: handleLogOut,
        },
        {
            type: 'divider',
        },
        {
            key: '3',
            label: 'Settings',
            icon: <SettingOutlined />,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    <FaUserCircle className={cx('icon-avatar')} />

                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <div className={cx('dropdown')}>
                            <Space className={cx('dropdown-name')}>
                                Manh Hung
                                <DownOutlined className={cx('icon-down')} />
                            </Space>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}

export default Head;