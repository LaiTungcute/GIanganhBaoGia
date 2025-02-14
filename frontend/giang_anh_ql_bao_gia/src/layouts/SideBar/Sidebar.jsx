import React from "react";
import classNames from "classnames/bind";
import { Menu } from "antd";
import {
    AppstoreAddOutlined,
    CodeSandboxOutlined,
    FileDoneOutlined,
    HomeOutlined,
    SnippetsOutlined
} from "@ant-design/icons";

import styles from './Sidebar.module.scss';
import Logo from '../../assest/images/logo-removebg-preview.png';

const cx = classNames.bind(styles);
const SideBar = ({ collapsed }) => { // Nhận prop collapsed

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('logo', { collapsed })}>
                <a href="/">
                    <img className={cx('img-logo')} src={Logo} alt="" />
                </a>
            </div>

            <Menu theme="dark" mode="inline">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    Trang chủ
                </Menu.Item>

                <Menu.SubMenu key="product" icon={<CodeSandboxOutlined />} title="Sản phẩm">
                    <Menu.Item key="subWatchProduct" icon={<SnippetsOutlined />}>
                        Xem sản phẩm
                    </Menu.Item>
                </Menu.SubMenu>

                <Menu.SubMenu key="Quote" icon={<FileDoneOutlined />} title="Báo giá">
                    <Menu.Item key="subWatchQuote" icon={<SnippetsOutlined />}>
                        Xem Báo giá
                    </Menu.Item>

                    <Menu.Item key="subAddQuote" icon={<AppstoreAddOutlined />}>
                        Thêm Báo giá
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </aside>
    );
}

export default SideBar;