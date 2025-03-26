import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from './TaskManagement.module.scss';
import ModalCreateTask from "../ModalCreateTask/ModalCreateTask";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from "react-bootstrap";
import { TaskList } from "../TaskList";
import { useTaskContext } from "../../context/taskContext";
import { Modal } from "antd";
import { TaskDetailModal } from "../TaskDetailModal";

const cx = classNames.bind(styles);

const TaskManagementContent = () => {
    const [openTask, setOpenTask] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectTask, setSelectTask] = useState(null);
    const [detailVisible, setDetailVisible] = useState(null);
    const [editTask, setEditTask] = useState(null);
    const { completeTask, extendTask, deleteTask } = useTaskContext();

    const showModal = () => {
        setEditTask(null);
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

    // show detail task modal
    const showDetailTask = (task) => {
        setSelectTask(task);
        setDetailVisible(true);
    }

    const closeDetailTask = () => {
        setDetailVisible(false);
        setSelectTask(null);
    }

    // tasks edit
    const handleEditTask = (task) => {
        setEditTask(task);
        setOpenTask(true);
    }

    // xóa task 
    const handleDeleteTask = (taskId) => {
        Modal.confirm({
            title: 'Xác nhận xóa!',
            content: 'Bạn có chắc chắn muốn xóa công việc này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                deleteTask(taskId);
            }
        })
    }

    // task hoàn thành
    const handleCompleteTask = (taskId, note) => {
        completeTask(taskId, note);
    };

    // gia hạn task
    const handleExtendTask = (task) => {
        showDetailTask(task);
    }

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

            <hr />

            <ModalCreateTask
                openTask={openTask}
                confirmLoading={confirmLoading}
                handleOk={handleOk}
                handleCancel={handleCancel}
                editTask={editTask}
            />

            <TaskList
                onView={showDetailTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onComplete={handleCompleteTask}
                onExtend={handleExtendTask}
            />

            <TaskDetailModal
                task={selectTask}
                visible={detailVisible}
                onClose={closeDetailTask}
                onComplete={handleCompleteTask}
                onExtend={extendTask}
            />
        </>
    )
}

export default TaskManagementContent;