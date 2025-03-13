import propTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, DatePicker, Form, Input, Modal, Space, Typography, Select, TimePicker } from 'antd';
import { useTaskContext } from '../../context/taskContext';
import { CalendarOutlined, UserOutlined, InfoCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;
import styles from './ModalCreateTask.module.scss';
const cx = classNames.bind(styles);
const ModalCreateTask = ({ openTask, handleOk, confirmLoading, handleCancel, editTask = null }) => {
    const [form] = Form.useForm();
    const { addTask, updateTask } = useTaskContext();
    const [isEdit, setIsEdit] = useState(false);

    // Đặt lại biểu mẫu khi phương thức mở/đóng hoặc khi chỉnh sửa một tác vụ khác
    useEffect(() => {
        if (openTask) {
            form.resetFields();

            if (editTask) {
                setIsEdit(true);

                // chuyển đổi đối tượng ngày cho form
                const formValues = {
                    ...editTask,
                    deadlineDate: editTask.deadline ? dayjs(editTask.deadline) : null,
                    deadlineTime: editTask.deadline ? dayjs(editTask.deadline) : null,
                }

                form.setFieldsValue(formValues);
            } else {
                setIsEdit(false);
            }
        }
    }, [openTask, editTask, form]);

    const onFinish = (values) => {
        const combinedDateTime = combineDateTime(values.deadlineDate, values.deadlineTime);

        const taskData = {
            title: values.title,
            description: values.description,
            assignedTo: values.assignedTo,
            deadline: combinedDateTime.toISOString(),
            notes: values.notes,
        };

        if (isEdit && editTask) {
            updateTask(editTask.id, taskData);
        } else {
            addTask(taskData);
        }

        handleOk();
    }

    // Kết hợp ngày và thời gian thành một đối tượng ngày
    const combineDateTime = (date, time) => {
        if (!date) return new Date();

        const combined = new Date(date);

        if (time) {
            combined.setHours(time.hour(), time.minute(), 0, 0);
        } else {
            // mac dinh la 23:59:59.999
            combined.setHours(23, 59, 59, 999);
        }

        return combined;
    }

    return (
        <>
            <Modal
                title={
                    <div className={cx('modal-title')}>
                        <Title level={4} className={cx('modal-heading')}>
                            {isEdit ? 'Chỉnh sửa công việc' : 'Thêm công việc'}
                        </Title>

                        <Text type="secondary" className={cx('modal-subtitle')}>
                            {isEdit ? 'Cập nhật thông tin cho công việc hiện tại' : 'Điền thông tin chi tiết để tạo công việc mới'}
                        </Text>
                    </div>
                }
                open={openTask}
                onCancel={handleCancel}
                width={600}
                className="task-modal"
                destroyOnClose
                footer={null}
            >
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                    className={cx('task-form')}
                    requiredMark={false}
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề công việc"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề công việc' }]}
                    >
                        <Input
                            placeholder='Nhập tiêu đề công việc'
                            prefix={<InfoCircleOutlined />}
                            className={cx('rounded-input')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả công việc"
                    >
                        <TextArea
                            placeholder="Mô tả chi tiết về công việc"
                            rows={4}
                            className="rounded-input"
                        />
                    </Form.Item>

                    <Form.Item
                        name="assignedTo"
                        label="Người thực hiện"
                        rules={[{ required: true, message: 'Vui lòng chọn người thực hiện' }]}
                    >
                        <Input
                            placeholder="Nhập tên người thực hiện"
                            prefix={<UserOutlined />}
                            className="rounded-input"
                        />
                    </Form.Item>

                    <Form.Item label="Thời hạn hoàn thành" className={cx('deadline-row')}>
                        <Space
                            className={cx('deadline-space')}
                        >
                            <Form.Item
                                name='deadlineDate'
                                rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
                                noStyle
                            >
                                <DatePicker
                                    placeholder='Chọn ngày'
                                    format='DD/MM/YYYY'
                                    className={cx("rounded-input date-picker")}
                                    suffixIcon={<CalendarOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                name='deadlineTime'
                                rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}
                                noStyle
                            >
                                <TimePicker
                                    placeholder='Chọn giờ'
                                    format='HH:mm'
                                    className={cx('rounded-input time-picker')}
                                    suffixIcon={<ClockCircleOutlined />}
                                />
                            </Form.Item>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        name="notes"
                        label="Ghi chú"
                    >
                        <TextArea
                            placeholder="Thêm ghi chú (nếu có)"
                            rows={3}
                            className="rounded-input"
                        />
                    </Form.Item>

                    <Form.Item className={cx('form-actions')}>
                        <Space>
                            <Button onClick={handleCancel}>
                                Hủy
                            </Button>

                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={confirmLoading}
                            >
                                {isEdit ? 'Cập nhật' : 'Thêm'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

ModalCreateTask.propTypes = {
    openTask: propTypes.bool,
    handleOk: propTypes.func,
    confirmLoading: propTypes.bool,
    handleCancel: propTypes.func,
    editTask: propTypes.object,
}
export default ModalCreateTask;