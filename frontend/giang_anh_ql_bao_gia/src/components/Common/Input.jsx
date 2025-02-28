import PropTypes from "prop-types";
import React from "react";

const Input = ({ type, placeholder, value, onChange, }) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-control"
    />
);

Input.prototype = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default Input;