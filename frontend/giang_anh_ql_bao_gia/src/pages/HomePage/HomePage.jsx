import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from './HomePage.module.scss';
import Card from "../../components/Card/Card";
import { TableProduct } from "../../components/Table";

const cx = classNames.bind(styles);

const HomePage = () => {
    const [totalItemProducts, setTotalItemProducts] = useState(0);

    return (
        <div className={cx('wrapper')}>
            <Card totalItemProducts={totalItemProducts} />
            <TableProduct setTotalItemProducts={setTotalItemProducts} />
        </div >
    )
};

export default HomePage;