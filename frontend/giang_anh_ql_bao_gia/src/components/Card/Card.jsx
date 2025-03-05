import propTypes from "prop-types";
import classNames from "classnames/bind";
import { Card } from 'antd';

import styles from './CardHome.module.scss';

const cx = classNames.bind(styles);

const CardHome = ({ totalItemProducts, totalItemQuotes }) => {

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
                }}>Tổng số sản phẩm: <span style={{color: '#d30000', fontWeight: 600}}>{totalItemProducts}</span></p>
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
                }}>Tổng số báo giá: <span style={{color: '#d30000', fontWeight: 600}}>{totalItemQuotes}</span></p>
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