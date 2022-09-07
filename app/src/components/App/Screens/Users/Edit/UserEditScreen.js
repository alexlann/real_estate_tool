import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useRole from "../../../../../core/hooks/useRole";
import useTitle from "../../../../../core/hooks/useTitle";
import { isUser } from "../../../../../core/modules/users/utils";
import { UserRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import UserForm from "../../../Shared/Users/Form/UserForm";

const UserEditScreen = () => {
    const { t } = useTranslation();
    const { user, onUserUpdate } = useOutletContext();
    const navigate = useNavigate();
    const path = useRole("users");

    useTitle(t("users.edit.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/${path}/${user.id}`, {
            method: "PATCH",
            data,
            onSuccess: () => {
                onUserUpdate();
                navigate(route(UserRoutes.Index, { id: user.id }));
            },
        });
    };

    return (
        <>
            <PageHeader>
                <Title>{isUser(user) ? t("users.edit.profile") : t("users.edit.title")}</Title>
            </PageHeader>
            {error && <Alert color="red">{error}</Alert>}
            <UserForm
                label={t("buttons.save")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                initialData={user}
            />
        </>
    );
};

export default UserEditScreen;
