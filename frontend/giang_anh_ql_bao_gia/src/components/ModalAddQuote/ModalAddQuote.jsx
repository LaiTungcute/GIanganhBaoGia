import propTypes from 'prop-types';
import React from 'react';
import { Modal } from 'antd';
import { TableAddQuote } from '../TableAddQuote';

const ModalAddQuote = ({ handleCancel, handleOk, open, loading }) => {

    return (
        <>
            <Modal
                open={open}
                title={
                    <span style={{
                        fontSize: '20px',
                        fontWeight: 700,
                    }}>Thêm báo giá</span>
                }
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    null
                ]}
            >
                <TableAddQuote handleCancel={handleCancel} loading={loading}/>
            </Modal>
        </>
    );
};

ModalAddQuote.propTypes = {
    handleCancel: propTypes.func,
    handleOk: propTypes.func,
    open: propTypes.bool,
};

export default ModalAddQuote;