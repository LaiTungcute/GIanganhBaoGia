import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from './HomePage.module.scss';
import Card from "../../components/Card/Card";
import { TableProduct } from "../../components/Table";
import { getFromProductAll, getFromQuoteAll } from "../../services/apiService";
import { notification } from "antd";

const cx = classNames.bind(styles);

const HomePage = () => {
    const [totalItemProducts, setTotalItemProducts] = useState(0);
    const [totalItemQuotes, setTotalItemQuotes] = useState(0);

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                // goi api lay tong so san pham
                const productRes = await getFromProductAll({ product: {}, currentPage: 1, pageSize: 5 });
                setTotalItemProducts(productRes.totalItems || 0);

                const quoteRes = await getFromQuoteAll({ quote: {}, currentPage: 1, pageSize: 5 });
                setTotalItemQuotes(quoteRes.totalItems || 0);   
            }
            catch (err) {
                notification.error({
                    message: 'Lỗi không thể tải tổng số sản phẩm và báo giá',
                })
            }
        }

        fetchTotal();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Card totalItemProducts={totalItemProducts} totalItemQuotes={totalItemQuotes} />
            <TableProduct setTotalItemProducts={setTotalItemProducts} />
        </div >
    )
};

export default HomePage;