import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { route, CategoryRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Title from "../../../../Design/Typography/Title";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import PageHeader from "../../../../Design/PageHeader";
import Button from "../../../../Design/Buttons/Button";
import useTitle from "../../../../../core/hooks/useTitle";
import useRole from "../../../../../core/hooks/useRole";
import Card from "../../../../Design/Card/Card";
import Title2 from "../../../../Design/Typography/Title2";
import EditButton from "../../../../Design/Buttons/EditButton";

const CategoriesOverviewScreen = () => {
    const { t } = useTranslation();
    const path = useRole("categories");
    
    const {
        isLoading,
        data: categories,
        error,
        invalidate,
    } = useFetch(`/${path}`);

    useTitle(t("categories.title"));

    const handleCategoryDelete = () => {
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
                <Title>{t("categories.overview.title")}</Title>
                <div className="flex justify-between items-center">
                    {categories.length} {categories.length === 1 ? t("categories.overview.count") : t("categories.overview.counts")}
                    <Button href={CategoryRoutes.New}>
                        {t("categories.overview.create")}
                    </Button>
                </div>
            </PageHeader>
            {categories.map((category) => (
                <Card key={category.id} className="flex justify-between items-center">
                    <div>
                        <Title2>
                            <Link
                                to={route(CategoryRoutes.Edit, {
                                    id: category.id,
                                })}>
                                {category.name}
                            </Link>
                        </Title2>
                    </div>
                    <div className="text-right">
                        <div className="flex gap-x-2">
                            <EditButton
                                href={route(CategoryRoutes.Edit, { id: category.id })}
                            />
                            <DeleteButton
                                size="sm"
                                id={category.id}
                                scope="categories"
                                onSuccess={handleCategoryDelete}
                            />
                        </div>
                    </div>
                </Card>
            ))}
            {categories.length === 0 && (
                <Alert color="green">
                    {t("categories.overview.nothing")}
                </Alert>
            )}
        </>
    );
};

export default CategoriesOverviewScreen;
