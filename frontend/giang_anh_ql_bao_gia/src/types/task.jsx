import React from "react";

// định nghĩa các kiểu dữ liệu 
export const TaskStatus = {
    PENDING: 'Chờ',
    COMPLETED: 'Đã hoàn thành',
    OVERDUE: 'Quá hạn',
    EXTENDED: 'Đã gia hạn',
}

// Định nghĩa interface Task
export const Task = {
    id: '',
    title: '',
    description: '',
    assignedTo: '',
    createdBy: '',
    createdAt: new Date(),
    deadline: new Date(),
    status: TaskStatus.PENDING,
    completedAt: null,
    notes: '',
    extensionReason: '',
    extensionDate: null,
};

// Định nghĩa interface TaskFormData
export const TaskFormData = {
    title: '',
    description: '',
    assignedTo: '',
    deadline: '',
};