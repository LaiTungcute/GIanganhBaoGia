import React from "react";
import classNames from "classnames/bind";
import styles from './HomePage.module.scss';
import Card from "../../components/CardHome/Card";
import { TableProduct } from "../../components/Table";

const cx = classNames.bind(styles);

const HomePage = () => (
    <div className={cx('wrapper')}>
        <Card />
        <TableProduct />
    </div >
);

export default HomePage;