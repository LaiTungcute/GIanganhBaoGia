import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import classNames from "classnames/bind";
import styles from './TaskList.module.scss';

import { TaskStatus } from "../../types/taskType";
import { Button, Col, Divider, Empty, Input, Row, Select, Space, Spin, Typography } from "antd";
import { useTaskContext } from "../../context/taskContext";
import { FilterOutlined, SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { TaskCard } from "../TaskCard";

const cx = classNames.bind(styles);
const { Title, Text } = Typography;
const { Option } = Select;

const TaskList = ({ onView, onEdit, onDelete, onComplete, onExtend }) => {
    const { tasks, filterTasksByStatus, searchTasks } = useTaskContext();
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('deadline-asc'); // Default sort by deadline ascending

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        let result = [...tasks]; // Create a copy of tasks

        // Apply filters
        if (statusFilter) {
            result = filterTasksByStatus(statusFilter);
        }

        if (searchKeyword) {
            result = searchTasks(searchKeyword);
        }

        // Apply sorting
        result = sortTasks(result, sortOrder);

        // đổ dữ liệu vào filteredTasks
        setFilteredTasks(result);
    }, [tasks, statusFilter, searchKeyword, sortOrder, filterTasksByStatus, searchTasks]);

    const sortTasks = (taskList, order) => {
        const sorted = [...taskList]; // Create a copy to avoid mutating the original array

        switch (order) {
            case 'deadline-asc':
                return sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
            case 'deadline-desc':
                return sorted.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
            case 'created-asc':
                return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case 'created-desc':
                return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'title-asc':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'title-desc':
                return sorted.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return sorted;
        }
    };

    const handleSearch = (value) => {
        setSearchKeyword(value);
    };

    const handleStatusChange = (value) => {
        setStatusFilter(value);
    };

    const handleSortChange = (value) => {
        setSortOrder(value);
    };

    const clearFilters = () => {
        setSearchKeyword('');
        setStatusFilter('');
        setSortOrder('deadline-asc');
    };

    const renderTaskCounter = () => {
        const total = tasks.length;
        const pending = tasks.filter(t => t.status === TaskStatus.PENDING).length;
        const completed = tasks.filter(t => t.status === TaskStatus.COMPLETED).length;
        const overdue = tasks.filter(t => t.status === TaskStatus.OVERDUE).length;
        const extended = tasks.filter(t => t.status === TaskStatus.EXTENDED).length;

        return (
            <Space className={cx("task-counter animate-fade-in")} style={{
                backgroundColor: '#9ed0ff',
                padding: '10px',
                borderRadius: '20px',
            }}>
                <Text>Tổng: <Text strong>{total}</Text></Text>
                <Divider type="vertical" />
                <Text>Đang chờ: <Text strong style={{ color: '#faad14' }}>{pending}</Text></Text>
                <Divider type="vertical" />
                <Text>Hoàn thành: <Text strong style={{ color: '#52c41a' }}>{completed}</Text></Text>
                <Divider type="vertical" />
                <Text>Quá hạn: <Text strong style={{ color: '#f5222d' }}>{overdue}</Text></Text>
                <Divider type="vertical" />
                <Text>Gia hạn: <Text strong style={{ color: '#1890ff' }}>{extended}</Text></Text>
            </Space>
        );
    };

    if (loading) {
        return (
            <div className={cx("task-list-loading")}>
                <Spin size="large" />
                <Text>Đang tải danh sách công việc...</Text>
            </div>
        );
    }

    return (
        <div className={cx("task-list-container animate-fade-in")}>
            <div className={cx("task-list-header")} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '18px',
            }}>
                <Title level={3}>Danh sách công việc</Title>
                {renderTaskCounter()}
            </div>

            <div className={cx("task-filters")} style={{
                margin: '18px',
            }}>
                <Row gutter={16} align="middle">
                    <Col xs={24} sm={8} md={6} lg={6}>
                        <Input
                            placeholder="Tìm kiếm công việc"
                            value={searchKeyword}
                            onChange={(e) => handleSearch(e.target.value)}
                            allowClear
                            prefix={<SearchOutlined />}
                        />
                    </Col>

                    <Col xs={24} sm={8} md={6} lg={6}>
                        <Select
                            placeholder="Lọc theo trạng thái"
                            onChange={handleStatusChange}
                            value={statusFilter}
                            allowClear
                            style={{ width: '100%' }}
                            suffixIcon={<FilterOutlined />}
                        >
                            <Option value="">Tất cả</Option>
                            <Option value={TaskStatus.PENDING}>{TaskStatus.PENDING}</Option>
                            <Option value={TaskStatus.COMPLETED}>{TaskStatus.COMPLETED}</Option>
                            <Option value={TaskStatus.OVERDUE}>{TaskStatus.OVERDUE}</Option>
                            <Option value={TaskStatus.EXTENDED}>{TaskStatus.EXTENDED}</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={8} md={6} lg={6}>
                        <Select
                            placeholder="Sắp xếp"
                            onChange={handleSortChange}
                            value={sortOrder}
                            style={{ width: '100%' }}
                            suffixIcon={sortOrder.includes('-asc') ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                        >
                            <Option value="deadline-asc">Hạn sớm nhất</Option>
                            <Option value="deadline-desc">Hạn muộn nhất</Option>
                            <Option value="created-asc">Cũ nhất</Option>
                            <Option value="created-desc">Mới nhất</Option>
                            <Option value="title-asc">Tên (A-Z)</Option>
                            <Option value="title-desc">Tên (Z-A)</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} style={{ textAlign: 'right' }}>
                        <Button onClick={clearFilters}>Xóa bộ lọc</Button>
                    </Col>
                </Row>
            </div>

            {filteredTasks.length > 0 ? (
                <Row gutter={[16, 16]} className={cx("task-list")} style={{
                    margin: '12px',
                }}>
                    {filteredTasks.map(task => (
                        <Col xs={24} sm={24} md={12} lg={8} key={task.id}>
                            <TaskCard
                                task={task}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onComplete={onComplete}
                                onExtend={onExtend}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty
                    description={
                        <Text>
                            {tasks.length > 0
                                ? "Không tìm thấy công việc phù hợp với bộ lọc"
                                : "Chưa có công việc nào. Hãy tạo công việc mới!"
                            }
                        </Text>
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    className="empty-tasks"
                />
            )}
        </div>
    );
};

TaskList.propTypes = {
    onView: propTypes.func,
    onEdit: propTypes.func,
    onDelete: propTypes.func,
    onComplete: propTypes.func,
    onExtend: propTypes.func,
}

export default TaskList;