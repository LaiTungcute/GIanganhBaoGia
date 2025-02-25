import propTypes from 'prop-types';
import React from 'react';
import { Modal } from 'antd';
import FormEditQuote from '../FormEditQuote/FormEditQuote';

const ModalEditQuote = ({ handleCancelEdit, handleOkEdit, openEdit }) => {
    return (
        <>
            <Modal
                open={openEdit}
                title={
                    <span style={{
                        fontSize: '20px',
                        fontWeight: 700,
                    }}>Sửa báo giá</span>
                }
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
                footer={[
                    null
                ]}
            >
                <FormEditQuote handleCancelEdit={handleCancelEdit}/>
            </Modal>
        </>
    );
};

ModalEditQuote.propTypes = {
    handleCancelEdit: propTypes.func,
    handleOkEdit: propTypes.func,
    openEdit: propTypes.bool,
    loadingEdit: propTypes.bool,
};

export default ModalEditQuote;