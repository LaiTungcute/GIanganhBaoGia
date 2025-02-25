import propTypes from 'prop-types';
import React from 'react';
import { Modal } from 'antd';
import FormEditProduct from '../FromEditProduct/FromEditProduct';

const ModalEditProduct = ({ handleCancelEdit, handleOkEdit, openEdit, currentProduct, fetchProduct }) => {
    return (
        <>
            <Modal
                open={openEdit}
                title={
                    <span style={{
                        fontSize: '20px',
                        fontWeight: 700,
                    }}>Sửa thiết bị</span>
                }
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
                footer={[
                    null
                ]}
            >
                <FormEditProduct handleOkEdit={handleOkEdit} currentProduct={currentProduct} fetchProduct={fetchProduct} handleCancelEdit={handleCancelEdit} />
            </Modal>
        </>
    );
};

ModalEditProduct.propTypes = {
    handleCancelEdit: propTypes.func,
    handleOkEdit: propTypes.func,
    openEdit: propTypes.bool,
    loadingEdit: propTypes.bool,
};

export default ModalEditProduct;