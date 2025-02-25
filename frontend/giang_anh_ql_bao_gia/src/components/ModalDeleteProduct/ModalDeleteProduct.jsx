import propTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const ModalDeleteProduct = ({ openDelete, handleCancelDelete, handleOkDelete, confirmLoading, modalText, product }) => {

    return (
        <>
            <Modal
                title="Thông báo"
                open={openDelete}
                onOk={() => handleOkDelete(product)}
                confirmLoading={confirmLoading}
                onCancel={handleCancelDelete}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};

ModalDeleteProduct.propTypes = {
    openDelete: propTypes.bool.isRequired,
    handleCancelDelete: propTypes.func.isRequired,
    handleOkDelete: propTypes.func.isRequired,
    confirmLoading: propTypes.bool,
    modalText: propTypes.string,
    product: propTypes.array
}

export default ModalDeleteProduct;