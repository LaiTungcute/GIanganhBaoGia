import React from "react";
import propTypes from "prop-types";
import classNames from "classnames/bind";
import styles from './TaskCard.module.scss';
import { Badge, Button, Card, Progress, Space, Tag, Tooltip, Typography } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined, QuestionCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { TaskStatus } from "../../types/taskType";
import { daysUntilDeadline, formatCurrency, formatDateInput, formatDateTime, formatRelativeTime, isOverdue } from "../../utils/dateUtils";

const { Text, Title } = Typography;
const cx = classNames.bind(styles);

const TaskCard = ({ task, onView, onEdit, onDelete, onComplete, onExtend }) => {
    const getStatusTag = () => {
        switch (task.status) {
            case TaskStatus.PENDING:
                return <Tag color="gold" className="status-tag"><ClockCircleOutlined /> {task.status}</Tag>;
            case TaskStatus.COMPLETED:
                return <Tag color="green" className="status-tag"><CheckCircleOutlined /> {task.status}</Tag>;
            case TaskStatus.OVERDUE:
                return <Tag color="red" className="status-tag"><WarningOutlined /> {task.status}</Tag>;
            case TaskStatus.EXTENDED:
                return <Tag color="blue" className="status-tag"><QuestionCircleOutlined /> {task.status}</Tag>;
            default:
                return <Tag>{task.status}</Tag>;
        }
    };

    // Calculate progress based on time
    const calculateProgress = () => {
        if (task.status === TaskStatus.COMPLETED) return 100;
        if (task.status === TaskStatus.OVERDUE) return 100;

        const now = new Date();
        const created = new Date(task.createdAt);
        const deadline = new Date(task.deadline);

        // tổng thể thời gian = hạn - tạo
        const totalDuration = deadline - created;
        // thời gian 
        const elapsed = now - created;

        let progress = Math.floor((elapsed / totalDuration) * 100);
        progress = Math.min(Math.max(progress, 0), 100); // Keep between 0-100

        return progress;
    };

    const getProgressStatus = () => {
        if (task.status === TaskStatus.COMPLETED) return "success";
        if (task.status === TaskStatus.OVERDUE) return "exception";
        if (isOverdue(task.deadline)) return "exception";
        const daysLeft = daysUntilDeadline(task.deadline);
        return daysLeft <= 1 ? "warning" : "active";
    };

    return (
        <Card
            className={cx(`task-card ${task.status.toLowerCase()}-card animate-scale-in`)}
            hoverable
            actions={[
                <Tooltip title="Xem chi tiết">
                    <InfoCircleOutlined key="view" onClick={() => onView(task)} />
                </Tooltip>,
                <Tooltip title="Chỉnh sửa">
                    <EditOutlined key="edit" onClick={() => onEdit(task)} />
                </Tooltip>,
                <Tooltip title="Xóa">
                    <DeleteOutlined key="delete" onClick={() => onDelete(task.id)} />
                </Tooltip>,
            ]}
        >
            <div className={cx("task-card-content")}>
                <div className={cx("task-header")}>
                    <div className={cx("task-title")}>
                        <Badge dot={task.status === TaskStatus.PENDING} color={isOverdue(task.deadline) ? "red" : "blue"}>
                            <Title level={4} className={cx("task-title-text")} ellipsis={{ tooltip: task.title }} >
                                {task.title.length > 20 ? `${task.title.substring(0, 50)}...` : task.title}
                            </Title>
                        </Badge>
                    </div>
                    <div className={cx("task-status")}>
                        {getStatusTag()}
                    </div>
                </div>

                <div className={cx("task-body")}>
                    <Text type="secondary" ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}>
                        {task.description || "Không có mô tả"}
                    </Text>

                    <div className={cx("task-info")}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            <Text strong>Người thực hiện: <Text>{task.assignedTo || "Chưa phân công"}</Text></Text>
                            <Text strong>Ngày tạo: <Text>{formatDateTime(task.createdAt)}</Text></Text>
                            <Text strong>Hạn hoàn thành: <Text type={isOverdue(task.deadline) ? "danger" : ""}>{formatDateTime(task.deadline)}</Text></Text>

                            <Text type={isOverdue(task.deadline) ? "danger" : "warning"}>
                                {formatRelativeTime(task.deadline)}
                            </Text>

                            {task.status === TaskStatus.COMPLETED && (
                                <Text strong>Hoàn thành lúc: <Text type="success">{formatDateTime(task.completedAt)}</Text></Text>
                            )}

                            {task.status === TaskStatus.EXTENDED && (
                                <Text strong>Gia hạn đến: <Text type="warning">{formatDateTime(task.extensionDate)}</Text></Text>
                            )}

                            {task.penalty > 0 && (
                                <Text strong type="danger">Phạt: {formatCurrency(task.penalty)}</Text>
                            )}
                        </Space>
                    </div>

                    <div className={cx("task-progress")}>
                        <Progress
                            percent={calculateProgress()}
                            status={getProgressStatus()}
                            size="small"
                            strokeColor={
                                task.status === TaskStatus.COMPLETED ? "#52c41a" :
                                    task.status === TaskStatus.OVERDUE ? "#f5222d" :
                                        isOverdue(task.deadline) ? "#f5222d" : undefined
                            }
                        />
                    </div>
                </div>

                <div className={cx("task-footer")}>
                    {task.status === TaskStatus.PENDING && (
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
                    )}

                    {task.status === TaskStatus.OVERDUE && (
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
                    )}
                </div>
            </div>
        </Card>
    );
};

TaskCard.propTypes = {
    task: propTypes.object.isRequired,
    onView: propTypes.func.isRequired,
    onEdit: propTypes.func.isRequired,
    onDelete: propTypes.func.isRequired,
    onComplete: propTypes.func.isRequired,
    onExtend: propTypes.func.isRequired,
}

export default TaskCard;