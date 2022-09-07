import PropTypes from "prop-types";

const Input = ({
    type = "text",
    label,
    name,
    onChange,
    value,
    error,
    children,
    disabled,
    className,
    ...rest
}) => {
    return (
        <>
            <input
                className={`bg-gray rounded-full w-full h-10 px-4 ${error ? "border border-red" : ""} ${className}`}
                type={type}
                name={name}
                id={name}
                disabled={disabled}
                value={value}
                onChange={onChange}
                {...rest}
            />
            {children}
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

Input.propTypes = {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Input;
