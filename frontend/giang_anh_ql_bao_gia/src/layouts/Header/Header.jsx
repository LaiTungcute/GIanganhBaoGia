import React from "react";
import classNames from "classnames/bind";
import { FaUserCircle } from "react-icons/fa";

import styles from './Header.module.scss';
import { Menu } from "antd";

const cx = classNames.bind(styles);

const Head = () => {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    <FaUserCircle className={cx('icon-avatar')} />
                    <Menu >
                        <Menu.SubMenu key="avatar" title="Manh Hung">
                            <Menu.Item key="subWatchProfile" >
                                Hồ sơ
                            </Menu.Item>

                            <Menu.Item key="subLogout">
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