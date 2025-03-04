import React, { createContext, useContext, useEffect, useState } from "react";
import { TaskStatus } from '../types/taskType'
import { isOverdue } from "../utils/dateUtils";
import { notification } from "antd";

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

        if (saveTasks) {
            try {
                // chuyển đổi chuỗi ngày tháng thành đối tượng Date
                return JSON.parse(saveTasks, (key, value) => {
                    if (key === 'Tạo' || key === 'Hạn' || key === 'Đã hoàn thành' || key === 'Gia hạn') {
                        return value ? new Date(value) : null;
                    }
                    return value;
                })
            } catch (error) {
                console.error('Failed to parse tasks from local storage', error);
                return [];
            }
        }

        return [];
    });

    // Lưu tác vụ vào localStorage bất cứ khi nào chúng thay đổi
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    // Kiểm tra các task quá hạn định kỳ
    useEffect(() => {
        const checkOverdueTasks = () => {
            const now = new Date();
            let updatedTasks = false;

            const newTasks = tasks.map(task => {
                if (task.status === TaskStatus.PENDING && isOverdue(task.deadline)) {
                    updatedTasks = true;
                    return {
                        ...task,
                        status: TaskStatus.OVERDUE
                    };
                }

                return task;
            });

            if (updatedTasks) {
                setTasks(newTasks);
                notification.success({
                    message: 'Cập nhập thành công'
                });
            }
        }

        // Kiểm tra ngay lập tức và sau đó mỗi phút
        checkOverdueTasks();
        const interval = setInterval(checkOverdueTasks, 60000);

        // hủy xét thời gian
        return () => {
            clearInterval(interval);
        }
    }, [tasks]);

    // tao task
    const addTask = (task) => {
        const newTask = {
            id: crypto.randomUUID(),
            title: task.title || '',
            description: task.description || '',
            assignedTo: task.assignedTo || '',
            createdBy: task.createdBy || '', // Có thể cần thêm logic để lấy người tạo
            createdAt: new Date(),
            deadline: task.deadline ? new Date(task.deadline) : new Date(),
            status: TaskStatus.PENDING,
            completedAt: null,
            notes: task.notes || '',
            extensionReason: '',
            extensionDate: null,
        }

        setTasks(pre => [...pre, newTask]);
        notification.success({
            message: 'Tạo thành công!'
        })
    }

    // cap nhap
    const updateTask = (id, updates) => {
        setTasks(pre => pre.map(task => {
            task.id === id ? { ...task, ...updates } : task
        }));

        notification.success({
            message: 'Cập nhập thành công!'
        })
    };

    // Xoa task
    const deleteTask = (id) => {
        setTasks(pre => pre.filter(task => task.id !== id));

        notification.success({
            message: 'Xóa thành công!'
        })
    };

    // hoàn thành nhiệm vụ
    const completeTask = (id, notes) => {
        setTasks(pre => pre.map(task => {
            task.id === id ? {
                ...task,
                status: TaskStatus.COMPLETED,
                extensionDate: new Date(extensionDate),
                extensionReason: reason,
                deadline: new Date(extensionDate)
            } : task
        }));

        notification.success({
            message: 'Đã hoàn thành!'
        })
    };

    // gia hạn thời gian
    const extendTask = (id, extensionDate, reason) => {
        setTasks(pre => pre.map(task => task.id === id ? {
            ...task,
            status: TaskStatus.EXTENDED,
            extensionDate: new Date(extensionDate),
            extensionReason: reason,
            deadline: new Date(extensionDate)
        } : task
        ))

        notification.success({
            message: 'Đã gia hạn thành công!'
        })
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                updateTask,
                deleteTask,
                completeTask,
                extendTask
            }}>
            {children}
        </TaskContext.Provider>
    )
}



export default TaskProvider;