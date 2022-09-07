import PropTypes from "prop-types";

const Select = ({ name, options = [], onChange, value, error, disabled, className }) => {
    return (
        <>
            <select
                className={`bg-gray rounded-full w-full h-10 px-2 border-r-8 border-gray ${error ? "border border-red" : ""} ${className}`}
                name={name}
                disabled={disabled}
                value={String(value) || ""}
                onChange={onChange}>
                <option></option>
                {options &&
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
            label: PropTypes.string,
        })
    ),
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default Select;
