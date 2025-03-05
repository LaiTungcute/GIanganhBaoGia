import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FormAddQuote.module.scss";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    message,
    notification
} from "antd";
import { PlusOutlined, SaveOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { createQuote, getAllProduct, getIdProduct } from "../../services/apiService";

const { Option } = Select;
const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);
const cx = classNames.bind(styles);

const FormAddQuote = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    // lưu thông tin sản phẩm được chọn
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleBack = () => {
        navigate('/quote');
    };

    //     // lấy auth từ localStorage
    const auth = localStorage.getItem('auth') || '';
    const name = localStorage.getItem('user') || '';
    const email = localStorage.getItem('email') || '';

    useEffect(() => {
        fetchProduct();
        form.setFieldsValue({
            roles: auth,
            username: name,
            email: email
        });
    }, []);



    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await getAllProduct();

            setProducts(res);
        } catch (err) {
            message.error('Không thể tải danh sách báo giá');
        } finally {
            setLoading(false);
        }
    };

    const fetchProductDetail = async (productName, fieldKey) => {
        try {
            setLoading(true);
            const product = products.find(p => p.productName === productName);
            if (!product?.productId) return;
            const res = await getIdProduct({ productId: product.productId });
            if (res) {
                const currentValues = form.getFieldValue("quantionItemRequests") || [];
                currentValues[fieldKey] = {
                    ...currentValues[fieldKey],
                    price: res.price || '',
                    unit: res.unit || '',
                    image: res.image
                        ? [{ uid: '-1', name: 'image', status: 'done', url: `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${res.image}` }]
                        : []
                };
                form.setFieldsValue({ quantionItemRequests: currentValues });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('quantionName', values.quantionName);
            formData.append('email', values.email);
            formData.append('customerName', values.customerName);
            formData.append('customerEmail', values.customerEmail);
            formData.append('customerUnit', values.customerUnit);
            formData.append('customerAddress', values.customerAddress);
            formData.append('customerPhoneNumber', values.customerPhoneNumber);

            values.quantionItemRequests.forEach((item, index) => {
                formData.append(`quantionItemRequests[${index}].productName`, item.productName);
                formData.append(`quantionItemRequests[${index}].quantionItemQty`, item.quantionItemQty);
                formData.append(`quantionItemRequests[${index}].quantionItemLabol`, item.quantionItemLabol);
            });

            await createQuote(formData);
            form.resetFields();
            notification.success({ message: 'Thêm báo giá thành công' });
            navigate('/quote');
        } catch (e) {
            notification.error({ message: 'Thêm báo giá thất bại' });
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

                        <Form.Item label="Bộ phận" name="roles">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item label="Người báo giá" name="username">
                            <Input disabled />
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
                    </div>

                    <div>
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
                    </div>
                </div>

                <Form.List name="quantionItemRequests">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey }) => (
                                <div key={key} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                                    <Form.Item label="Tên thiết bị" name={[name, "productName"]} rules={[{ required: true }]}>
                                        <Select
                                            placeholder="Chọn thiết bị"
                                            loading={loading}
                                            onChange={(value) => fetchProductDetail(value, fieldKey)}
                                        >
                                            {products.map(product => (
                                                <Option key={product.productId} value={product.productName}>
                                                    {product.productName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label="Giá tiền" name={[name, "price"]}>
                                        <Input disabled />
                                    </Form.Item>

                                    <Form.Item label="Đơn vị sản phẩm" name={[name, "unit"]}>
                                        <Input disabled />
                                    </Form.Item>

                                    <Form.Item label="Hình ảnh" name={[name, "image"]} valuePropName="fileList" getValueFromEvent={normFile}>
                                        <Upload action="" listType="picture-card" beforeUpload={() => false}>
                                            <button style={{ border: 0, background: 'none' }} type="button">
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </button>
                                        </Upload>
                                    </Form.Item>

                                    <Form.Item label="Số lượng báo giá" name={[name, "quantionItemQty"]} rules={[{ required: true, message: 'Vui lòng nhập số lượnglượng' }]}>
                                        <InputNumber min={1} />
                                    </Form.Item>

                                    <Form.Item label="Tiền nhân công" name={[name, "quantionItemLabol"]} rules={[{ required: true, message: 'Vui lòng nhập tiền nhân công' }]}>
                                        <Input />
                                    </Form.Item>

                                    <Button danger type="link" onClick={() => remove(name)} icon={<MinusCircleOutlined />}>
                                        Xóa
                                    </Button>
                                </div>
                            ))}
                            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                Thêm sản phẩm
                            </Button>
                        </>
                    )}
                </Form.List>

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
