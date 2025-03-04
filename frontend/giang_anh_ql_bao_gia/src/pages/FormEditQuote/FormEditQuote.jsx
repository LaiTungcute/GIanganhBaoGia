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
import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { editingQuote, getFromProductAll, getIdProduct, getQuoteId } from "../../services/apiService";

const { Option } = Select;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const cx = classNames.bind(styles);

const FormEditQuote = () => {
    // router-dom
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        pageSize: 5,
        currentPage: 1,
        totalPage: 1,
        totalItems: 0,
    });

    const [filter, setFilter] = useState({
        categoryName: '',
        productName: '',
    });

    const handleBack = () => {
        navigate('/quote');
    };

    const auth = localStorage.getItem('auth') || '';
    const name = localStorage.getItem('user') || '';
    const email = localStorage.getItem('email') || '';

    useEffect(() => {
        fetchProduct();
        fetchCurrentQuoteData();
        form.setFieldsValue({
            roles: auth,
            username: name,
            email: email,
        });
    }, [pagination.currentPage, pagination.pageSize, filter]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await getFromProductAll({
                product: filter,
                currentPage: pagination.currentPage,
                pageSize: pagination.pageSize,
            });

            if (res && res.productResponses) {
                setProducts(res.productResponses);
                setPagination({
                    ...pagination,
                    totalPage: res.totalPage || 1,
                    totalItems: res.totalItems,
                });
            } else {
                setProducts([]);
                setPagination((prev) => ({
                    ...prev,
                    totalItems: 0,
                    totalPage: 1,
                }));
            }
        } catch (err) {
            message.error('Không thể tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentQuoteData = async () => {
        try {
            setLoading(true);
            const res = await getQuoteId(id); // Sử dụng phương thức GET để lấy dữ liệu
            if (res) {
                // lấy ra thông tin sản phẩm
                const quantionItems = res.quantionItemResponses.map((item) => ({
                    productName: item.productName,
                    price: item.price,
                    unit: item.unit,
                    image: item.image
                        ? [{ uid: '-1', name: 'image', status: 'done', url: `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${item.image}` }]
                        : [],
                    quantionItemQty: item.quantionItemQty,
                    quantionItemLabol: item.quantionItemLabol,
                }));

                // lấy ra thông tin báo giá theo id
                form.setFieldsValue({
                    quantionName: res.quantionName,
                    username: res.username,
                    email: res.email,
                    phoneNumber: res.phoneNumber,
                    roles: res.roles,
                    customerName: res.customerName,
                    customerEmail: res.customerEmail,
                    customerPhoneNumber: res.customerPhoneNumber,
                    customerAddress: res.customerAddress,
                    customerUnit: res.customerUnit,
                    quantionItemRequests: quantionItems,
                });
            }
        } catch (err) {
            message.error('Không thể tải chi tiết báo giá');
        } finally {
            setLoading(false);
        }
    };

    const fetchProductDetail = async (productName, fieldKey) => {
        try {
            setLoading(true);
            const product = products.find((p) => p.productName === productName);
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
                        : [],
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
            formData.append('customerUnit', values.customerUnit);
            formData.append('customerAddress', values.customerAddress);
            formData.append('customerEmail', values.customerEmail);
            formData.append('customerPhoneNumber', values.customerPhoneNumber);

            values.quantionItemRequests.forEach((item, index) => {
                formData.append(`quantionItemRequests[${index}].productName`, item.productName);
                formData.append(`quantionItemRequests[${index}].quantionItemQty`, item.quantionItemQty);
                formData.append(`quantionItemRequests[${index}].quantionItemLabol`, item.quantionItemLabol);
            });

            const res = await editingQuote(id, formData);

            notification.success({
                message: 'Sửa báo giá thành công',
            });
            handleBack();

            return res;
        } catch (e) {
            notification.error({
                message: 'Sửa báo giá thất bại',
            });
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
            >
                <div className={cx('form')}>
                    <div>
                        <Form.Item label="Tên báo giá" name="quantionName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Bộ phận" name="roles">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Người báo giá" name="username">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="SĐT" name="phoneNumber">
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Khách hàng" name="customerName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email khách hàng" name="customerEmail">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Số khách hàng" name="customerPhoneNumber">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Địa chỉ khách hàng" name="customerAddress">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Đơn vị" name="customerUnit">
                            <Input />
                        </Form.Item>
                    </div>
                </div>

                <Form.List name="quantionItemRequests">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey }) => (
                                <div
                                    key={key}
                                    style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}
                                >
                                    <Form.Item label="Tên thiết bị" name={[name, "productName"]}>
                                        <Select
                                            placeholder="Chọn thiết bị"
                                            loading={loading}
                                            onChange={(value) => fetchProductDetail(value, fieldKey)}
                                        >
                                            {products.map((product) => (
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
                                    <Form.Item
                                        label="Hình ảnh"
                                        name={[name, "image"]}
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
                                    <Form.Item label="Số lượng báo giá" name={[name, "quantionItemQty"]}>
                                        <InputNumber min={1} />
                                    </Form.Item>
                                    <Form.Item label="Tiền nhân công" name={[name, "quantionItemLabol"]}>
                                        <Input />
                                    </Form.Item>
                                    <Button
                                        danger
                                        type="link"
                                        onClick={() => remove(name)}
                                        icon={<MinusCircleOutlined />}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="dashed"
                                onClick={() => add({ productName: '', quantionItemQty: 1, quantionItemLabol: '' })}
                                icon={<PlusOutlined />}
                            >
                                Thêm sản phẩm
                            </Button>
                        </>
                    )}
                </Form.List>

                <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Form.Item style={{ marginRight: '10px' }}>
                        <Button key="back" onClick={handleBack}>
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

export default FormEditQuote;