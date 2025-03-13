import React from "react";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import "dayjs/locale/vi"; // import locale vn

dayjs.extend(relativeTime);
dayjs.locale("vi");

// định dạng ngày tháng thành chuỗi (dd/MM/yyyy)
export const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY");
}

// Định dạng ngày tháng và giờ thành chuỗi (dd/MM/yyyy HH:mm)
export const formatDateTime = (date) => {
    return dayjs(date).format("DD/MM/YYYY HH:mm");
}

// Định dạng ngày tháng cho input (yyyy-MM-dd)
export const formatDateInput = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
}

// Định dạng giờ cho input (HH:mm)
export const formatTimeForInput = (date) => {
    return dayjs(date).format("HH:mm");
}

// Kiểm tra xem một ngày có quá hạn hay không
export const isOverdue = (deadline) => {
    return dayjs(deadline).isBefore(dayjs()); // so sánh ngày hiện tại với deadline
}

// Kết hợp chuỗi ngày và giờ để tạo đối tượng dayjs
export const parseDeadline = (dateString, timeString = '23:59') => {
    return dayjs(`${dateString}T${timeString}`);
}

// tính số ngày còn lại đến deadline
export const daysUntilDeadline = (deadline) => {
    const now = dayjs();
    const deadlineDate = dayjs(deadline);
    return deadlineDate.diff(now, "day");
}

// Định dạng thời gian tương đối (e.g. "2 ngày trước", "3 ngày tới")
export const formatRelativeTime = (date) => {
    return dayjs(date).fromNow();
}

// Tính số tiền phạt dựa trên số ngày quá hạn (ví dụ: 100,000 VND/ngày)
export const calculatePenalty = (deadline, penaltyRate = 100000) => {
    if (!isOverdue(deadline)) {
        return 0;
    }

    const days = Math.abs(daysUntilDeadline(deadline));

    return days * penaltyRate;
}

// định dạng số tiền theo fromat của Việt Nam
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
}