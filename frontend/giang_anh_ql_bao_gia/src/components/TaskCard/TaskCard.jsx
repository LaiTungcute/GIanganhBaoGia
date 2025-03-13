import React from "react";
import classNames from "classnames/bind";
import styles from './TaskCard.module.scss';
import { Badge, Button, Card, Progress, Space, Tag, Tooltip, Typography } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined, QuestionCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { TaskStatus } from "../../types/taskType";
import { calculatePenalty, daysUntilDeadline, formatCurrency, formatDateInput, formatDateTime, formatRelativeTime, isOverdue } from "../../utils/dateUtils";

const { Text, Title } = Typography;
const cx = classNames.bind(styles);

const TaskCard = ({ onView, onEdit, onDelete, onComplete, onExtend, task }) => {
    // hàm lấy tag status
    const getStatusTag = () => {
        switch (task.status) {
            case TaskStatus.PENDING:
                return <Tag
                    color="gold"
                    className={cx('status-tag')}
                >
                    <ClockCircleOutlined />
                    {task.status}
                </Tag>
            case TaskStatus.COMPLETED:
                return <Tag
                    color="green"
                    className={cx('status-tag')}
                >
                    <CheckCircleOutlined />
                    {task.status}
                </Tag>
            case TaskStatus.OVERDUE:
                return <Tag
                    color="red"
                    className={cx('status-tag')}
                >
                    <WarningOutlined />
                    {task.status}
                </Tag>
            case TaskStatus.EXTENDED:
                return <Tag
                    color="blue"
                    className={cx('status-tag')}
                >
                    <QuestionCircleOutlined />
                    {task.status}
                </Tag>
            default:
                return <Tag>{task.status}</Tag>;
        }
    }

    // hàm tính độ tiến triển công việc
    const getProgressStatus = () => {
        if (task.status === TaskStatus.COMPLETED) {
            return 'success';
        }
        if (task.status === TaskStatus.OVERDUE) {
            return 'exception';
        }
        if (isOverdue(task.deadline)) {
            return 'exception';
        }

        const daysLeft = daysUntilDeadline(task.deadline);
        return daysLeft <= 1 ? 'warning' : 'active';
    }

    // hàm tinh tiến độ dựa trên thời gian
    const calculateProgress = () => {
        if (task.status === TaskStatus.COMPLETED) return 100;
        if (task.status === TaskStatus.OVERDUE) return 100;

        const now = new Date();
        const created = new Date(task.createdAt);
        const deadline = new Date(task.deadline);

        // tổng thể thời gian = hạn - tạo
        const totalDuration = deadline - created;
        // thời gian đã trôi qua = hiện tại - tạo
        const elapsed = now - created;

        let progress = Math.floor((elapsed / totalDuration) * 100);
        progress = Math.min(Math.max(progress, 0), 100);

        return progress;
    }

    return (
        <div className={cx('wrapper')}>
            <Card
                className={cx(`task-card ${task.status.toLowerCase()} animate-scale-in`)}
                bordered={true}
                hoverable
                actions={[
                    <Tooltip title="Xem chi tiết">
                        <InfoCircleOutlined key='view' onClick={() => onView(task)} />
                    </Tooltip>,

                    <Tooltip title="Chỉnh sửa">
                        <EditOutlined key='edit' onClick={() => onEdit(task)} />
                    </Tooltip>,

                    <Tooltip title="Xóa">
                        <DeleteOutlined key='delete' onClick={() => onDelete(task)} />
                    </Tooltip>,
                ]}
            >
                <div className={cx('task-card-content')}>
                    <div className={cx('task-header')}>
                        <div className={cx('task-title')}>
                            <Badge dot={task.status === TaskStatus.PENDING} color={isOverdue(task.deadline) ? 'red' : 'blue'}>
                                <Title level={4} className={cx('task-title-text')} ellipsis={{ tooltip: task.title }}>
                                    {task.title}
                                </Title>
                            </Badge>
                        </div>

                        <div className={cx('task-status')}>
                            {getStatusTag()}
                        </div>
                    </div>

                    <div className={cx('task-body')}>
                        <Text type="secondary" ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}>
                            {task.description || 'Không có mô tả'}
                        </Text>

                        <div className={cx('task-info')}>
                            <Space direction="vertical" size='small' style={{ width: '100%' }}>
                                <Text strong>
                                    Người thực hiện: <Text strong>
                                        {task.assignee || 'Chưa có người thực hiện'}
                                    </Text>
                                </Text>

                                <Text strong>
                                    Ngày tạo: <Text>{formatDateInput(task.createdAt)}</Text>
                                </Text>

                                <Text strong>
                                    Hạn hoàn thành: <Text type={isOverdue(task.deadline) ? 'danger' : ''}>{formatDateInput(task.deadline)}</Text>
                                </Text>

                                <Text strong type={isOverdue(task.deadline) ? 'danger' : 'warning'}>
                                    {formatRelativeTime(task.deadline)}
                                </Text>

                                {
                                    task.status === TaskStatus.COMPLETED && (
                                        <Text strong>
                                            Hoàn thành lúc: <Text type="success">{formatDateTime(task.completedAt)}</Text>
                                        </Text>
                                    )
                                }

                                {
                                    task.status === TaskStatus.EXTENDED && (
                                        <Text strong>
                                            Gia hạn đến: <Text type="warning">{formatDateTime(task.extensionDate)}</Text>
                                        </Text>
                                    )
                                }

                                {
                                    task.penalty && (
                                        <Text strong type="danger">
                                            Phạt: {formatCurrency(task.penalty)}
                                        </Text>
                                    )
                                }
                            </Space>
                        </div>

                        <div className={cx('task-progress')}>
                            <Progress
                                percent={calculateProgress()}
                                size="small"
                                status={getProgressStatus()}
                                strokeColor={
                                    task.status === TaskStatus.COMPLETED ? '#52c41a' :
                                        task.status === TaskStatus.OVERDUE ? '#f5222d' :
                                            isOverdue(task.deadline) ? '#f5222d' : undefined
                                }
                            />
                        </div>
                    </div>

                    <div className={cx('task-footer')}>
                        {
                            task.status === TaskStatus.PENDING && (
                                <Space>
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={() => onComplete(task.id)}
                                    >
                                        Hoàn thành
                                    </Button>

                                    <Button
                                        type="default"
                                        size="small"
                                        onClick={() => onExtend(task)}
                                    >
                                        Gia hạn
                                    </Button>
                                </Space>
                            )
                        }

                        {
                            task.status === TaskStatus.OVERDUE && (
                                <Space>
                                    <Button
                                        type="primary"
                                        danger
                                        size="small"
                                        onClick={() => onComplete(task.id)}
                                    >
                                        Đánh dấu hoàn thành
                                    </Button>

                                    <Button
                                        type="default"
                                        size="small"
                                        onClick={() => onExtend(task)}
                                    >
                                        Gia hạn
                                    </Button>
                                </Space>
                            )
                        }
                    </div>
                </div>
            </Card>
        </div>
    )
};

export default TaskCard;