import classNames from "classnames/bind";
import { Card } from 'antd';

import styles from './CardHome.module.scss';

const cx = classNames.bind(styles);

const CardHome = () => {
    return (
        <div className={cx('wrapper')}>
            <Card
                title={
                    <span style={{
                        fontWeight: 'bold'
                    }}>Sản phẩm</span>
                }
                variant="borderless"
                style={{
                    width: 350,
                }}
            >
                <p style={{
                    fontSize: '16px'
                }}>Tổng số sản phẩm: 520</p>
            </Card>

            <Card
                title={
                    <span style={{
                        fontWeight: 'bold'
                    }}>Báo giá</span>
                }
                variant="borderless"
                style={{
                    width: 350,

                }}
            >
                <p style={{
                    fontSize: '16px'
                }}>Tổng số báo giá: 20</p>
            </Card>

            <Card
                title={
                    <span style={{
                        fontWeight: 'bold'
                    }}>Biểu đồ</span>
                }
                variant="borderless"
                style={{
                    width: 350,
                }}
            >
                <p style={{
                    fontSize: '16px'
                }}>Thống kê</p>
            </Card>
        </div>
    );
}

export default CardHome;