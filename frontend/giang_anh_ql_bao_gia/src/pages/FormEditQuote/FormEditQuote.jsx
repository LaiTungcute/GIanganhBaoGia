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
import { createQuote, getFromProductAll } from "../../services/apiService";

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
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        pageSize: 5,
        currentPage: 1,
        totalPage: 1,
        totalItems: 0
    });
    // tìm kiếm sản phẩm theo tên và danh sách
    const [filter, setFilter] = useState({
        categoryName: '',
        productName: '',
    })

    const handleBack = () => {
        navigate('/quote');
    }

    // Load danh sách sản phẩm
    useEffect(() => {
        fetchProduct();
    }, [pagination.currentPage, pagination.pageSize, filter]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await getFromProductAll({
                product: filter,
                currentPage: pagination.currentPage,
                pageSize: pagination.pageSize
            })

            if (res && res.productResponses) {
                setProducts(res.productResponses);
                setPagination({
                    ...pagination,
                    totalPage: res.totalPage || 1,
                    totalItems: res.totalItems
                });
            } else {
                setProducts([]);
                setPagination(pre => ({
                    ...pre,
                    totalItems: 0,
                    totalPage: 1
                }))
            }
        } catch (err) {
            message.error('Không thể tải danh sách sản phẩm');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSubmit = async (value) => {
        try {
            setLoading(true);
            const formData = new FormData();

            // formData.append('quantionName', value.quantionName);
            // formData.append('username', value.username);
            // formData.append('email', value.email);
            // formData.append('phoneNumber', value.phoneNumber);
            // formData.append('roles', value.roles);
            // formData.append('customerName', value.customerName);
            // formData.append('customerUnit', value.customerUnit);
            // formData.append('customerAddress', value.customerAddress);
            // formData.append('customerEmail', value.customerEmail);
            // formData.append('customerPhoneNumber', value.customerPhoneNumber);
            // formData.append('totalPrice', value.totalPrice);
            // formData.append('status', value.status);
            // formData.append('deleted', value.deleted);
            // formData.append('quantionItemQty', value.quantionItemQty);
            // formData.append('quantionItemLabol', value.quantionItemLabol);
            // formData.append('price', value.price);
            // formData.append('productName', value.productName);
            // formData.append('unit', value.unit);

            // Thêm tất cả các trường biểu mẫu vào FormData
            Object.entries(value).forEach(([key, value]) => {
                if (key === 'image' && value?.[0]) {
                    formData.append('image', value[0].originFileObj);
                } else {
                    formData.append(key, value ?? '');
                }
            })

            const res = await createQuote(formData);
            form.resetFields();
            toastr.success('Thêm báo giá thành công');
            handleBack();
            return res;
        } catch (e) {
            toastr.error('Lỗi thêm báo giá');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>Sửa báo giá</h2>
            </div>

            <hr />

            <Form
                form={form}
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
                onFinish={handleSubmit}
                disabled={loading}
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

                        <Form.Item label="Tên thiết bị " name="productName">
                            <Select
                                placeholder="Chọn thiết bị "
                                loading={loading}
                                onChange={handleProductSelect}
                                notFoundContent={loading ? 'Đang tải...' : 'Không có thiết bị '}
                            >
                                {products.map((product) => (
                                    <Option
                                        key={product.productId}
                                        value={product.productName}
                                    >
                                        {product.productName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Giá tiền" name="price">
                            <Input disabled={loading} />
                        </Form.Item>

                        <Form.Item label="Đơn vị sản phẩm" name="unit">
                            <Input disabled={loading} />
                        </Form.Item>

                        <Form.Item
                            label="File"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
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

                        <Form.Item label="Số lượng" name="quantionItemQty">
                            <InputNumber min={1} disabled={loading}/>
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item label="Số khách hàng" name="customerPhoneNumber">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Bộ phận" name="roles">
                            <Input />
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
                        <Button type="primary" htmlType="submit" loading={loading}>
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