import PropTypes from "prop-types";

const Alert = ({ children, color = "red" }) => {
    return (
        <div className={`border rounded-md border-${color} text-${color} p-2 mt-2 max-w-sm text-center m-auto`} role="alert">
            {children}
        </div>
    );
};

Alert.propTypes = {
    color: PropTypes.oneOf(["red", "green"]),
};

export default Alert;
