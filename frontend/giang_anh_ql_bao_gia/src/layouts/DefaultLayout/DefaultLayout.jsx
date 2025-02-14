import classNames from "classnames/bind";
import PropTypes from "prop-types";
import React, { useState } from "react";
const { Header, Sider, Content } = Layout;
import { Footer } from "antd/es/layout/layout";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

import { Head } from "../Header";
import { Foot } from "../Footer";
import styles from './DefaultLayout.module.scss'
import SideBar from "../SideBar/Sidebar";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className={cx('wrapper')}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <SideBar collapsed={collapsed} />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />

                        <Head />
                    </div>
                </Header>

                <Content
                    style={{
                        margin: '16px',
                        padding: 20,
                        // minHeight: 280,
                        // background: colorBgContainer,
                        // borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>

                <Content>
                    <Footer style={{
                        padding: 0,
                    }}>
                        <Foot />
                    </Footer>
                </Content>
            </Layout>
        </Layout>
    );
}

DefaultLayout.prototype = {
    children: PropTypes.node,
}

export default DefaultLayout;