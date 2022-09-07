import { useRef } from "react";
import Input from "./Input";
import PropTypes from "prop-types";
import { getImagePath } from "../../../core/helpers/api";
import isVoid from "../../../core/helpers/isVoid";

const FileInput = ({
    name,
    accept = "image/*",
    onChange,
    value,
    error,
    disabled,
    ...rest
}) => {
    const ref = useRef();

    const handleChange = (e) => {
        onChange({
            target: {
                name,
                value: e.target.files[0],
            },
        });
    };

    return (
        <>
            <div className="mb-3">
                {!isVoid(value) && (
                    <img
                        className="inline-block rounded-md w-20 h-20 object-cover mr-3"
                        src={
                            typeof value === "string"
                                ? getImagePath(value)
                                : URL.createObjectURL(value)
                        }
                        alt=""
                    />
                )}
                <label htmlFor={name} className={`inline-block rounded-md text-green text-2xl bg-gray w-20 h-20 text-center cursor-pointer ${error ? "border border-red" : ""}`} style={{lineHeight: "5rem"}}>+</label>
            </div>
            <input
                id={name}
                className="hidden"
                type="file"
                accept="image/*"
                name={name}
                ref={ref}
                disabled={disabled}
                onChange={handleChange}
                {...rest}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

FileInput.propTypes = {
    ...Input.propTypes,
    value: PropTypes.any,
};

export default FileInput;
