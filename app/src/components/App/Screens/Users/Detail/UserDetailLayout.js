import { Outlet, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useRole from "../../../../../core/hooks/useRole";
import Alert from "../../../../Design/Alert";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const UserDetailLayout = () => {
    const { id } = useParams();
    const path = useRole("users");

    const {
        isLoading,
        error,
        invalidate,
        data: user,
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

    return <Outlet context={{ user, onUserUpdate: handleUpdate }} />;
};

export default UserDetailLayout;
