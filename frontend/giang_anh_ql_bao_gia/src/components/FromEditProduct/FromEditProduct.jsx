import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    InputNumber,
    Upload,
    Button,
    notification
} from 'antd';
import { apiEditingProduct } from '../../services/apiService';

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const FormEditProduct = ({ handleCancelEdit, loading, currentProduct, handleOkEdit, fetchProduct }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (currentProduct) {
            form.setFieldsValue(currentProduct);
            setFileList(
                currentProduct.image
                    ? [{
                        uid: '-1',
                        name: currentProduct.image,
                        status: 'done',
                        url: `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${currentProduct.image}`
                    }]
                    : []
            );
        }
    }, [currentProduct]);

    const handleSubmit = async (value) => {
        try {
            const formData = new FormData();
            formData.append('productCode', value.productCode);
            formData.append('productName', value.productName);
            formData.append('origin', value.origin);
            formData.append('unit', value.unit);
            formData.append('qty', value.qty);
            formData.append('price', value.price);
            formData.append('description', value.description);

            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('image', fileList[0].originFileObj);
            } else if (currentProduct.image) {
                // nếu ảnh có dạng string thì đổi sang dạng file obj
                if (typeof currentProduct.image === 'string') {
                    const response = await fetch(currentProduct.image);
                    const blob = await response.blob();
                    // Lấy tên file từ URL hoặc gán tên mặc định nếu không có
                    const filename = currentProduct.image.split('/').pop() || 'image.png';
                    const file = new File([blob], filename, { type: blob.type });
                    formData.append('image', file);
                }
            }
            const res = await apiEditingProduct(currentProduct, formData);

            if (res) {
                await fetchProduct();
                handleOkEdit();
            }
        } catch (err) {
            notification.success({
                message: 'Sửa thiết bị thành công',
            })
        }
    };

    return (
        <Form form={form} layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={handleSubmit}>
            <Form.Item label="Mã thiết bị" name="productCode" >
                <Input />
            </Form.Item>
            <Form.Item label="Tên thiết bị" name="productName" >
                <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
                <Input />
            </Form.Item>
            <Form.Item label="Hình ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={({ fileList }) => setFileList(fileList)}
                >
                    {fileList.length >= 1 ? null : (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Tải ảnh</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>
            <Form.Item label="Xuất xứ" name="origin">
                <Input />
            </Form.Item>
            <Form.Item label="Đơn vị" name="unit">
                <Input />
            </Form.Item>
            <Form.Item label="Số lượng" name="qty">
                <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="Giá tiền" name="price">
                <Input min={1} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}>

                    <Button type="default" onClick={handleCancelEdit} style={{ marginRight: '10px' }}>Thoát</Button>
                    <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>Lưu</Button>
                </div>
            </Form.Item>
        </Form>
    );
};

FormEditProduct.propTypes = {
    handleCancelEdit: propTypes.func.isRequired,
    loading: propTypes.bool,
    currentProduct: propTypes.object,
    handleOkEdit: propTypes.func,
    fetchProduct: propTypes.func
}

export default FormEditProduct;