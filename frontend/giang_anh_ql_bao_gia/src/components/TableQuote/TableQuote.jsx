import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import styles from './TableQuote.module.scss';
import { IoIosAddCircle } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { deleteQuote, getFromQuoteAll, updateApproveQuote } from '../../services/apiService';
import PaginationTable from '../Pagination/Pagination';
import { ProfileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ModalDeleteQuote from '../ModalDeleteQuote/ModalDeleteQuote';
import { notification } from 'antd';
import { formatDate } from '../../utils/dateUtils';

const cx = classNames.bind(styles);

const TableQuote = () => {
    const navigate = useNavigate();
    const [quotes, setQuotes] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [openDelete, setOpenDelete] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Bạn chắc chắn muốn xóa báo giá');
    const [currenQuote, setCurrenQuote] = useState({});


    const [filter, setFilter] = useState({
        categoryName: '',
        productName: '',
    })

    const handleShowAdd = () => {
        navigate('/add-quote');
    }

    // details quote
    const handleDetailQuote = (quote) => {
        navigate(`/details-quote/${quote}`)
    }

    // edit quote
    const handleEditQuote = (quote) => {
        navigate(`/edit-quote/${quote}`);
    }

    // delete quote
    const handleDeleteQuote = (quote) => {
        setCurrenQuote(quote)
        setModalText('Bạn chắc chắn muốn xóa báo giá');
        showModalDelete();
    }

    const showModalDelete = () => {
        setOpenDelete(true);
    };

    const handleCancelDelete = () => {
        setOpenDelete(false);
    };

    const handleOkDelete = async () => {
        try {
            setModalText('Đang xóa báo giá...');
            const res = await deleteQuote(currenQuote);

            await fetchQuote();
            setConfirmLoading(true);
            setTimeout(() => {
                setOpenDelete(false);
                setConfirmLoading(false);
                notification.success({
                    message: 'Xóa báo giá thành công'
                });
                setModalText('Bạn chắc chắn muốn xóa báo giá');
            }, 2000);
            return res;
        } catch (err) {
            notification.error({
                message: 'Xóa báo giá thất bại'
            });
            setModalText('Bạn chắc chắn muốn xóa báo giá');
        }
    };

    useEffect(() => {
        fetchQuote();
    }, [currentPage, pageSize]);

    // call api get all quote
    const fetchQuote = async () => {
        try {
            const res = await getFromQuoteAll({
                quote: filter, currentPage, pageSize
            });

            if (res) {
                setQuotes(res.quantionResponses);
                setTotalPage(res.totalPage || 1);
                // setTotalItemQuotes(res.totalItems);
            } else {
                setQuotes([]);
                setTotalPage(1);
                setTotalItemQuotes(0);
            }
        } catch (err) {
            throw err;
        }
    };

    // hàm sử lý logic admin thì hiển thị phe duyệt
    const renderStatusButton = (quote) => {
        if (quote.status === false) {
            return localStorage.getItem('auth').toLowerCase() === 'admin' ? (
                <Button
                    onClick={() => handleStatus(quote)}
                    style={{ fontSize: 14 }}
                    type="primary"
                >
                    Phê duyệt
                </Button>
            ) : (
                <p style={{
                    color: '#ff0101',
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 0
                }}>Chưa phê duyệt</p>
            )
        } else {
            return (
                <p style={{
                    color: '#22bb33',
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 0
                }}>Đã phê duyệt</p>
            )
        }
    }

    // hàm xử lý khi click vào phê duyệt
    const handleStatus = async (quotes) => {
        if (quotes.id && quotes.status === false) {
            // call api update phê duyệt
            await updateApproveQuote(quotes.id, true);

            // cập nhập state quotes
            setQuotes(preQuote => preQuote.map(
                // kiểm tra id của item hiện tại có trùng với id của quotes không
                item => item.id === quotes.id ? { ...item, status: true } : item
            ))
        }
    }

    // xử lý khi thay đổi trang
    const handlePagesChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('tb-info')}>
                <h2 className={cx('tb-title')}>Bảng báo giá</h2>
                <Button className={cx('add-pd')} variant="primary" onClick={handleShowAdd}>
                    <IoIosAddCircle /> Thêm báo giá
                </Button>
            </div>

            <hr />

            <Table striped bordered hover className={cx('table')}>
                <thead>
                    <tr className={cx('tb-hear')}>
                        <th style={{ width: '2%' }}>STT</th>
                        <th style={{ width: '16%' }}>Tên báo giá</th>
                        <th style={{ width: '11%' }}>Người báo giá</th>
                        <th style={{ width: '14%' }}>Email</th>
                        <th style={{ width: '12%' }}>SĐT</th>
                        <th style={{ width: '10%' }}>Bộ phận</th>
                        <th style={{ width: '11%' }}>Ngày tạo/sửa</th>
                        <th style={{ width: '12%' }}>Trạng thái</th>
                        <th style={{ width: '12%' }}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.length > 0 ? (
                        quotes.map((quote, index) => (
                            <tr key={quote.id} className={cx('table-flex')}>
                                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                <td>{quote.quantionName}</td>
                                <td>{quote.username}</td>
                                <td>{quote.email}</td>
                                <td>{quote.phoneNumber}</td>
                                <td>{quote.roles}</td>
                                <td>
                                    {
                                        formatDate(quote.startDate)
                                    }
                                </td>
                                <td>
                                    {
                                        renderStatusButton(quote)
                                    }
                                </td>

                                <td>
                                    <Button className={cx('btn-icon')} variant="primary" onClick={() => handleDetailQuote(quote.id)}>
                                        <ProfileOutlined />
                                    </Button>

                                    <Button className={cx('btn-icon')} variant="warning" onClick={() => handleEditQuote(quote.id)}>
                                        <FaEdit />
                                    </Button>

                                    <Button className={cx('btn-icon')} variant="danger" onClick={() => handleDeleteQuote(quote.id)}>
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

            <ModalDeleteQuote
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
    )
}

export default TableQuote;