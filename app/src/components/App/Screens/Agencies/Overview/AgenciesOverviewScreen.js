import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { AgencyRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Title from "../../../../Design/Typography/Title";
import PageHeader from "../../../../Design/PageHeader";
import Button from "../../../../Design/Buttons/Button";
import useTitle from "../../../../../core/hooks/useTitle";
import useRole from "../../../../../core/hooks/useRole";
import AgencyCard from "../../../Shared/Agencies/Card/AgencyCard";

const AgenciesOverviewScreen = () => {
    const { t } = useTranslation();
    const path = useRole("agencies");
    const {
        isLoading,
        data: agencies,
        error,
        invalidate,
    } = useFetch(`/${path}`);

    useTitle(t("agencies.title"));

    const handleAgencyDelete = () => {
        invalidate();
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="red">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("agencies.overview.title")}</Title>
                <div className="flex justify-between items-center">
                    {agencies.length} {agencies.length === 1 ? t("agencies.overview.count") : t("agencies.overview.counts")}
                    <Button href={AgencyRoutes.New}>
                        {t("agencies.overview.create")}
                    </Button>
                </div>
            </PageHeader>
            {agencies.map((agency) => (
                <AgencyCard
                    key={agency.id}
                    agency={agency}
                    handleDelete={handleAgencyDelete}
                />
            ))}
            {agencies.length === 0 && (
                <Alert color="green">
                    {t("agencies.overview.nothing")}
                </Alert>
            )}
        </>
    );
};

export default AgenciesOverviewScreen;
