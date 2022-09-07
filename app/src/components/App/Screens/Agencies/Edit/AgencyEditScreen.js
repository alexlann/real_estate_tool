import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useMutation from "../../../../../core/hooks/useMutation";
import useRole from "../../../../../core/hooks/useRole";
import useTitle from "../../../../../core/hooks/useTitle";
import { isAgent } from "../../../../../core/modules/users/utils";
import { AgencyRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import { useUser } from "../../../Auth/AuthProvider";
import AgencyForm from "../../../Shared/Agencies/Form/AgencyForm";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const AgencyEditScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const path = useRole("agencies");
    const user = useUser();
    const { id } = useParams();

    const {
        isLoading: fetchIsLoading,
        error: fetchError,
        data: agency,
    } = useFetch(`/${path}/${id}`);

    const { mutationIsLoading, mutationError, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/${path}/${id}`, {
            method: "PATCH",
            data,
            onSuccess: () => {
                navigate(AgencyRoutes.Index);
            },
        });
    };

    useTitle(t("agencies.create.title"));

    if (fetchError) {
        return <Alert color="red">{fetchError}</Alert>;
    }

    if (fetchIsLoading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <PageHeader>
                <Title>{isAgent(user) ? t("agencies.edit.profile") : t("agencies.edit.title") }</Title>
            </PageHeader>
            {mutationError && <Alert color="red">{mutationError}</Alert>}
            <AgencyForm
                initialData={agency}
                label={t("buttons.edit")}
                disabled={mutationIsLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default AgencyEditScreen;
