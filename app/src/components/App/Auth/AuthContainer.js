import { Navigate, useLocation } from "react-router-dom";
import { AuthRoutes } from "../../../core/routing";
import { useAuthContext } from "./AuthProvider";

const AuthContainer = ({ children }) => {
    const { auth } = useAuthContext();
    const location = useLocation();

    if (!auth) {
        return (
            <Navigate
                to={AuthRoutes.Login}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};

export default AuthContainer;
