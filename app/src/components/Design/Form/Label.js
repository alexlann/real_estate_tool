import PropTypes from "prop-types";

const Label = ({ htmlFor, children }) => {
    return (
        <label className="block ml-2 text-sm" htmlFor={htmlFor}>
            {children}
        </label>
    );
};

Label.propTypes = {
    htmlFor: PropTypes.string,
};

export default Label;
