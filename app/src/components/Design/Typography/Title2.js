import PropTypes from "prop-types";

const Title2 = ({ children, className }) => {
    return <h2 className={`font-bold ${className}`}>{children}</h2>;
};

Title2.propTypes = {
    className: PropTypes.string,
};

export default Title2;
