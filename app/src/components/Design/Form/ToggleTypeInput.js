import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import isVoid from "../../../core/helpers/isVoid";

const ToggleTypeInput = ({
    value,
    onChange,
    error,
    ...rest
}) => {
    const { t } = useTranslation();
    const [toggleValue, setToggleValue] = useState(isVoid(value) ? "SALE" : value);

    const handleClick = (e) => {
        setToggleValue(e.target.value);
    };

    // By clicking on label, you click on radio buttons (hidden for design purpose)
    return (
        <div className="mb-6">
            <label htmlFor="sale" className={`cursor-pointer py-2 px-4 rounded-l-full ${toggleValue === "SALE" ? "bg-green text-white" : "bg-gray text-black"}`} >{t("fields.sale")}</label>
            <input
                id="sale"
                className="hidden"
                value="SALE"
                type="radio"
                name="type"
                onClick={handleClick}
                onChange={onChange}
                {...rest}
            />
            <label htmlFor="rent" className={`cursor-pointer py-2 px-4 rounded-r-full ${toggleValue === "RENT" ? "bg-green text-white" : "bg-gray text-black"}`} >{t("fields.rent")}</label>
            <input
                id="rent"
                className="hidden"
                value="RENT"
                type="radio"
                name="type"
                onClick={handleClick}
                onChange={onChange}
                {...rest}
            />
            {error && <div className="">{error}</div>}
        </div>
    );
};

ToggleTypeInput.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
};

export default ToggleTypeInput;
