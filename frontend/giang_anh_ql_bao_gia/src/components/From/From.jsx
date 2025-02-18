import React, { useEffect, useState } from 'react';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import toastr from "toastr";
import {
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    Button
} from 'antd';
import { category, createProduct } from '../../services/apiService';
import request from '../../configs/request';

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const FormAll = ({ onSuccess, handleOk, handleCancel }) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await category();
                if (res) {
                    setCategories(res);
                }
            } catch (e) {
                console.error("Lỗi khi tải danh mục:", e);
            }
        }

        fetchCategory();
    }, []); // Đảm bảo chỉ chạy một lần khi component mount

    const handleSubmit = async (value) => {
        try {
            const formData = new FormData();

            formData.append('productCode', value.productCode);
            formData.append('productName', value.productName);
            formData.append('origin', value.origin);
            formData.append('unit', value.unit);
            formData.append('qty', value.qty);
            formData.append('description', value.description);
            formData.append('category', value.category);

            if (value.image && value.image[0]) {
                formData.append('image', value.image[0].originFileObj)
            }

            const res = await createProduct(formData);

            onSuccess(); // Gọi hàm cập nhật dữ liệu bảng
            form.resetFields(); // Xóa hết các trường
            window.location.reload();
            toastr.success('Thêm sản phẩm thành công');

            return res;
        } catch (err) {
            toastr.error('Lỗi thêm sản phẩm');
            console.error("Lỗi tạo sản phẩm", err);
        }
    };

    return (
        <>
            <Form
                id='productForm'
                form={form}
                layout="horizontal"
                labelCol={{ span: 6 }} // Căn chỉnh nhãn
                wrapperCol={{ span: 18 }} // Căn chỉnh input
                style={{
                    maxWidth: 600,
                }}
                onFinish={handleSubmit}
                method='post'
            >
                <Form.Item label="Mã thiết bị" name="productCode" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập mã thiết bị'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Tên thiết bị" name="productName" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập mã thiết bị'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Danh mục" name="category" rules={
                    [
                        {
                            required: true,
                            message: "Vui lòng nhập tên danh mục"
                        }
                    ]
                }>
                    <Select>
                        {categories.length > 0 ? (
                            categories.map((cat, index) => (
                                <Select.Option key={index} value={cat.categoryName}>{cat.categoryName}</Select.Option>
                            ))
                        ) : (
                            <Select.Option disabled>Không có danh mục</Select.Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item label="Mô tả" name="description" >
                    <Input />
                </Form.Item>

                <Form.Item label="File" name="image" valuePropName="fileList" getValueFromEvent={normFile} rules={
                    [
                        {
                            required: true,
                            message: "Vui lòng tải lên hình ảnh"
                        }
                    ]
                }>
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

                <Form.Item label="Xuất xứ" name="origin" rules={
                    [
                        {
                            required: true,
                            message: "Vui lòng chọn xuất xứ"
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Đơn vị" name="unit" rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn đơn vị"
                    }
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Số lượng" name="qty" rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn số lượng"
                    },
                    {
                        type: "number",
                        min: 1,
                        message: "Số lượng phải lớn hơn 0!"
                    }
                ]}>
                    <InputNumber min={1} />
                </Form.Item>

                <div style={{
                    display: "flex",
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <Form.Item style={{
                        marginRight: '10px',
                    }}>
                        <Button key='back' onClick={handleCancel}>
                            Thoát</Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            <SaveOutlined />
                            Lưu
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
};
export default FormAll;