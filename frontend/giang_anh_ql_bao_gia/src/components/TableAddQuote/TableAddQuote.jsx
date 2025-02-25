import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
import classNames from "classnames/bind";
import styles from './TableAddQuote.module.scss'

const cx = classNames.bind(styles);

const TableAddQuote = ({handleCancel, loading}) => {

    return (
        <div className={cx('wrapper')}>
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item label="Tên báo giá" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập tên báo giá'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Người báo giá" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập tên người báo giá'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Email" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập email'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="SĐT" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Tên sản phẩm">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Bộ phận" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập bộ phận'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Địa chỉ" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập địa chỉ'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Đơn vị" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập đơn vị'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Nhận công" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập nhận công'
                        }
                    ]
                }>
                    <Input />
                </Form.Item>

                <Form.Item label="Số lượng" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập số lượng'
                        }
                    ]
                }>
                    <InputNumber />
                </Form.Item>

                <Form.Item label="Giá tiền" rules={
                    [
                        {
                            required: true,
                            message: 'Vui lòng nhập giá tiền'
                        }
                    ]
                }>
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
                        <Button key='back' onClick={handleCancel}>
                            Thoát</Button>
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
};

TableAddQuote.propTypes = {
    handleCancel: PropTypes.func,
    loading: PropTypes.bool,
}

export default TableAddQuote;

