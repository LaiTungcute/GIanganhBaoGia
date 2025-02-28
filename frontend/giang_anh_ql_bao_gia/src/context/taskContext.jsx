import React, { createContext, useContext, useState } from "react";

// định nghĩa các trạng thái của task
const TaskStatus = {
    PENDING: 'Chờ',
    COMPLETED: 'Đã hoàn thành',
    OVERDUE: 'Quá hạn',
    EXTENDED: 'Đã gia hạn',
}

// định nghĩa context
const TaskContext = createContext();

// hook để sử dụng context
export const useTaskContext = () => {
    const context = useContext(TaskContext);

    return context;
}

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const saveTasks = localStorage.getItem('tasks');

        if(saveTasks) {
            try {
                // chuyển đổi chuỗi ngày tháng thành đối tượng Date
                return JSON.parse(saveTasks, (key, value) => {
                    if(key === 'Tạo' || key === 'Hạn' || key === 'Đã hoàn thành' || key === 'Gia hạn') {
                        return value ? new Date(value) : null;
                    }
                    return value;
                })
            } catch (error) {
                console.error('Failed to parse tasks from local storage', error);
            }
        }
    });
}

export default TaskProvider;