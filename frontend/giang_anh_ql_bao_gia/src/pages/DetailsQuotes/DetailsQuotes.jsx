import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from './DetailsQuotes.module.scss';
import { Button, message } from 'antd';
import { FilePdfOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailQuote, renderPdf } from "../../services/apiService";

const cx = classNames.bind(styles);

const DetailsQuotes = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [detailQuote, setDetailQuote] = useState({});

    useEffect(() => {
        fetchDetailQUote();
        // fetchPdf();
    }, [id]);

    // call api chi tiết
    const fetchDetailQUote = async () => {
        try {
            const res = await getDetailQuote(id);

            setDetailQuote(res || {});
        } catch (err) {
            message.error('Không thể tải danh sách chi tiết báo giá');
        }
    }

    // call api pdf
    const fetchPdf = async () => {
        try {
            const pdfBlog = await renderPdf(id);

            // tao url cho Blob
            const url = window.URL.createObjectURL(new Blob([pdfBlog], {
                type: 'application/pdf'
            }));

            // tạo một phần tử liên kết tạm thời để kích hoạt tải xuống.
            const link = document.createElement('a');
            link.href = url;

            // lưu tiên name khi download file pdf
            link.setAttribute('download', 'Báo_giá.pdf');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            message.success('Tải file PDF thành công');
        } catch (err) {
            message.error('Không thể tải file PDF');
        }
    }

    // Format tiền tệ
    const formatCurrency = (value) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1>Chi tiết báo giá: <span style={{ color: '#3eaf0e', fontSize: 22 }}>{detailQuote.quantionName}</span></h1>
            </div>

            <div className={cx("content")}>
                {/* Thông tin khách hàng */}
                <div className={cx("section")}>
                    <h2>Thông tin khách hàng</h2>
                    <div className={cx("info-grid")}>
                        <div className={cx("info-item")}>
                            <span className={cx("label")}>Tên khách hàng:</span>
                            <span>{detailQuote.customerName}</span>
                        </div>
                        <div className={cx("info-item")}>
                            <span className={cx("label")}>Đơn vị:</span>
                            <span>{detailQuote.customerUnit}</span>
                        </div>
                        <div className={cx("info-item")}>
                            <span className={cx("label")}>Địa chỉ:</span>
                            <span>{detailQuote.customerAddress}</span>
                        </div>
                        <div className={cx("info-item")}>
                            <span className={cx("label")}>Email:</span>
                            <span>{detailQuote.customerEmail}</span>
                        </div>
                        <div className={cx("info-item")}>
                            <span className={cx("label")}>Số điện thoại:</span>
                            <span>{detailQuote.customerPhoneNumber}</span>
                        </div>
                    </div>
                </div>

                {/* Thông tin người tạo */}
                <div className={cx("section")}>
                    <h2>Thông tin người tạo</h2>
                    <div className={cx("info-grid")}>
                        <div className={cx("info-item")}>
                            <span className={cx("label")}>Tên người dùng:</span>
                            <span>{detailQuote.username}</span>
                        </div>
                        <div className={cx("info-item")}>
                            <span className={cx("label")}>Email:</span>
                            <span>{detailQuote.email}</span>
                        </div>
                        <div className={cx("info-item")}>
                            <span className={cx("label")}>Số điện thoại:</span>
                            <span>{detailQuote.phoneNumber}</span>
                        </div>
                        <div className={cx("info-item")}>
                            <span className={cx("label")}>Bộ phận:</span>
                            <span>{detailQuote.roles}</span>
                        </div>
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className={cx("section")}>
                    <h2>Danh sách sản phẩm</h2>
                    <table className={cx("product-table")}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Đơn vị</th>
                                <th>Số lượng</th>
                                <th>Nhân công</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                detailQuote.quantionItemResponses && detailQuote.quantionItemResponses.length > 0 ? (
                                    detailQuote.quantionItemResponses.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.unit}</td>
                                            <td>{item.quantionItemQty}</td>
                                            <td>{item.quantionItemLabol}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className='text-center'>Không có sản phẩm nào</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                {/* Tổng tiền */}
                <div className={cx("total-section")}>
                    <span className={cx("total-label")}>Tổng tiền:</span>
                    <span className={cx("total-price")}>
                        {formatCurrency(detailQuote.totalPrice)}
                    </span>
                </div>
            </div>

            <div className={cx('footer-btn')}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/quote')}
                    className={cx('back-btn')}
                >
                    Quay lại
                </Button>

                {
                    detailQuote.status === true ? (
                        <Button
                            type="primary"
                            icon={<FilePdfOutlined />}
                            className={cx('pdf-btn')}
                            onClick={fetchPdf}
                        >
                            Xuất PDF
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            icon={<FilePdfOutlined />}
                            disabled
                            className={cx('disabled-btn')}
                        >
                            Chưa được phê duyệt
                        </Button>
                    )
                }
            </div>
        </div>
    );
};

export default DetailsQuotes;