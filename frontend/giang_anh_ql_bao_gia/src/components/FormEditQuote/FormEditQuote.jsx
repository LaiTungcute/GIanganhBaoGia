import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { SaveOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Button
} from 'antd';
import toastr from "toastr";

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const FormEditQuote = ({ handleCancelEdit, handleOkEdit }) => {
    return (
        <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item label="Tên báo giá">
                <Input />
            </Form.Item>

            <Form.Item label="Người báo giá">
                <Input />
            </Form.Item>

            <Form.Item label="Email">
                <Input />
            </Form.Item>

            <Form.Item label="SĐT">
                <Input />
            </Form.Item>

            <Form.Item label="Tên sản phẩm">
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Bộ phận">
                <Input />
            </Form.Item>

            <Form.Item label="Địa chỉ" >
                <Input />
            </Form.Item>

            <Form.Item label="Đơn vị">
                <Input />
            </Form.Item>

            <Form.Item label="Nhận công" >
                <Input />
            </Form.Item>

            <Form.Item label="Số lượng" >
                <InputNumber />
            </Form.Item>

            <Form.Item label="Giá tiền">
                <Input />
            </Form.Item>

            <div style={{
                display: "flex",
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                <Form.Item style={{
                    marginRight: '10px',
                }}>
                    <Button key='back' onClick={handleCancelEdit}>
                        Thoát</Button>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        <SaveOutlined />
                        Lưu
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

FormEditQuote.propTypes = {
    handleCancelEdit: propTypes.func.isRequired,
    handleOkEdit: propTypes.func,
}

export default FormEditQuote;