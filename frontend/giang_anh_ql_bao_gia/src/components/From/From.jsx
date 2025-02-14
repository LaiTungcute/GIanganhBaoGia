import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
} from 'antd';

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const FormAll = () => {

    return (
        <>
            <Form
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item label="Mã thiết bị">
                    <Input />
                </Form.Item>

                <Form.Item label="Tên thiết bị">
                    <Select>
                        <Select.Option value="demo">Camera</Select.Option>
                        <Select.Option value="demo 2">Camera 2</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="File" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
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

                <Form.Item label="Xuất xứ">
                    <Input />
                </Form.Item>

                <Form.Item label="Đơn vị">
                    <Input />
                </Form.Item>

                <Form.Item label="Số lượng">
                    <InputNumber />
                </Form.Item>
            </Form>
        </>
    );
};
export default FormAll;