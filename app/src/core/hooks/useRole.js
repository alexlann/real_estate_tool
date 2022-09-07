import { useUser } from "../../components/App/Auth/AuthProvider";
import { isAdmin, isAgent } from "../modules/users/utils";

const useRole = (path) => {
    const user = useUser();

    if(user) {
        if(isAdmin(user)) {
            return `admin/${path}`;
        } else if (isAgent(user)) {
            return `agent/${path}`;
        } else {
            return `user/${path}`;
        }
    } else {
        return path;
    }
}

export default useRole;
