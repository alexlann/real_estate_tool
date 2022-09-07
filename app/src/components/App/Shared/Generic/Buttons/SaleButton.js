import Button from "../../../../Design/Buttons/Button";
import useMutation from "../../../../../core/hooks/useMutation";
import PropTypes from "prop-types";
import { useEffect } from "react";
import useRole from "../../../../../core/hooks/useRole";
import { useTranslation } from "react-i18next";

const SaleButton = ({ onSuccess, property, ...rest }) => {
    const { t } = useTranslation();
    const path = useRole(`properties/${property.id}`);
    const { isLoading, error, mutate } = useMutation();

    const handleClick = () => {
        // Toggle isSold
        const data = {
            "isSold": !property.isSold
        }

        // Update data
        mutate(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: "PATCH",
            data,
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    useEffect(() => {
        if (error) {
            window.alert(error);
        }
    }, [error]);

    return (
        <Button
            color={property.isSold ? "outline" : "green"}
            onClick={handleClick}
            disabled={isLoading}
            {...rest}>
            {/* Change text on button, taking into account if property is for sale or for rent and if property is sold/rented */}
            {property.isSold ? (property.type === "SALE" ? t("buttons.sold") : t("buttons.rented")) : (property.type === "SALE" ? t("buttons.sale") : t("buttons.rent"))}
        </Button>
    );
};

SaleButton.propTypes = {
    onSuccess: PropTypes.func,
    ...Button.propTypes,
};

export default SaleButton;
