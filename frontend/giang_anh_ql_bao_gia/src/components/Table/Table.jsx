import React, { useState } from 'react';
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
import { Alert } from 'antd';

const cx = classNames.bind(styles);

const TableProduct = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

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
            setTimeout(() => setSuccess(false), 3000); // Ẩn thông báo sau 3 giây
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

            {success && <Alert message="Lưu thành công" type="success" showIcon />}
            {error && <Alert message="Lưu thất bại" type="error" showIcon />}

            <hr />

            <Table striped bordered hover className={cx('table')}>
                <thead>
                    <tr className={cx('tb-hear')}>
                        <th style={{ width: '2%' }}>STT</th>
                        <th style={{ width: '12%' }}>Mã thiết bị</th>
                        <th>Tên thiết bị</th>
                        <th>Hình ảnh</th>
                        <th>Xuất xứ</th>
                        <th>Đơn vị</th>
                        <th style={{ width: '10%' }}>Số lượng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={cx('table-flex')}>
                        <td>1</td>
                        <td>C001</td>
                        <td>Mark</td>
                        <td>
                            Hình ảnh
                        </td>
                        <td>Xuất xứ
                        </td>
                        <td>Chiec</td>
                        <td>2</td>
                        <td>
                            <Button className={cx('btn-icon')} variant="warning" onClick={showModalEdit}>
                                <FaEdit />
                            </Button>
                            <Button className={cx('btn-icon')} variant="danger">
                                <MdDeleteForever />
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <div className={cx('pagination')}>
                <PaginationTable />
            </div>
        </div>
    );
}

export default TableProduct;