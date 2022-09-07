import PropTypes from "prop-types";
import "./Card.css";

const Card = ({
    hasImg = false,
    children,
    className
}) => {

    // Add padding if there is no img
    const props = {
        className: `${className} rounded-2xl shadow mb-4 hover:bg-light-gray ${!hasImg ? "py-2.5 px-4" : undefined}`,
    };

    return (
        <div {...props}>
            {children}
        </div>
    );
};

Card.propTypes = {
    hasImg: PropTypes.bool,
    className: PropTypes.string,
};

export default Card;
