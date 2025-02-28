import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from './Header.module.scss';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar } from 'antd';
import { useAuth } from '../../context/AuthContext.jsx';
import { UserOutlined } from '@ant-design/icons';

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
                    <Avatar
                        style={{
                            backgroundColor: '#87d068',
                            marginRight: '6px'
                        }}
                        icon={<UserOutlined />}
                    />

                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <div className={cx('dropdown')}>
                            <Space className={cx('dropdown-name')}>
                                {localStorage.getItem('user')}
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