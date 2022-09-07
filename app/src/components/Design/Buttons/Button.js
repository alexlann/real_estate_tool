import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Button.css";

const Button = ({
    children,
    onClick,
    className,
    color = "green",
    type = "button",
    size = "md",
    disabled = false,
    href,
}) => {
    const props = {
        className: `btn btn-${color} btn-${size} ${className}`,
        disabled: disabled,
    };
    if (href) {
        return (
            <Link to={href} {...props}>
                {children}
            </Link>
        );
    } else {
        return (
            <button type={type} onClick={onClick} {...props}>
                {children}
            </button>
        );
    }
};

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.oneOf(["button", "reset", "submit"]),
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["sm", "lg", "md"]),
    color: PropTypes.oneOf([
        "green",
        "delete",
        "edit",
        "like",
        "dislike",
        "gray",
        "outline",
        "black"
    ]),
};

export default Button;
