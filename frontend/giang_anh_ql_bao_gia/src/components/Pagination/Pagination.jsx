import React from 'react';
import { Pagination } from 'antd';

const PaginationTable = () => {
    return (
        <Pagination defaultCurrent={1} total={50} />
    );
}

export default PaginationTable;