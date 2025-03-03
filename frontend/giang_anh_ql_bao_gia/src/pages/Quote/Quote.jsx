import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from './Quote.module.scss';
import Card from "../../components/Card/Card";
import { TableQuote } from "../../components/TableQuote";

const cx = classNames.bind(styles);

const Quote = () => {

    return (
        <div className={cx('wrapper')}>
            <TableQuote />
        </div>
    );
};

export default Quote;