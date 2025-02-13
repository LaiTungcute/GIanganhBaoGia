import React from "react";
import classNames from "classnames/bind";
import styles from './Footer.modual.scss';

const cx = classNames.bind(styles);

const Foot = () => {
    return (
        <footer className={cx('wrapper')}>
            <strong>
                CÔNG TY TNHH VIỄN THÔNG - CÔNG NGHỆ GIANG ANH
            </strong>

            <div className={cx('contact')}>
                <strong style={{ padding: '0px' }}>Website:</strong>
                <a href="www.gianganh.vn">
                    www.gianganh.vn</a>
            </div>
        </footer>
    );
}

export default Foot;