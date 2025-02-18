import React from 'react';
import { Pagination } from 'antd';

const PaginationTable = ({ currentPage, totalPage, pageSize, onPageChange }) => {
    return (
        <Pagination
            current={currentPage}
            total={totalPage * pageSize} // antd mặc định `total` là tổng số items
            pageSize={pageSize} // pageSize động
            onChange={onPageChange} // Gọi callback khi đổi trang
        />
    );
}

export default PaginationTable;