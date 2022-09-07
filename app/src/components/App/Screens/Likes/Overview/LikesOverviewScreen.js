import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import useTitle from "../../../../../core/hooks/useTitle";
import useRole from "../../../../../core/hooks/useRole";
import PropertyCard from "../../../Shared/Properties/Card/PropertyCard";
import { useUser } from "../../../Auth/AuthProvider";

const LikesOverviewScreen = () => {
    const { t } = useTranslation();
    const path = useRole("likes");
    const user = useUser();
    const {
        isLoading,
        data: likes,
        error,
        invalidate,
    } = useFetch(`/${path}`);

    useTitle(t("likes.title"));

    const handleDislike = () => {
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
                <Title>{t("likes.overview.title")}</Title>
                <div className="flex justify-between items-center">
                    {likes.length} {likes.length === 1 ? t("likes.overview.count") : t("likes.overview.counts")}
                </div>
            </PageHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2">
                {likes.map((like) => (
                    <PropertyCard
                        key={like.id}
                        property={like.property}
                        user={user}
                        showImage={true}
                        onLikeSuccess={handleDislike}
                    />
                ))}
            </div>
            {likes.length === 0 && (
                <Alert color="green">
                    {t("likes.overview.nothing")}
                </Alert>
            )}
        </>
    );
};

export default LikesOverviewScreen;
