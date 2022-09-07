import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useRole from "../../../../../core/hooks/useRole";
import useTitle from "../../../../../core/hooks/useTitle";
import { MessageRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import MessageForm from "../../../Shared/Messages/Form/MessageForm";

const MessageAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const path = useRole("messages");

    const { isLoading, error, mutate } = useMutation();

    useTitle(t("messages.create.title"));

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: "POST",
            data,
            onSuccess: () => {
                navigate(MessageRoutes.Index);
            },
        });
    };

    return (
        <>
            <PageHeader>
                <Title>{t("messages.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="red">{error}</Alert>}
            <MessageForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default MessageAddScreen;
