import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useRole from "../../../../../core/hooks/useRole";
import useTitle from "../../../../../core/hooks/useTitle";
import { isAdmin } from "../../../../../core/modules/users/utils";
import { PropertyRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import { useUser } from "../../../Auth/AuthProvider";
import PropertyForm from "../../../Shared/Properties/Form/PropertyForm";

const PropertyAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const path = useRole("properties");
    const user = useUser();

    useTitle(t("properties.create.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(PropertyRoutes.Index);
            },
        });
    };

    return (
        <>
            <PageHeader>
                <Title>{t("properties.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="red">{error}</Alert>}
            <PropertyForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                options={{"showAgency": isAdmin(user)}}
            />
        </>
    );
};

export default PropertyAddScreen;
