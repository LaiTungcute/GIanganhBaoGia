import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
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
                <FormEditProduct handleOkEdit={handleOkEdit} currentProduct={currentProduct} fetchProduct={fetchProduct} />
            </Modal>
        </>
    );
};

ModalEditProduct.prototype = {
    handleCancelEdit: PropTypes.func,
    handleOkEdit: PropTypes.func,
    openEdit: PropTypes.func,
    loadingEdit: PropTypes.bool,
};

export default ModalEditProduct;