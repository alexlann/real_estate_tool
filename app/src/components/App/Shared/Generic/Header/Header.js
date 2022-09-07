import {
    route,
    AgencyRoutes,
    CategoryRoutes,
    DashboardRoutes,
    LikeRoutes,
    MessageRoutes,
    PropertyRoutes,
    UserRoutes,
} from "../../../../../core/routing";
import { useAuthContext, useUser } from "../../../Auth/AuthProvider";
import NavBar from "../../../../Design/NavBar/NavBar";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { isAdmin, isAgent, isUser } from "../../../../../core/modules/users/utils";

const Header = () => {
    const { t } = useTranslation();
    const user = useUser();
    const location = useLocation();
    const { logout } = useAuthContext();

    // default routes
    let items = [
        {
            href: PropertyRoutes.Index,
            isActive: location.pathname.includes(PropertyRoutes.Index),
            label: t("navigation.properties"),
        },
    ];
    
    // user only routes
    if (isUser(user)) {
        items = [
            ...items,
            {
                href: LikeRoutes.Index,
                isActive: location.pathname.includes(LikeRoutes.Index),
                label: t("navigation.likes"),
            },
            {
                href: route(UserRoutes.Edit, {id: user.id}),
                isActive: location.pathname.includes(UserRoutes.Index),
                label: t("navigation.profile"),
            },
        ];
    }

    // agent only routes
    if (isAgent(user)) {
        items = [
            {
                href: DashboardRoutes.Index,
                isActive: location.pathname.includes(DashboardRoutes.Index),
                label: t("navigation.dashboard"),
            },
            ...items,
            {
                href: MessageRoutes.Index,
                isActive: location.pathname.includes(MessageRoutes.Index),
                label: t("navigation.messages"),
            },
            {
                href: UserRoutes.Index,
                isActive: location.pathname.includes(UserRoutes.Index),
                label: t("navigation.users"),
            },
            {
                href: route(AgencyRoutes.Edit, { id:user.agency.id }),
                isActive: location.pathname.includes(AgencyRoutes.Index),
                label: t("navigation.profile"),
            },
        ];
    }
    
    // admin only routes
    if (isAdmin(user)) {
        items = [
            ...items,
            {
                href: UserRoutes.Index,
                isActive: location.pathname.includes(UserRoutes.Index),
                label: t("navigation.users"),
            },
            {
                href: AgencyRoutes.Index,
                isActive: location.pathname.includes(AgencyRoutes.Index),
                label: t("navigation.agencies"),
            },
            {
                href: CategoryRoutes.Index,
                isActive: location.pathname.includes(CategoryRoutes.Index),
                label: t("navigation.categories"),
            },
        ];
    }

    return <NavBar onLogout={logout} navItems={items} />;
};

export default Header;
