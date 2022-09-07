import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useMutation from "../../../../../core/hooks/useMutation";
import useRole from "../../../../../core/hooks/useRole";
import useTitle from "../../../../../core/hooks/useTitle";
import { CategoryRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import CategoryForm from "../../../Shared/Categories/Form/CategoryForm";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const CategoryEditScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const path = useRole("categories");
    const { id } = useParams();

    const {
        isLoading: fetchIsLoading,
        error: fetchError,
        data: category,
    } = useFetch(`/${path}/${id}`);

    const { mutateIsLoading, mutateError, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: "POST",
            data,
            onSuccess: () => {
                navigate(route(CategoryRoutes.Index));
            },
        });
    };

    useTitle(t("categories.edit.title"));

    if (fetchError) {
        return <Alert color="red">{fetchError}</Alert>;
    }

    if (fetchIsLoading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("categories.edit.title")}</Title>
            </PageHeader>
            {mutateError && <Alert color="red">{mutateError}</Alert>}
            <CategoryForm
                label={t("buttons.save")}
                disabled={mutateIsLoading}
                onSubmit={handleSubmit}
                initialData={category}
            />
        </>
    );
};

export default CategoryEditScreen;
