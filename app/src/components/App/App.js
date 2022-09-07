import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import {
    AgencyRoutes,
    AuthRoutes,
    CategoryRoutes,
    DashboardRoutes,
    LikeRoutes,
    MessageRoutes,
    PropertyRoutes,
    UserRoutes,
} from "../../core/routing";
import AppLayout from "./AppLayout";
import AuthProvider from "./Auth/AuthProvider";
import LoginScreen from "./Auth/Login/LoginScreen";
import OnboardingLayout from "./Auth/OnboardingLayout";
import AuthContainer from "./Auth/AuthContainer";
import RoleContainer from "./Auth/RoleContainer";
import { UserRoles } from "../../core/modules/users/constants";
import UsersLayout from "./Screens/Users/UsersLayout";
import UsersOverviewScreen from "./Screens/Users/Overview/UsersOverviewScreen";
import UserAddScreen from "./Screens/Users/Add/UserAddScreen";
import UserDetailLayout from "./Screens/Users/Detail/UserDetailLayout";
import UserEditScreen from "./Screens/Users/Edit/UserEditScreen";
import CategoriesLayout from "./Screens/Categories/CategoriesLayout";
import CategoriesOverviewScreen from "./Screens/Categories/Overview/CategoriesOverviewScreen";
import CategoryAddScreen from "./Screens/Categories/Add/CategoryScreen";
import AgenciesLayout from "./Screens/Agencies/AgenciesLayout";
import AgenciesOverviewScreen from "./Screens/Agencies/Overview/AgenciesOverviewScreen";
import AgencyAddScreen from "./Screens/Agencies/Add/AgencyAddScreen";
import AgencyEditScreen from "./Screens/Agencies/Edit/AgencyEditScreen";
import PropertiesLayout from "./Screens/Properties/PropertiesLayout";
import PropertiesOverviewScreen from "./Screens/Properties/Overview/PropertiesOverviewScreen";
import PropertyAddScreen from "./Screens/Properties/Add/PropertyAddScreen";
import PropertyDetailLayout from "./Screens/Properties/Detail/PropertyDetailLayout";
import PropertyDetailScreen from "./Screens/Properties/Detail/PropertyDetailScreen";
import PropertyEditScreen from "./Screens/Properties/Edit/PropertyEditScreen";
import LikesLayout from "./Screens/Likes/LikesLayout";
import LikesOverviewScreen from "./Screens/Likes/Overview/LikesOverviewScreen";
import MessagesLayout from "./Screens/Messages/MessagesLayout";
import MessagesOverviewScreen from "./Screens/Messages/Overview/MessagesOverviewScreen";
import MessageAddScreen from "./Screens/Messages/Add/MessageAddScreen";
import MessageDetailLayout from "./Screens/Messages/Detail/MessageDetailLayout";
import MessageDetailScreen from "./Screens/Messages/Detail/MessageDetailScreen";
import RegisterScreen from "./Auth/Register/RegisterScreen";
import AppContainer from "../Design/Container/AppContainer";
import DashboardScreen from "./Screens/Dashboard/DashboardScreen";
import DashboardLayout from "./Screens/Dashboard/DashboardLayout";
import CategoryEditScreen from "./Screens/Categories/Edit/CategoryEditScreen";

const App = () => {
    
    return (
        <AppContainer>
            <AuthProvider>
                <Routes>
                    {/* AuthRoutes */}
                    <Route path={AuthRoutes.Index} element={<OnboardingLayout />}>
                        <Route path={AuthRoutes.Login} element={<LoginScreen />} />
                        <Route path={AuthRoutes.Register} element={<RegisterScreen />} />
                        {/* Redirect */}
                        <Route
                            path="*"
                            element={<Navigate to={AuthRoutes.Login} />}
                        />
                    </Route>
                    {/* PropertyRoutes */}
                    <Route
                        path={PropertyRoutes.Index}
                        element={<PropertiesLayout />}>
                        <Route index element={<PropertiesOverviewScreen />} />
                        <Route
                            path={PropertyRoutes.Detail}
                            element={<PropertyDetailLayout />}>
                            <Route index element={<PropertyDetailScreen />} />
                        </Route>
                        {/* Redirect */}
                        <Route
                            path="*"
                            element={<Navigate to={PropertyRoutes.Index} />}
                        />
                    </Route>
                    {/* Logged in */}
                    <Route
                        element={
                            <AuthContainer>
                                <AppLayout />
                            </AuthContainer>
                        }>
                        {/* Routes for User, Agent and Admin */}
                        <Route
                            element={
                                <RoleContainer roles={[UserRoles.User, UserRoles.Agent, UserRoles.Admin]}>
                                    <Outlet />
                                </RoleContainer>
                            }>
                            {/* UserRoutes */}
                            <Route
                                path={UserRoutes.Index}
                                element={<UsersLayout />}>
                                <Route
                                    path={UserRoutes.Detail}
                                    element={<UserDetailLayout />}>
                                    <Route
                                        path={UserRoutes.Edit}
                                        element={<UserEditScreen />}
                                    />
                                </Route>
                            </Route>
                            {/* PropertyRoutes */}
                            <Route
                                path={PropertyRoutes.Index}
                                element={<PropertiesLayout />}>
                                <Route index element={<PropertiesOverviewScreen />} />
                                <Route
                                    path={PropertyRoutes.Detail}
                                    element={<PropertyDetailLayout />}>
                                    <Route index element={<PropertyDetailScreen />} />
                                </Route>
                            </Route>
                        </Route>
                        {/* Routes for Agent and Admin */}
                        <Route
                            element={
                                <RoleContainer roles={[UserRoles.Agent, UserRoles.Admin]}>
                                    <Outlet />
                                </RoleContainer>
                            }>
                            {/* UserRoutes */}
                            <Route
                                path={UserRoutes.Index}
                                element={<UsersLayout />}>
                                <Route index element={<UsersOverviewScreen />} />
                                <Route
                                    path={UserRoutes.New}
                                    element={<UserAddScreen />}
                                />
                                <Route
                                    path={UserRoutes.Detail}
                                    element={<UserDetailLayout />}>
                                    <Route
                                        path={UserRoutes.Edit}
                                        element={<UserEditScreen />}
                                    />
                                </Route>
                            </Route>
                            {/* AgencyRoutes */}
                            <Route
                                path={AgencyRoutes.Index}
                                element={<AgenciesLayout />}>
                                <Route
                                    path={AgencyRoutes.Edit}
                                    element={<AgencyEditScreen />}
                                />
                            </Route>
                            {/* PropertyRoutes */}
                            <Route
                                path={PropertyRoutes.Index}
                                element={<PropertiesLayout />}>
                                <Route
                                    path={PropertyRoutes.New}
                                    element={<PropertyAddScreen />}
                                />
                                <Route
                                    path={PropertyRoutes.Detail}
                                    element={<PropertyDetailLayout />}>
                                    <Route
                                        path={PropertyRoutes.Edit}
                                        element={<PropertyEditScreen />}
                                    />
                                </Route>
                            </Route>
                        </Route>
                        {/* Routes for User */}
                        <Route
                            element={
                                <RoleContainer roles={[UserRoles.User]}>
                                    <Outlet />
                                </RoleContainer>
                            }>
                            {/* LikeRoutes */}
                            <Route
                                path={LikeRoutes.Index}
                                element={<LikesLayout />}>
                                <Route index element={<LikesOverviewScreen />} />
                            </Route>
                            {/* MessageRoutes */}
                            <Route
                                path={MessageRoutes.Index}
                                element={<MessagesLayout />}>
                                <Route
                                    path={MessageRoutes.New}
                                    element={<MessageAddScreen />}
                                />
                            </Route>
                        </Route>
                        {/* Routes for Agent */}
                        <Route
                            element={
                                <RoleContainer roles={[UserRoles.Agent]}>
                                    <Outlet />
                                </RoleContainer>
                            }>
                            {/* DashboardRoutes */}
                            <Route
                                path={DashboardRoutes.Index}
                                element={<DashboardLayout />}>
                                <Route index element={<DashboardScreen />} />
                            </Route>
                            {/* MessageRoutes */}
                            <Route
                                path={MessageRoutes.Index}
                                element={<MessagesLayout />}>
                                <Route index element={<MessagesOverviewScreen />} />
                                <Route
                                    path={MessageRoutes.Detail}
                                    element={<MessageDetailLayout />}>
                                    <Route index element={<MessageDetailScreen />} />
                                </Route>
                            </Route>
                        </Route>
                        {/* Routes for Admin */}
                        <Route
                            element={
                                <RoleContainer roles={[UserRoles.Admin]}>
                                    <Outlet />
                                </RoleContainer>
                            }>
                            {/* CategoryRoutes */}
                            <Route
                                path={CategoryRoutes.Index}
                                element={<CategoriesLayout />}>
                                <Route index element={<CategoriesOverviewScreen />} />
                                <Route
                                    path={CategoryRoutes.New}
                                    element={<CategoryAddScreen />}
                                />
                                <Route
                                    path={CategoryRoutes.Edit}
                                    element={<CategoryEditScreen />}
                                />
                            </Route>
                            {/* AgencyRoutes */}
                            <Route
                                path={AgencyRoutes.Index}
                                element={<AgenciesLayout />}>
                                <Route index element={<AgenciesOverviewScreen />} />
                                <Route
                                    path={AgencyRoutes.New}
                                    element={<AgencyAddScreen />}
                                />
                            </Route>
                        </Route>
                        {/* Redirect */}
                        <Route
                            path="*"
                            element={<Navigate to={PropertyRoutes.Index} />}
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </AppContainer>
    );
};

export default App;
