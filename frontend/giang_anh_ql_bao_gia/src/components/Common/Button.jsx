import PropTypes from "prop-types";
import React from "react";

const Button = ({ onClick, children }) => (
    <button onClick={onClick} className="button">
        {children}
    </button>
);

Button.prototype = {
    onclick: PropTypes.func,
    children: PropTypes.element
}

export default Button;