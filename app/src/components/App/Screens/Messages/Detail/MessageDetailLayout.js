import { Outlet, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useRole from "../../../../../core/hooks/useRole";
import Alert from "../../../../Design/Alert";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const MessageDetailLayout = () => {
    const { id } = useParams();
    const path = useRole("messages");

    const {
        isLoading,
        error,
        invalidate,
        data: message,
    } = useFetch(`/${path}/${id}`);

    const handleUpdate = () => {
        invalidate();
    };

    if (error) {
        return <Alert color="red">{error}</Alert>;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return <Outlet context={{ message, onMessageUpdate: handleUpdate }} />;
};

export default MessageDetailLayout;
