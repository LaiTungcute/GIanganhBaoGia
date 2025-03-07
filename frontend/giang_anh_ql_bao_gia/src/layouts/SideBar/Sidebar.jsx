import React from "react";
import classNames from "classnames/bind";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
    AppstoreAddOutlined,
    AreaChartOutlined,
    CalendarOutlined,
    CodeSandboxOutlined,
    ContactsOutlined,
    FileDoneOutlined,
    HomeOutlined,
    PieChartOutlined,
    SnippetsOutlined
} from "@ant-design/icons";

import styles from './Sidebar.module.scss';
import Logo from '../../assest/images/logo-removebg-preview.png';
import { IoIosAddCircle } from "react-icons/io";

const cx = classNames.bind(styles);
const SideBar = ({ collapsed }) => { // Nhận prop collapsed
    const navigate = useNavigate();

    const handleHomePage = () => {
        navigate('/');
    }

    const handleQuote = () => {
        navigate('/quote');
    }

    const handleTask = () => {
        navigate('/task');
    }

    const handleCreateQuote = () => {
        navigate('/add-quote')
    }

    return (
        <aside className={cx('wrapper')}>
            <div onClick={handleHomePage} className={cx('logo', { collapsed })}>
                <img className={cx('img-logo')} src={Logo} alt="" />
            </div>

            <Menu theme="dark" mode="inline">
                <Menu.Item onClick={handleHomePage} key="home" icon={<HomeOutlined />}>
                    Trang chủ
                </Menu.Item>

                <Menu.SubMenu key="product" icon={<CodeSandboxOutlined />} title="Sản phẩm">
                    <Menu.Item onClick={handleHomePage} key="subWatchProduct" icon={<SnippetsOutlined />}>
                        Xem sản phẩm
                    </Menu.Item>
                </Menu.SubMenu>

                <Menu.SubMenu key="Quote" icon={<FileDoneOutlined />} title="Báo giá">
                    <Menu.Item onClick={handleQuote} key="subWatchQuote" icon={<SnippetsOutlined />}>
                        Xem Báo giá
                    </Menu.Item>

                    <Menu.Item onClick={handleCreateQuote} key="subWCreateQuote" icon={<IoIosAddCircle />}>
                        Tạo Báo giá
                    </Menu.Item>
                </Menu.SubMenu>

                <Menu.Item onClick={handleTask} key="task" icon={<CalendarOutlined />}>
                    Công việc
                </Menu.Item>

                <Menu.SubMenu key="Chart" icon={<AreaChartOutlined />} title="Biểu đồ">
                    <Menu.Item key="subWatchChart" icon={<PieChartOutlined />}>
                        Xem biểu đồ
                    </Menu.Item>
                </Menu.SubMenu>

                <Menu.Item onClick={handleHomePage} key="about" icon={<ContactsOutlined />}>
                    Giới thiệu
                </Menu.Item>
            </Menu>
        </aside>
    );
}

export default SideBar;