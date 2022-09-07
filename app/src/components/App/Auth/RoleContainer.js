import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

const RoleContainer = ({ roles = [], children }) => {
    const {
        auth: { user },
    } = useAuthContext();

    if (!roles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default RoleContainer;
