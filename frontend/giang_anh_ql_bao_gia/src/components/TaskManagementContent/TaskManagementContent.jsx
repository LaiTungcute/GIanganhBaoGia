import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from './TaskManagement.module.scss';
import ModalCreateTask from "../ModalCreateTask/ModalCreateTask";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from "react-bootstrap";

const cx = classNames.bind(styles);

const TaskManagementContent = () => {
    const [openTask, setOpenTask] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpenTask(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenTask(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        setOpenTask(false);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('tb-info')}>
                    <h2 className={cx('tb-title')}>Quản lý công việc</h2>
                    <Button onClick={showModal} className={cx('add-pd')} variant="primary">
                        <IoIosAddCircle /> Thêm Công việc
                    </Button>
                </div>
            </div>

            <ModalCreateTask openTask={openTask} confirmLoading={confirmLoading} handleOk={handleOk} handleCancel={handleCancel} />
        </>
    )
}

export default TaskManagementContent;