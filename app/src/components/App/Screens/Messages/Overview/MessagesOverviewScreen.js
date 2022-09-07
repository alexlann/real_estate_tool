import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import useTitle from "../../../../../core/hooks/useTitle";
import useRole from "../../../../../core/hooks/useRole";
import MessageCard from "../../../Shared/Messages/Card/MessageCard";

const MessagesOverviewScreen = () => {
    const { t } = useTranslation();
    const path = useRole("messages");
    const {
        isLoading,
        data: messages,
        error,
        invalidate,
    } = useFetch(`/${path}`);

    useTitle(t("messages.title"));

    const handleMessageDelete = () => {
        invalidate()
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
                <Title>{t("messages.overview.title")}</Title>
                {messages.length} {messages.length === 1 ? t("dashboard.messages.count") : t("dashboard.messages.counts")} - { Object.values(messages).filter(item => item.isRead === false).length } {t("messages.overview.unread")}
            </PageHeader>
            {messages.map((message) => (
                <MessageCard
                    key={message.id}
                    message={message}
                    handleDelete={handleMessageDelete}
                />
            ))}
            {messages.length === 0 && (
                <Alert color="green">
                    {t("messages.overview.nothing")}
                </Alert>
            )}
        </>
    );
};

export default MessagesOverviewScreen;
