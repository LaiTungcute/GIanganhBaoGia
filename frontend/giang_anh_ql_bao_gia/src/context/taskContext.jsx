
import React, { createContext, useContext, useEffect, useState } from "react";
import { TaskStatus } from '../types/taskType';
import { isOverdue, calculatePenalty } from "../utils/dateUtils";
import { notification } from "antd";

// Định nghĩa context
const TaskContext = createContext();

// Hook để sử dụng context
export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const saveTasks = localStorage.getItem('tasks');

        if (saveTasks) {
            try {
                // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
                return JSON.parse(saveTasks, (key, value) => {
                    if (key === 'createdAt' || key === 'deadline' || key === 'completedAt' || key === 'extensionDate') {
                        return value ? new Date(value) : null;
                    }
                    return value;
                });
            } catch (error) {
                console.error('Failed to parse tasks from local storage', error);
                return [];
            }
        }

        return [];
    });

    // Lưu tác vụ vào localStorage bất cứ khi nào chúng thay đổi
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Kiểm tra các task quá hạn định kỳ
    useEffect(() => {
        const checkOverdueTasks = () => {
            const now = new Date();
            let updatedTasks = false;

            const newTasks = tasks.map(task => {
                if (task.status === TaskStatus.PENDING && isOverdue(task.deadline)) {
                    updatedTasks = true;
                    const penalty = calculatePenalty(task.deadline);
                    return {
                        ...task,
                        status: TaskStatus.OVERDUE,
                        penalty
                    };
                }
                return task;
            });

            if (updatedTasks) {
                setTasks(newTasks);
                notification.warning({
                    message: 'Cảnh báo',
                    description: 'Một số công việc đã quá hạn!',
                    placement: 'topRight'
                });
            }
        };

        // Kiểm tra ngay lập tức và sau đó mỗi phút
        checkOverdueTasks();
        const interval = setInterval(checkOverdueTasks, 60000);

        // Hủy xét thời gian
        return () => {
            clearInterval(interval);
        };
    }, [tasks]);

    // Tạo task mới
    const addTask = (task) => {
        const newTask = {
            id: crypto.randomUUID(),
            title: task.title || '',
            description: task.description || '',
            assignedTo: task.assignedTo || '',
            createdBy: task.createdBy || 'Admin', // Mặc định là Admin
            createdAt: new Date(),
            deadline: task.deadline ? new Date(task.deadline) : new Date(),
            status: TaskStatus.PENDING,
            completedAt: null,
            notes: task.notes || '',
            extensionReason: '',
            extensionDate: null,
            penalty: 0,
        };

        setTasks(prev => [...prev, newTask]);
        notification.success({
            message: 'Thành công',
            description: 'Đã tạo công việc mới!',
            placement: 'topRight'
        });
    };

    // Cập nhật task
    const updateTask = (id, updates) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, ...updates } : task
        ));

        notification.success({
            message: 'Thành công',
            description: 'Đã cập nhật công việc!',
            placement: 'topRight'
        });
    };

    // Xóa task
    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));

        notification.success({
            message: 'Thành công',
            description: 'Đã xóa công việc!',
            placement: 'topRight'
        });
    };

    // Hoàn thành nhiệm vụ
    const completeTask = (id, notes = '') => {
        setTasks(prev => prev.map(task =>
            task.id === id ? {
                ...task,
                status: TaskStatus.COMPLETED,
                completedAt: new Date(),
                notes: notes || task.notes
            } : task
        ));

        notification.success({
            message: 'Thành công',
            description: 'Công việc đã hoàn thành!',
            placement: 'topRight'
        });
    };

    // Gia hạn thời gian
    const extendTask = (id, extensionDate, reason) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? {
                ...task,
                status: TaskStatus.EXTENDED,
                extensionDate: new Date(extensionDate),
                extensionReason: reason,
                deadline: new Date(extensionDate)
            } : task
        ));

        notification.success({
            message: 'Thành công',
            description: 'Đã gia hạn công việc!',
            placement: 'topRight'
        });
    };

    // Lọc task theo trạng thái
    const filterTasksByStatus = (status) => {
        if (!status) return tasks;
        return tasks.filter(task => task.status === status);
    };

    // Tìm kiếm task theo từ khóa
    const searchTasks = (keyword) => {
        if (!keyword) return tasks;
        const lowercasedKeyword = keyword.toLowerCase();
        return tasks.filter(task =>
            task.title.toLowerCase().includes(lowercasedKeyword) ||
            task.description.toLowerCase().includes(lowercasedKeyword) ||
            task.assignedTo.toLowerCase().includes(lowercasedKeyword)
        );
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                updateTask,
                deleteTask,
                completeTask,
                extendTask,
                filterTasksByStatus,
                searchTasks
            }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
