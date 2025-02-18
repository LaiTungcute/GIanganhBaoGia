import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

import styles from './Table.module.scss';
import PaginationTable from '../Pagination/Pagination';
import ModalAddPc from '../Modal/Modal';
import ModalEditProduct from '../ModalEditProcduct/ModalEditProcduct';
import { getFromProductAll } from '../../services/apiService';

const cx = classNames.bind(styles);

const TableProduct = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const urlImage = 'http://localhost:8090/api/product/file';

    const [product, setProduct] = useState([]);

    // tìm kiếm sản phẩm theo tên và danh sách
    const [filter, setFilter] = useState({
        categoryName: '',
        productName: '',
    })

    const [pageSize, setPageSize] = useState(3); // Đặt pageSize động

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    // call api lấy danh sách sản phẩm khi bị thay đổi trang hoặc pageSize
    useEffect(() => {
        fetchProduct();
    }, [currentPage, pageSize]);

    const fetchProduct = async () => {
        try {
            // gọi api
            const res = await getFromProductAll({ product: filter, currentPage, pageSize });
            console.log("🚀 Dữ liệu sản phẩm API trả về:", res);

            if (res) {
                setProduct(res.productResponses);
                setTotalPage(res.totalPage || 1);
                console.log("✅ Updated product state:", res.productResponses);
            } else {
                setProduct([]);
                setTotalPage(1);
            }
        } catch (err) {
            setError('Không thể tải dữ liệu sản phẩm');
            console.error("Lỗi khi tải dữ liệu sản phẩm:", err);
        }
    };

    // xử lý khi thay đổi trang
    const handlePagesChange = (page) => {
        setCurrentPage(page);
    }

    const showModal = () => {
        setOpen(true);
    };

    const showModalEdit = () => {
        setOpenEdit(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            setSuccess(true);
            setError(false);
        }, 3000);
    };

    const handleOkEdit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpenEdit(false);
            setSuccess(true);
            setError(false);
            setTimeout(() => setSuccess(false), 3000); // Ẩn thông báo sau 3 giây
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleCancelEdit = () => {
        setOpenEdit(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('tb-info')}>
                <h2 className={cx('tb-title')}>Bảng sản phẩm</h2>
                <Button onClick={showModal} className={cx('add-pd')} variant="primary">
                    <IoIosAddCircle /> Thêm sản phẩm
                </Button>
            </div>

            <ModalAddPc handleCancel={handleCancel} open={open} handleOk={handleOk} loading={loading} />
            <ModalEditProduct handleCancelEdit={handleCancelEdit} openEdit={openEdit} handleOkEdit={handleOkEdit} loadingEdit={loading} />

            <hr />

            <Table striped bordered hover className={cx('table')}>
                <thead>
                    <tr className={cx('tb-hear')}>
                        <th style={{ width: '2%' }}>STT</th>
                        <th style={{ width: '8%' }}>Mã thiết bị</th>
                        <th style={{ width: '12%' }}>Tên thiết bị</th>
                        <th>Danh mục</th>
                        <th style={{ width: '12%' }}>Mô tả</th>
                        <th style={{ width: '14%' }}>Hình ảnh</th>
                        <th>Xuất xứ</th>
                        <th>Đơn vị</th>
                        <th style={{ width: '7%' }}>Số lượng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {product.length > 0 ? (
                        product.map((product, index) => (
                            <tr key={product.productCode} className={cx('table-flex')}>
                                <td>{index += 1}</td>
                                <td>{product.productCode}</td>
                                <td>{product.productName}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                                <td>
                                    <img src={`${urlImage}/${product.image}`} alt="Anh sản phẩm" width={100} />
                                </td>
                                <td>{product.origin}</td>
                                <td>{product.unit}</td>
                                <td>{product.qty}</td>
                                <td>
                                    <Button className={cx('btn-icon')} variant="warning" onClick={showModalEdit}>
                                        <FaEdit />
                                    </Button>
                                    <Button className={cx('btn-icon')} variant="danger">
                                        <MdDeleteForever />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className='text-center'>Không có sản phẩm nào</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className={cx('pagination')}>
                <PaginationTable
                    currentPage={currentPage}
                    totalPage={totalPage}
                    pageSize={pageSize}
                    onPageChange={handlePagesChange}
                />
            </div>
        </div>
    );
}

export default TableProduct;