import propTypes from 'prop-types';
import React from 'react';
import { Modal } from 'antd';
const ModalChangeStatus = ({ openStatus, handleCancelStatus, handleOkStatus, confirmLoading, modalText, quote }) => {

    return (
        <>
            <Modal
                title="Thông báo"
                open={openStatus}
                onOk={() => handleOkStatus(quote)}
                confirmLoading={confirmLoading}
                onCancel={handleCancelStatus}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};

ModalChangeStatus.propTypes = {
    openStatus: propTypes.bool.isRequired,
    handleCancelStatus: propTypes.func.isRequired,
    handleOkStatus: propTypes.func.isRequired,
    confirmLoading: propTypes.bool,
    modalText: propTypes.string,
    quote: propTypes.array
}

export default ModalChangeStatus;