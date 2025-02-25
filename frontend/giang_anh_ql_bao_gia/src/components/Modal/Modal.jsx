import propTypes from 'prop-types';
import React from 'react';
import { Modal } from 'antd';
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

ModalAddPc.propTypes = {
    handleCancel: propTypes.func,
    handleOk: propTypes.func,
    open: propTypes.bool,
    fetchProduct: propTypes.func,
};

export default ModalAddPc;