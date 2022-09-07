const FormGroup = ({ children, ...props }) => {
    return <div className="mb-3" {...props}>{children}</div>;
};

export default FormGroup;
