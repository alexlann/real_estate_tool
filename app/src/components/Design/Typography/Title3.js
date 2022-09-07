import PropTypes from "prop-types";

const Title3 = ({ children, className }) => {
    return <h3 className={`${className} text-xl text-green font-bold`}>{children}</h3>;
};

Title3.propTypes = {
    className: PropTypes.string,
};

export default Title3;
