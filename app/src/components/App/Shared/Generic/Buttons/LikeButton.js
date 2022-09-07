import Button from "../../../../Design/Buttons/Button";
import { FaHeart } from "react-icons/fa";
import useMutation from "../../../../../core/hooks/useMutation";
import PropTypes from "prop-types";
import { useEffect } from "react";
import useRole from "../../../../../core/hooks/useRole";
import useFetch from "../../../../../core/hooks/useFetch";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import Alert from "../../../../Design/Alert";

const LikeButton = ({ onSuccess=undefined, id, ...rest }) => {
    const { mutateIsLoading, mutateError, mutate } = useMutation();

    const path = useRole("likes");
    
    const {
        isLoading: fetchIsLoading,
        data: likes,
        error: fetchError,
        invalidate,
    } = useFetch(`/${path}`);

    const likePath = useRole(`likes/${id}`);

    const handleClick = () => {
        // if property is being liked
        if(Object.values(likes).filter(like => like.property.id === id).length === 0) {
            // post like
            mutate(`${process.env.REACT_APP_API_URL}/${likePath}`, {
                method: "POST",
                onSuccess: () => {
                    onSuccess && onSuccess();
                    invalidate();
                },
            });
        // else if property is being disliked
        } else {
            // get id of like via propertyId
            const likeId = Object.values(likes).filter(like => like.property.id === id)[0].id;

            // construct path
            const dislikePath = `user/likes/${likeId}`;

            // delete like
            mutate(`${process.env.REACT_APP_API_URL}/${dislikePath}`, {
                method: "DELETE",
                onSuccess: () => {
                    onSuccess && onSuccess();
                    invalidate();
                },
            });
        }
    };

    // Show possible error via window alert
    useEffect(() => {
        if (mutateError) {
            window.alert(mutateError);
        }
    }, [mutateError]);

    if (fetchIsLoading) {
        return <LoadingIndicator />;
    }

    if (fetchError) {
        return <Alert color="red">{fetchError}</Alert>;
    }

    // Change color of button if property is already liked
    return (
        <Button
            color={Object.values(likes).filter(like => like.property.id === id).length === 0 ? "like" : "dislike"}
            onClick={handleClick}
            disabled={mutateIsLoading}
            {...rest}
        >
            <FaHeart />
        </Button>
    );
};

LikeButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    ...Button.propTypes,
};

export default LikeButton;
