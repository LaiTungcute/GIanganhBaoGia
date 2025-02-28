import React from "react";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";

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