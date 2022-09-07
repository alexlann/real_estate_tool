import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useRole from "../../../../../core/hooks/useRole";
import useTitle from "../../../../../core/hooks/useTitle";
import { AgencyRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import AgencyForm from "../../../Shared/Agencies/Form/AgencyForm";

const AgencyAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const path = useRole("agencies");

    useTitle(t("agencies.create.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(AgencyRoutes.Index);
            },
        });
    };

    return (
        <>
            <PageHeader>
                <Title>{t("agencies.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="red">{error}</Alert>}
            <AgencyForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default AgencyAddScreen;
