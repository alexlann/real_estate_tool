import PropTypes from "prop-types";

const Textarea = ({
    type = "text",
    label,
    name,
    onChange,
    value,
    error,
    children,
    disabled,
    ...rest
}) => {
    return (
        <>
            <textarea
                className={`box-border bg-gray rounded-md w-full h-22 px-4 py-2 ${error ? "border border-red" : ""}`}
                type={type}
                name={name}
                rows="5"
                value={value}
                disabled={disabled}
                onChange={onChange}
                {...rest}
            />
            {children}
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

Textarea.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default Textarea;
