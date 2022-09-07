import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useRole from "../../../../../core/hooks/useRole";
import useTitle from "../../../../../core/hooks/useTitle";
import { UserRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import UserForm from "../../../Shared/Users/Form/UserForm";

const UserAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const path = useRole("users");

    useTitle(t("users.create.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(UserRoutes.Index);
            },
        });
    };

    return (
        <>
            <PageHeader>
                <Title>{t("users.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="red">{error}</Alert>}
            <UserForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default UserAddScreen;
