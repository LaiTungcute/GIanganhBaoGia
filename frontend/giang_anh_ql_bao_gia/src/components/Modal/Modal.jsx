import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import FormAll from '../From/From';

const ModalAddPc = ({ handleCancel, handleOk, open, fetchProduct }) => {

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
                    null
                ]}
            >
                <FormAll onSuccess={handleOk} fetchProduct={fetchProduct} handleCancel={handleCancel} />
            </Modal>
        </>
    );
};

ModalAddPc.prototype = {
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    open: PropTypes.func,
    loading: PropTypes.bool,
};

export default ModalAddPc;