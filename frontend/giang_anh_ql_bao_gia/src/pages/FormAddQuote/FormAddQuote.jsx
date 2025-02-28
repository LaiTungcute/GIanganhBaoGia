import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FormAddQuote.module.scss";
import toastr from "toastr";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    message
} from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { createQuote, getFromProductAll, getIdProduct } from "../../services/apiService";

const { Option } = Select;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const cx = classNames.bind(styles);

const FormAddQuote = () => {
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
    // lưu thông tin sản phẩm được chọn
    const [selectedProduct, setSelectedProduct] = useState(null);
    // tìm kiếm sản phẩm theo tên và danh sách
    const [filter, setFilter] = useState({
        categoryName: '',
        productName: '',
    });

    const handleBack = () => {
        navigate('/quote');
    };

    // lấy auth từ localStorage
    const auth = localStorage.getItem('auth') || '';
    const name = localStorage.getItem('user') || '';
    const email = localStorage.getItem('email') || '';

    // call api lấy danh sách sản phẩm khi bị thay đổi trang hoặc pageSize
    useEffect(() => {
        fetchProduct();

        form.setFieldsValue({
            roles: auth,
            username: name,
            email: email
        });
    }, [pagination.currentPage, pagination.pageSize, filter]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await getFromProductAll({
                product: filter,
                currentPage: pagination.currentPage,
                pageSize: pagination.pageSize
            });

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
                }));
            }
        } catch (err) {
            message.error('Không thể tải danh sách sản phẩm');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // hàm lấy chi tiết thiết bị khi chọn
    const fetchProductDetail = async (productName) => {
        try {
            setLoading(true);
            const product = products.find(p => p.productName === productName);

            if (!product?.productId) return;

            // call api
            const res = await getIdProduct({ productId: product.productId });

            if (res) {
                setSelectedProduct(res);
                // cập nhật các field trong form tự động
                form.setFieldsValue({
                    price: res.price || '',
                    unit: res.unit || '',
                    image: res.image ? [{ uid: '-1', name: 'image', status: 'done', url: `http://localhost:8080/api/product/file/${res.image}` }] : [],
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // khi chọn sản phẩm từ select
    const handleProductSelect = (value) => {
        fetchProductDetail(value);
    };

    const handleSubmit = async (value) => {
        try {
            setLoading(true);
            const formData = new FormData();

            // Thông tin chung của Quantion
            formData.append('quantionName', value.quantionName);
            formData.append('email', value.email);
            formData.append('customerName', value.customerName);
            formData.append('customerEmail', value.customerEmail);
            formData.append('customerUnit', value.customerUnit);
            formData.append('customerAddress', value.customerAddress);
            formData.append('customerPhoneNumber', value.customerPhoneNumber);
            formData.append('unit', value.unit);

            // Gửi quantionItemRequests như một danh sách có một phần tử
            formData.append('quantionItemRequests[0].productName', value.productName);
            formData.append('quantionItemRequests[0].quantionItemQty', value.quantionItemQty);
            formData.append('quantionItemRequests[0].quantionItemLabol', value.quantionItemLabol);

            // Các trường khác nếu cần
            if (value.image && value.image[0]) {
                formData.append('image', value.image[0].originFileObj);
            }

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
                <h2>Tạo báo giá</h2>
            </div>

            <hr />

            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: '100%' }}
                onFinish={handleSubmit}
                disabled={loading}
                method="post"
            >
                <div className={cx('form')}>
                    <div>
                        <Form.Item
                            label="Tên báo giá"
                            name="quantionName"
                            rules={[{ required: true, message: 'Vui lòng nhập tên báo giá' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Người báo giá" name="username">
                            <Input disabled/>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="SĐT"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tên thiết bị"
                            name="productName"
                            rules={[{ required: true, message: 'Vui lòng nhập Tên thiết bị' }]}
                        >
                            <Select
                                placeholder="Chọn thiết bị"
                                loading={loading}
                                onChange={handleProductSelect}
                                notFoundContent={loading ? 'Đang tải...' : 'Không có thiết bị'}
                            >
                                {products.map((product) => (
                                    <Option key={product.productId} value={product.productName}>
                                        {product.productName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Giá tiền"
                            name="price"
                            rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Đơn vị sản phẩm"
                            name="unit"
                            rules={[{ required: true, message: 'Vui lòng nhập đơn vị sản phẩm' }]}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="File"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: "Vui lòng tải lên hình ảnh" }]}
                        >
                            <Upload action="" listType="picture-card" beforeUpload={() => false}>
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="Số lượng báo giá"
                            name="quantionItemQty"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng báo giá' }]}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item label="Bộ phận" name="roles">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Khách hàng"
                            name="customerName"
                            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email khách hàng"
                            name="customerEmail"
                            rules={[{ required: true, message: 'Vui lòng nhập email khách hàng' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số khách hàng"
                            name="customerPhoneNumber"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại khách hàng' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ khách hàng"
                            name="customerAddress"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ khách hàng' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Đơn vị"
                            name="customerUnit"
                            rules={[{ required: true, message: 'Vui lòng nhập đơn vị khách hàng' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tiền nhân công"
                            name="quantionItemLabol"
                            rules={[{ required: true, message: 'Vui lòng nhập tiền nhân công' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Form.Item style={{ marginRight: '10px' }}>
                        <Button key='back' onClick={handleBack}>
                            Quay lại
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            <SaveOutlined />
                            Lưu
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default FormAddQuote;