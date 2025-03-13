import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import classNames from "classnames/bind";
import styles from './TaskList.module.scss';

import { TaskStatus } from "../../types/taskType";
import { Button, Col, Divider, Empty, Input, Row, Select, Space, Typography } from "antd";
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
    // mặc định xếp theo thời hạn tăng dần
    const [sortOrder, setSortOrder] = useState('deadline-asc');

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, []);

    useEffect(() => {
        // tạo một mảng tasks copy từ tasks ban đầu
        let result = [...tasks];

        // áp dụng tìm kiếm theo trạng tháithái
        if (statusFilter) {
            result = filterTasksByStatus(statusFilter);
        };

        // tìm kiếm theo từ khóa
        if (searchKeyword) {
            result = searchTasks(searchKeyword);
        };

        // hàm sắp xếp theo tasks
        result = sortTasks(result, sortOrder);

        setFilteredTasks(result);
    }, [tasks, statusFilter, searchKeyword, sortOrder, filterTasksByStatus, searchTasks]);

    const sortTasks = (tasksList, order) => {
        // tạo một bản sao của mảng tasks
        const sorted = [...tasksList];

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
    }

    // hàm render số lượng công việc
    const renderTaskCounter = () => {
        const totalTasks = tasks.length;
        const pending = tasks.filter(t => t.status === TaskStatus.PENDING).length;
        const completed = tasks.filter(t => t.status === TaskStatus.COMPLETED).length;
        const overdue = tasks.filter(t => t.status === TaskStatus.OVERDUE).length;
        const extended = tasks.filter(t => t.status === TaskStatus.EXTENDED).length;

        return (
            <Space className={cx('task-counter animate-fade-in')} style={{
                backgroundColor: '#daebf3',
                padding: '8px 16px',
                borderRadius: 100,
                boxShadow: '0 2 8 rgba(0 0 0 0.05)',
                flexWrap: 'wrap',
                justifyContent: 'center',
                lineHeight: 0.6,
            }}>
                <Text>Tổng: <Text strong>{totalTasks}</Text></Text>
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
            <div className={cx('task-list-loading')}>
                <Text>Đang tải danh sách công việc...</Text>
            </div>
        );
    };

    // ham xử lý tìm kiếm bằng keywork
    const handleSearch = (value) => {
        setSearchKeyword(value);
    }

    // hàm xử lý lọc theo trạng tháithái
    const handleStatusFilter = (value) => {
        setStatusFilter(value);
    }

    // hàm xử lý lọc khi bị thay đổi.
    const handleSortChange = (value) => {
        setSortOrder(value);
    }

    // hàm xử lý xóa tất cả bộ lọc
    const handleClearFilter = () => {
        setSearchKeyword('');
        setStatusFilter('');
        setSortOrder('deadline-asc');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('task-list-container animate-fade-in')}>
                <div className={cx('task-list-header')}>
                    <Title level={3} className={cx('task-list-title')} style={{ marginBottom: 0 }}>
                        Danh sách công việc
                        {renderTaskCounter()}
                    </Title>
                </div>

                <div className={cx('task-filters')}>
                    <Row gutter={16} align='middle'>
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
                                value={statusFilter}
                                onChange={handleSortChange}
                                allowClear
                                style={{ width: '100%' }}
                                suffixIcon={<FilterOutlined />}
                            >
                                <Option value=''>Tất cả</Option>
                                <Option value={TaskStatus.PENDING}>{TaskStatus.PENDING}</Option>
                                <Option value={TaskStatus.COMPLETED}>{TaskStatus.COMPLETED}</Option>
                                <Option value={TaskStatus.OVERDUE}>{TaskStatus.OVERDUE}</Option>
                                <Option value={TaskStatus.EXTENDED}>{TaskStatus.EXTENDED}</Option>
                            </Select>
                        </Col>

                        <Col xs={24} sm={8} md={6} lg={6}>
                            <Select
                                placeholder="Sắp xếp"
                                value={sortOrder}
                                onChange={handleStatusFilter}
                                allowClear
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

                        <Col xs={24} sm={8} md={6} lg={6} style={{ textAlign: 'center' }}>
                            <Button onClick={handleClearFilter}>
                                Xóa bộ lọc
                            </Button>
                        </Col>
                    </Row>
                </div>

                {
                    filteredTasks.length > 0 ? (
                        <Row gutter={[16, 16]} className={cx('task-list')}>
                            {
                                filteredTasks.map(task => (
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
                                ))
                            }
                        </Row>
                    ) : (
                        <Empty
                            description={
                                <Text>
                                    {
                                        tasks.length > 0 ? "Không tìm thấy công việc phù hợp với bộ lọc"
                                            : "Chưa có công việc nào. Hãy tạo công việc mới!"
                                    }
                                </Text>
                            }
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            className={cx('empty-tasks')}
                        />
                    )
                }
            </div>
        </div>
    )
}

TaskList.propTypes = {
    onView: propTypes.func,
    onEdit: propTypes.func,
    onDelete: propTypes.func,
    onComplete: propTypes.func,
    onExtend: propTypes.func,
}

export default TaskList;