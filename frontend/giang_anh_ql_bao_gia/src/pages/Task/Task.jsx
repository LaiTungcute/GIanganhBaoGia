import React from "react";
import classNames from "classnames/bind";
import styles from './TaskManagement.module.scss';
import TaskProvider from "../../context/taskContext";
import Button from 'react-bootstrap/Button';

import { IoIosAddCircle } from "react-icons/io";

const cx = classNames.bind(styles);

const Task = () => {
    return (
        <TaskProvider>
            <div className={cx('wrapper')}>
                <div className={cx('tb-info')}>
                    <h2 className={cx('tb-title')}>Công việc</h2>
                    <Button className={cx('add-pd')} variant="primary">
                        <IoIosAddCircle /> Thêm Công việc
                    </Button>
                </div>
            </div>
        </TaskProvider>
    )
}

export default Task;