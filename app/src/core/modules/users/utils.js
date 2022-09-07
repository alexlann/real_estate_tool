import { UserRoles } from "./constants";

const formatName = (user) => {
    return `${user.firstname} ${user.lastname}`;
};

const isAdmin = (user) => {
    if(user) {
        return user.role === UserRoles.Admin;
    } else {
        return false;
    }
};

const isAgent = (user) => {
    if(user) {
        return user.role === UserRoles.Agent;
    } else {
        return false;
    }
};

const isUser = (user) => {
    if(user) {
        return user.role === UserRoles.User;
    } else {
        return false;
    }
};

export { formatName, isAdmin, isAgent, isUser };
