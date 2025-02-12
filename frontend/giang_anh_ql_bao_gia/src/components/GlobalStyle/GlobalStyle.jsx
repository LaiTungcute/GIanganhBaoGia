import PropTypes from 'prop-types';
import './GlobalStyle.scss'

// GlobalStyle components chứa các style cho app
const GlobalStyle = ({ children }) => {
    return (
        children
    )
};

GlobalStyle.prototype = {
    children: PropTypes.element
}

export default GlobalStyle;