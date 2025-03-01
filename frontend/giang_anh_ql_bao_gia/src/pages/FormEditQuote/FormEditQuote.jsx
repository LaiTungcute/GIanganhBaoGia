import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FormEditQuote.module.scss";
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    notification,
    Select,
    Upload,
} from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { editingQuote, getFromProductAll, getIdProduct, getQuoteId } from "../../services/apiService";

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const cx = classNames.bind(styles);

const FormEditQuote = () => {
    // lấy id từ url
    const { id } = useParams();

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
    })

    const handleBack = () => {
        navigate('/quote');
    }

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
            message.error('Không thể tải danh sách báo giá');
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
                    image: res.image ? [{ uid: '-1', name: 'image', status: 'done', url: `http://localhost:8090/api/product/file/${res.image}` }] : [],
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

    // lấy thông tin báo giá cần chỉnh sửa
    useEffect(() => {
        if (id) {
            fetchQuoteDetail(id);
        }
    }, [id])

    const fetchQuoteDetail = async (quoteId) => {
        try {
            // gọi API để lấy thông tin chi tiết báo giá
            const res = await getQuoteId(quoteId);
            console.log(res);


            // đổ dữ liệu ra view
            if (res && res.quantionItemResponses && res.quantionItemResponses.length > 0) {
                const item = res.quantionItemResponses[0];

                form.setFieldsValue({
                    quantionName: res.quantionName,
                    username: res.username,
                    email: res.email,
                    phoneNumber: res.phoneNumber,
                    productName: item.productName,
                    price: item.price,
                    unit: item.unit,
                    image: item.image ? [{ uid: '-1', name: 'image', status: 'done', url: `http://localhost:8090/api/product/file/${item.image}` }] : [],
                    quantionItemQty: item.quantionItemQty,
                    roles: res.roles,
                    customerName: res.customerName,
                    customerEmail: res.customerEmail,
                    customerPhoneNumber: res.customerPhoneNumber,
                    customerAddress: res.customerAddress,
                    customerUnit: res.customerUnit,
                    quantionItemLabol: res.quantionItemLabol
                });
            }
        } catch (err) {
            message.error('Không thể tải thông tin báo giá');
        }
    }

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

            // gọi api để cập nhập báo giá
            const res = await editingQuote(id, formData);
            form.resetFields();
            notification.success({
                message: 'Sửa báo giá thành công',
            })
            handleBack();
            return res;
        } catch (e) {
            notification.error({
                message: 'Sửa báo giá thất bại',
            })
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
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Người báo giá" name="username">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="SĐT"
                            name="phoneNumber"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tên thiết bị"
                            name="productName"
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
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Đơn vị sản phẩm"
                            name="unit"
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="File"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
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
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email khách hàng"
                            name="customerEmail"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số khách hàng"
                            name="customerPhoneNumber"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ khách hàng"
                            name="customerAddress"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Đơn vị"
                            name="customerUnit"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tiền nhân công"
                            name="quantionItemLabol"
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
    )
}

export default FormEditQuote;