import React, { useState } from "react";
import propTypes from "prop-types";
import classNames from "classnames/bind";
import styles from './TaskDetailModal.module.scss';
import { Button, DatePicker, Descriptions, Divider, Form, Input, Modal, Space, Tag, Typography } from "antd";
import dayjs from 'dayjs';
import { daysUntilDeadline, isOverdue, formatDateTime, formatCurrency } from "../../utils/dateUtils";
import { TaskStatus } from "../../types/taskType";
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, QuestionCircleOutlined, UserOutlined, WarningOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const TaskDetailModal = ({ task, visible, onClose, onComplete, onExtend }) => {
    const [completeForm] = Form.useForm();
    const [extendForm] = Form.useForm();
    const [showCompleteForm, setShowCompleteForm] = useState(false);
    const [showExtendForm, setShowExtendForm] = useState(false);

    if (!task) return null;

    // trạng tháithái
    const getStatusTag = () => {
        switch (task.status) {
            case TaskStatus.PENDING:
                return <Tag color="gold" icon={<ClockCircleOutlined />}>{task.status}</Tag>
            case TaskStatus.COMPLETED:
                return <Tag color="green" icon={<CheckCircleOutlined />}>{task.status}</Tag>
            case TaskStatus.OVERDUE:
                return <Tag color="red" icon={<WarningOutlined />}>{task.status}</Tag>
            case TaskStatus.EXTENDED:
                return <Tag color="blue" icon={<QuestionCircleOutlined />}>{task.status}</Tag>
            default:
                return <Tag>{task.status}</Tag>
        }
    }

    // hàm xử lý hoàn thành
    const handleComplete = () => {
        const notes = completeForm.getFieldValue('completionNote');
        onComplete(task.id, notes);
        setShowCompleteForm(false);
        onClose();
    }

    // hàm gia hạn
    const handleExtend = () => {
        const values = extendForm.getFieldValue();
        const extensionDate = values.extensionDate.toDate();
        onExtend(task.id, extensionDate, values.extensionReason);
        setShowExtendForm(false);
        onClose();
    }

    return (
        <Modal
            title={
                <div className={cx('detail-modal-header')}>
                    <div>
                        <Title level={4} className={cx('detail-modal-title')}>
                            {task.title}
                        </Title>

                        <Space size='small'>
                            {getStatusTag()}
                            {isOverdue(task.deadline) && task.status !== TaskStatus.COMPLETED && (
                                <Tag color="red">Quá Hạn {Math.abs(daysUntilDeadline(task.deadline))} ngày</Tag>
                            )}
                        </Space>
                    </div>
                </div>
            }

            open={visible}
            onCancel={onClose}
            footer={null}
            width={700}
            className={cx('task-detail-modal')}
        >
            <div className={cx('task-detail-content')}>
                <Divider orientation="left">Thông tin chung</Divider>

                <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }} className={cx('task-descriptions')}>
                    <Descriptions.Item label="Người thực hiện" span={1}>
                        <Space>
                            <UserOutlined />
                            <Text>{task.assignedTo || 'Chưa phân công'}</Text>

                        </Space>
                    </Descriptions.Item>

                    <Descriptions.Item label="Người tạo" span={1}>
                        {task.createdBy || 'Admin'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Ngày tạo" span={1}>
                        {formatDateTime(task.createdAt)}
                    </Descriptions.Item>

                    <Descriptions.Item label="Hạn hoàn thành" span={1}>
                        <Space>
                            <CalendarOutlined />

                            <Text type={isOverdue(task.deadline) && task.status !== TaskStatus.COMPLETED ? 'danger' : ''}>
                                {formatDateTime(task.deadline)}
                            </Text>
                        </Space>
                    </Descriptions.Item>

                    {/* hoàn thành */}
                    {task.status === TaskStatus.COMPLETED && (
                        <Descriptions.Item label="Ngày hoàn thành" span={2}>
                            <Text type="success">
                                {formatDateTime(task.completedAt)}
                            </Text>
                        </Descriptions.Item>
                    )}

                    {/* gian hạn */}
                    {task.status === TaskStatus.EXTENDED && (
                        <>
                            <Descriptions.Item label="Gia Hạn đến" span={1}>
                                <Text type="warning">
                                    {formatDateTime(task.extensionDate)}
                                </Text>
                            </Descriptions.Item>

                            <Descriptions.Item label="Lý do gian hạn" span={1}>
                                {task.extensionReason}
                            </Descriptions.Item>
                        </>
                    )}

                    {/* phạt tiền */}
                    {
                        task.penalty > 0 && (
                            <Descriptions.Item label="Phạt tiền" span={2}>
                                <Text type="danger">{formatCurrency(task.penalty)}</Text>
                            </Descriptions.Item>
                        )
                    }
                </Descriptions>

                <Divider orientation="left">Mô tả</Divider>

                <div className={cx('task-description-section')}>
                    <Paragraph>{task.description || 'Không có mô tả'}</Paragraph>
                </div>

                {
                    task.notes && (
                        <>
                            <Divider orientation="left">
                                Ghi chú
                            </Divider>

                            <div className={cx('task-notes-section')}>
                                <Paragraph>{task.notes}</Paragraph>
                            </div>
                        </>
                    )
                }

                {
                    (
                        task.status === TaskStatus.PENDING || task.status === TaskStatus.OVERDUE
                    ) && (
                        <div className={cx('task-actions')}>
                            <Divider orientation="left">Hành động</Divider>

                            {
                                !showCompleteForm && !showExtendForm && (
                                    <Space className={cx('action-buttons')}>
                                        <Button
                                            type="primary"
                                            onClick={() => setShowCompleteForm(true)}
                                            icon={<CheckCircleOutlined />}
                                        >
                                            Hoàn thành
                                        </Button>

                                        <Button
                                            onClick={() => setShowExtendForm(true)}
                                            icon={<CalendarOutlined />}
                                        >
                                            Gia hạn
                                        </Button>
                                    </Space>
                                )
                            }

                            {/* hiển thị modal hoàn thành */}
                            {
                                showCompleteForm && (
                                    <div className={cx('form-section animate-fade-in')}>
                                        <Title level={5}>
                                            Đánh dấu hoàn thành
                                        </Title>

                                        <Form form={completeForm} layout="vertical">
                                            <Form.Item
                                                name='completionNote'
                                                label='Ghi chú hoàn thành'
                                            >
                                                <TextArea rows={3} placeholder="Nhập ghi chú về việc hoàn thành (Nếu có)" />
                                            </Form.Item>

                                            <Form.Item>
                                                <Space>
                                                    <Button onClick={() => setShowCompleteForm(false)}>
                                                        Hủy
                                                    </Button>

                                                    <Button type="primary" onClick={handleComplete}>
                                                        Xác nhận hoàn thành
                                                    </Button>
                                                </Space>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                )
                            }

                            {/* hiển thị modal gia hạn */}
                            {
                                showExtendForm && (
                                    <div className={cx('form-section animate-fade-in')}>
                                        <Title level={5}>
                                            Gia hạn thời gian
                                        </Title>

                                        <Form form={extendForm} layout="vertical">
                                            <Form.Item
                                                name='extensionDate'
                                                label="Ngày gia hạn mới"
                                                rules={[
                                                    { required: true, message: 'Vui lòng chọn ngày gia hạn' },

                                                    {
                                                        validator: (_, value) => {
                                                            if (value && value.isBefore(dayjs(), 'day')) {
                                                                return Promise.reject('Ngày gian hạn không được trước ngày hiện tại');
                                                            }
                                                            return Promise.resolve;
                                                        }
                                                    }
                                                ]}
                                                initialValue={dayjs().add(7, 'day')}
                                            >
                                                <DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />
                                            </Form.Item>

                                            <Form.Item>
                                                <Space>
                                                    <Button onClick={() => setShowExtendForm(false)}>
                                                        Hủy
                                                    </Button>

                                                    <Button type="primary" onClick={handleExtend}>Xác nhận gia hạn</Button>
                                                </Space>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                )
                            }
                        </div>
                    )
                }

                <div className={cx('modal-footer')}>
                    <Button type="default" onClick={onClose}>
                        Đóng
                    </Button>
                </div>
            </div>
        </Modal>
    )
};

TaskDetailModal.protoTypes = {
    task: propTypes.object.isRequired,
    visible: propTypes.object.isRequired,
    onEdit: propTypes.func.isRequired,
    onDelete: propTypes.func.isRequired,
    onComplete: propTypes.func.isRequired,
    onExtend: propTypes.func.isRequired,
}

export default TaskDetailModal;