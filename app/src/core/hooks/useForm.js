import { useCallback, useEffect, useState, useRef } from "react";
import { getValidationErrors } from "../helpers/validation";

const useForm = (initialSchema, initialData) => {
    const [isTouched, setIsTouched] = useState(false);
    const [values, setValues] = useState({ ...initialData });
    const [errors, setErrors] = useState({});
    // we don't listen to schema changes
    const schemaRef = useRef(initialSchema);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const validate = useCallback(async (values, onSuccess) => {
        try {
            const isValid = await schemaRef.current.validate(values, {
                abortEarly: false,
            });

            if (isValid) {
                // clear errors
                setErrors({});
                // call onSuccess callback if exists
                if (onSuccess) {
                    onSuccess();
                }
            }
        } catch (errors) {
            setErrors(getValidationErrors(errors));
        }
    }, []);

    // wrapper method for handling submit
    // this way, we don't have to pass a success callback in useForm constructor
    const handleSubmit = (callback) => async (e) => {
        e.preventDefault();
        setIsTouched(true);
        await validate(values, () => {
            callback(values);
        });
    };

    useEffect(() => {
        if (isTouched) {
            validate(values);
        }
    }, [validate, isTouched, values]);

    return {
        isTouched,
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;
