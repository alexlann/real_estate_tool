import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useRole from "../../../../../core/hooks/useRole";
import useTitle from "../../../../../core/hooks/useTitle";
import { CategoryRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import CategoryForm from "../../../Shared/Categories/Form/CategoryForm";

const CategoryAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const path = useRole("categories");

    useTitle(t("categories.create.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(CategoryRoutes.Index);
            },
        });
    };

    return (
        <>
            <PageHeader>
                <Title>{t("categories.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="red">{error}</Alert>}
            <CategoryForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default CategoryAddScreen;
