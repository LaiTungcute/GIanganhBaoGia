import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from './Quote.module.scss';
import Card from "../../components/Card/Card";
import { TableQuote } from "../../components/TableQuote";

const cx = classNames.bind(styles);

const Quote = () => {
    const [totalItemProducts, setTotalItemProducts] = useState(0);

    return (
        <div className={cx('wrapper')}>
            <Card totalItemProducts={totalItemProducts} />
            <TableQuote setTotalItemProducts={setTotalItemProducts} />
        </div>
    );
}

export default Quote;
