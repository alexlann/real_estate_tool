import PropTypes from "prop-types";

const Spinner = ({ color = "green" }) => {
    return <div className={`spinner-border text-${color}`} role="status"></div>;
};

Spinner.propTypes = {
    color: PropTypes.oneOf(["green", "light-green", "red"]),
};

export default Spinner;
