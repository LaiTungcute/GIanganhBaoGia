import PropTypes from "prop-types";
import React from "react";

const Button = ({ onClick, children, className }) => (
    <button onClick={onClick} className={className} style={{ cursor: "pointer", padding: '10px', fontSize: '14px' }}>
        {children}
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string
}

export default Button;