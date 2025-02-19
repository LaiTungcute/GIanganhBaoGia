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
export default ModalDeleteProduct;