import React from 'react';
import { Button, Modal } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import FormEditProduct from '../FromEditProduct/FromEditProduct';

const ModalEditProduct = ({ handleCancelEdit, handleOkEdit, openEdit, loadingEdit }) => {
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
                    <Button key="back" onClick={handleCancelEdit}>
                        Thoát
                    </Button>,
                    <Button key="submit" type="primary" loading={loadingEdit} onClick={handleOkEdit}>
                        <SaveOutlined />
                        Lưu
                    </Button>
                ]}
            >
                <FormEditProduct />
            </Modal>
        </>
    );
};

export default ModalEditProduct;