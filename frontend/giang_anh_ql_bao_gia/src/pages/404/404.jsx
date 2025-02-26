import React from 'react';
import classNames from 'classnames/bind';
import { Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import styles from './404.module.scss';

const cx = classNames.bind(styles);

const { Title, Paragraph } = Typography;

const NotFound = () => {
  return (
    <div className={cx('not-found-container')}>
      <div className={cx('stars')}></div>
      <Space direction="vertical" align="center">
        <Title level={1} className={cx('not-found-title')}>
          404
        </Title>
        <Title level={3} style={{ color: '#fff', marginTop: 0 }}>
          Oops! Bạn đang tìm kiếm điều gì?
        </Title>
        <Paragraph style={{ color: '#d9d9d9', fontSize: '18px' }}>
          Trang này không tồn tại hoặc đang trốn đâu đó trong vũ trụ!
        </Paragraph>
        <Link to="/">
          <Button type="primary" size="large" className={cx('home-button')}>
            Quay lại
          </Button>
        </Link>
      </Space>
    </div>
  );
};

export default NotFound;