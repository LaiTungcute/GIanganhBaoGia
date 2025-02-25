import propTypes from "prop-types";
import classNames from "classnames/bind";
import { Card } from 'antd';

import styles from './CardHome.module.scss';

const cx = classNames.bind(styles);

const CardHome = ({ totalItemProducts }) => {

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
                    width: 380,
                }}
            >
                <p style={{
                    fontSize: '16px'
                }}>Tổng số sản phẩm: {totalItemProducts}</p>
            </Card>

            <Card
                title={
                    <span style={{
                        fontWeight: 'bold'
                    }}>Báo giá</span>
                }
                variant="borderless"
                style={{
                    width: 380,

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
                    width: 380,
                }}
            >
                <p style={{
                    fontSize: '16px'
                }}>Thống kê: 
                <strong> Coming soon...</strong>
                </p>
            </Card>
        </div>
    );
}

CardHome.propTypes = {
    totalItemProducts: propTypes.number
}

export default CardHome;