import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import FormAll from '../From/From';

const ModalAddPc = ({ handleCancel, handleOk, open, loading }) => {
    return (
        <>
            <Modal
                open={open}
                title={
                    <span style={{
                        fontSize: '20px',
                        fontWeight: 700,
                    }}>Thêm sản phẩm</span>
                }
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Thoát
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        <SaveOutlined />
                        Lưu
                    </Button>
                ]}
            >
                <FormAll />
            </Modal>
        </>
    );
};

export default ModalAddPc;