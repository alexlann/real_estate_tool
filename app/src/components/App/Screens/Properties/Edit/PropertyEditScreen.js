import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useMutation from "../../../../../core/hooks/useMutation";
import useRole from "../../../../../core/hooks/useRole";
import useTitle from "../../../../../core/hooks/useTitle";
import { isAdmin } from "../../../../../core/modules/users/utils";
import { PropertyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import { useUser } from "../../../Auth/AuthProvider";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import PropertyForm from "../../../Shared/Properties/Form/PropertyForm";

const PropertyEditScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const path = useRole("properties");
    const { id } = useParams();
    const user = useUser();

    const {
        isLoading: fetchIsLoading,
        error: fetchError,
        data: property,
    } = useFetch(`/${path}/${id}`);

    const { mutationIsLoading, mutationError, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/${path}/${id}`, {
            method: "PATCH",
            data,
            onSuccess: () => {
                navigate(route(PropertyRoutes.Index));
            },
        });
    };

    useTitle(t("properties.edit.title"));

    if (fetchError) {
        return <Alert color="red">{fetchError}</Alert>;
    }

    if (fetchIsLoading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("properties.edit.title")}</Title>
            </PageHeader>
            {mutationError && <Alert color="red">{mutationError}</Alert>}
            <PropertyForm
                label={t("buttons.save")}
                disabled={mutationIsLoading}
                onSubmit={handleSubmit}
                initialData={property}
                options={{"showAgency": isAdmin(user)}}
            />
        </>
    );
};

export default PropertyEditScreen;
