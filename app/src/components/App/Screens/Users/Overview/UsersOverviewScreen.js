import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { UserRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Button from "../../../../Design/Buttons/Button";
import Title from "../../../../Design/Typography/Title";
import PageHeader from "../../../../Design/PageHeader";
import useTitle from "../../../../../core/hooks/useTitle";
import useRole from "../../../../../core/hooks/useRole";
import UserCard from "../../../Shared/Users/Card/UserCard";

const UsersOverviewScreen = () => {
    const { t } = useTranslation();
    const path = useRole("users");
    const { isLoading, data: users, error, invalidate } = useFetch(`/${path}`);

    const handleUserDelete = () => {
        invalidate();
    };

    useTitle(t("users.title"));

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="red">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("users.overview.title")}</Title>
                <div className="flex justify-between items-center">
                    {users.length} {users.length === 1 ? t("users.overview.count") : t("users.overview.counts")}
                    <Button href={UserRoutes.New}>
                        {t("users.overview.create")}
                    </Button>
                </div>
            </PageHeader>
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    handleDelete={handleUserDelete}
                />
            ))}
            {users.length === 0 && (
                <Alert color="green">
                    {t("users.overview.nothing")}
                </Alert>
            )}
        </>
    );
};

export default UsersOverviewScreen;
