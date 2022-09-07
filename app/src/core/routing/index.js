const AuthRoutes = {
    Index: "/auth",
    Login: "/auth/login",
    Register: "/auth/register",
};

const PropertyRoutes = {
    Index: "/properties",
    New: "/properties/new",
    Detail: "/properties/:id",
    Edit: "/properties/:id/edit",
};

const MessageRoutes = {
    Index: "/messages",
    New: "/messages/new",
    Detail: "/messages/:id",
};

const LikeRoutes = {
    Index: "/likes",
    New: "/likes/new",
    Edit: "/likes/:id/edit",
};

const CategoryRoutes = {
    Index: "/categories",
    New: "/categories/new",
    Edit: "/categories/:id/edit",
};

const AgencyRoutes = {
    Index: "/agencies",
    New: "/agencies/new",
    Edit: "/agencies/:id/edit",
};

const UserRoutes = {
    Index: "/users",
    New: "/users/new",
    Edit: "/users/:id/edit",
};

const DashboardRoutes = {
    Index: "/dashboard"
};

// replaces : values with values from object
// e.g. route('/properties/:id', { id : 9 }) -> /properties/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach((key) => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export { AuthRoutes, PropertyRoutes, UserRoutes, CategoryRoutes, MessageRoutes, LikeRoutes, AgencyRoutes, DashboardRoutes };
