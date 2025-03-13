import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from './Task.module.scss';
import TaskProvider from "../../context/taskContext";
import { TaskManagementContent } from "../../components/TaskManagementContent";

const cx = classNames.bind(styles);

const Task = () => {
    return (
        <TaskProvider>
            <div className={cx('wrapper')}>
                <TaskManagementContent />
            </div>
        </TaskProvider>
    )
}

export default Task;