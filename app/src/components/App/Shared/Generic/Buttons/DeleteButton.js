import Button from "../../../../Design/Buttons/Button";
import { BiTrash } from "react-icons/bi";
import useMutation from "../../../../../core/hooks/useMutation";
import PropTypes from "prop-types";
import { useEffect } from "react";
import useRole from "../../../../../core/hooks/useRole";

const DeleteButton = ({ onSuccess, id, scope, disabled, children, className, ...rest }) => {
    const { isLoading, error, mutate } = useMutation();

    // Set path with correct scope and id
    const path = useRole(`${scope}/${id}`);

    const handleClick = () => {
        // Delete onClick
        mutate(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: "DELETE",
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
            color="delete"
            onClick={handleClick}
            disabled={disabled || isLoading}
            className={className}
            {...rest}>
            {children ? children : <BiTrash />}
        </Button>
    );
};

DeleteButton.propTypes = {
    onSuccess: PropTypes.func,
    id: PropTypes.number,
    scope: PropTypes.string,
    ...Button.propTypes,
};

export default DeleteButton;
