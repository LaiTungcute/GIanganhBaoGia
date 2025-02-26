import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FormEditQuote.module.scss";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
} from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const cx = classNames.bind(styles);

const FormEditQuote = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [product, setProduct] = useState([]);
    // tìm kiếm sản phẩm theo tên và danh sách
    const [filter, setFilter] = useState({
        categoryName: '',
        productName: '',
    })

    const handleBack = () => {
        navigate('/quote');
    }

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
                setTotalItemProducts(res.totalItems)
            } else {
                setProduct([]);
                setTotalPage(1);
                setTotalItemProducts(0);
            }
        } catch (err) {
            
        }
    };

    const handleSubmit = async (value) => {
        try {
            const formData = new FormData();

            formData.append('quantionName', value.quantionName);
            formData.append('username', value.username);
            formData.append('email', value.email);
            formData.append('phoneNumber', value.phoneNumber);
            formData.append('roles', value.roles);
            formData.append('customerName', value.customerName);
            formData.append('customerUnit', value.customerUnit);
            formData.append('customerAddress', value.customerAddress);
            formData.append('customerEmail', value.customerEmail);
            formData.append('customerPhoneNumber', value.customerPhoneNumber);
            formData.append('totalPrice', value.totalPrice);
            formData.append('status', value.status);
            formData.append('deleted', value.deleted);
            formData.append('quantionItemQty', value.quantionItemQty);
            formData.append('quantionItemLabol', value.quantionItemLabol);
            formData.append('price', value.price);
            formData.append('productName', value.productName);
            formData.append('unit', value.unit);
            formData.append('image', value.image);
        } catch (e) {

        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>Sửa báo giá</h2>
            </div>

            <hr />

            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: '100%',
                }}
            >
                <div className={cx('form')}>
                    <div>
                        <Form.Item label="Tên báo giá" name="quantionName">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Người báo giá" name="username">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>

                        <Form.Item label="SĐT" name="phoneNumber">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Tên sản phẩm" name="productName">
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Giá tiền" name="price">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Đơn vị sản phẩm" name="unit">
                            <Input />
                        </Form.Item>

                        <Form.Item label="File" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                            {/* xem cấu hình lưu file ảnh ở backend */}
                            <Upload
                                action=""
                                listType="picture-card"
                                beforeUpload={() => false} //chặn upload mặc định để upload thủ công
                            >
                                <button
                                    style={{
                                        border: 0,
                                        background: 'none',
                                    }}
                                    type="button"
                                >
                                    <PlusOutlined />
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Upload
                                    </div>
                                </button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="Bộ phận" name="roles">
                            <Input />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item label="Số khách hàng" name="customerPhoneNumber">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Số lượng" name="quantionItemQty">
                            <InputNumber />
                        </Form.Item>

                        <Form.Item label="Trạng thái" name="status">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item label="Xóa" name="deleted">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item label="Địa chỉ" name="customerAddress">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Đơn vị" name="customerUnit">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Khách hàng" name="customerName">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Email khách hàng" name="customerEmail">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Tổng giá tiền">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Tiền nhân công" name="quantionItemLabol">
                            <Input />
                        </Form.Item>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <Form.Item style={{
                        marginRight: '10px',
                    }}>
                        <Button key='back' onClick={handleBack}>
                            Quay lại
                            </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" >
                            <SaveOutlined />
                            Lưu
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default FormEditQuote;