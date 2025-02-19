import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import toastr from "toastr";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import styles from './Table.module.scss';
import PaginationTable from '../Pagination/Pagination';
import ModalAddPc from '../Modal/Modal';
import ModalEditProduct from '../ModalEditProcduct/ModalEditProcduct';
import { deleteProduct, getFromProductAll } from '../../services/apiService';
import ModalDeleteProduct from '../ModalDeleteProduct/ModalDeleteProduct';

const cx = classNames.bind(styles);

const TableProduct = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Bạn chắc chắn muốn xóa sản phẩm');

    const urlImage = 'http://localhost:8090/api/product/file';

    const [product, setProduct] = useState([]);

    // tìm kiếm sản phẩm theo tên và danh sách
    const [filter, setFilter] = useState({
        categoryName: '',
        productName: '',
    })

    const [pageSize, setPageSize] = useState(5); // Đặt pageSize động
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [currentProduct, setCurrentProduct] = useState({});

    // call api lấy danh sách sản phẩm khi bị thay đổi trang hoặc pageSize
    useEffect(() => {
        fetchProduct();
    }, [currentPage, pageSize]);

    const fetchProduct = async () => {
        try {
            // gọi api
            const res = await getFromProductAll({ product: filter, currentPage, pageSize });

            if (res) {
                setProduct(res.productResponses);
                setTotalPage(res.totalPage || 1);
            } else {
                setProduct([]);
                setTotalPage(1);
            }
        } catch (err) {
            setError('Không thể tải dữ liệu sản phẩm');
        }
    };

    // edit product
    const onEditProduct = async (product) => {
        setCurrentProduct(product);
        showModalEdit();
    }

    // delete product
    const onDeleteProduct = async (product) => {
        setCurrentProduct(product);
        setModalText('Bạn chắc chắn muốn xóa sản phẩm');
        showModalDelete();
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
        setLoading(false);
        setOpen(false);
    };

    const handleOkEdit = () => {
        setOpenEdit(false);
        setSuccess(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleCancelEdit = () => {
        setOpenEdit(false);
    };

    const showModalDelete = () => {
        setOpenDelete(true);
    };

    const handleOkDelete = async () => {
        try {
            setModalText('Đang xóa sản phẩm...');
            const res = await deleteProduct(currentProduct);

            await fetchProduct();
            setConfirmLoading(true);
            setTimeout(() => {
                setOpenDelete(false);
                setConfirmLoading(false);
                toastr.success('Xóa sản phẩm thành công');
                setModalText('Bạn chắc chắn muốn xóa sản');
            }, 2000);
            return res;
        } catch (err) {
            toastr.error('Xóa sản phẩm thất bại');
            setModalText('Bạn chắc chắn muốn xóa sản');
        }
    };

    const handleCancelDelete = () => {
        setOpenDelete(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('tb-info')}>
                <h2 className={cx('tb-title')}>Bảng sản phẩm</h2>
                <Button onClick={showModal} className={cx('add-pd')} variant="primary">
                    <IoIosAddCircle /> Thêm sản phẩm
                </Button>
            </div>

            <ModalAddPc handleCancel={handleCancel} open={open} handleOk={handleOk} loading={loading} fetchProduct={fetchProduct} />
            <ModalEditProduct handleCancelEdit={handleCancelEdit} openEdit={openEdit} handleOkEdit={handleOkEdit} loadingEdit={loading} currentProduct={currentProduct} fetchProduct={fetchProduct} />

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
                                    <Button className={cx('btn-icon')} variant="warning" onClick={() => onEditProduct(product)}>
                                        <FaEdit />
                                    </Button>

                                    <Button className={cx('btn-icon')} variant="danger" onClick={() => onDeleteProduct(product)}>
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

            <ModalDeleteProduct
                openDelete={openDelete}
                handleCancelDelete={handleCancelDelete}
                handleOkDelete={handleOkDelete}
                confirmLoading={confirmLoading}
                modalText={modalText}
            />

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