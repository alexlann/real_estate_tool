import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BiTrash } from "react-icons/bi";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useRole from "../../../../../core/hooks/useRole";
import useTitle from "../../../../../core/hooks/useTitle";
import { PropertyTypes } from "../../../../../core/modules/properties/constants";
import { formatName } from "../../../../../core/modules/users/utils";
import { MessageRoutes, PropertyRoutes, route } from "../../../../../core/routing";
import Card from "../../../../Design/Card/Card";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import Title2 from "../../../../Design/Typography/Title2";
import Title3 from "../../../../Design/Typography/Title3";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";

const MessageDetailScreen = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { message } = useOutletContext();
    const navigate = useNavigate();

    const { mutate } = useMutation();

    const path = useRole(`messages/${id}`);

    useEffect(() => {
        mutate(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: "POST",
            onSuccess: () => {},
        });
    });

    const handleDelete = () => {
        navigate(route(MessageRoutes.Index));
    };

    useTitle(message ? message.title : "");

    return (
        <>
            <PageHeader>
                <Title>{t("messages.title")}</Title>
            </PageHeader>
            <Card key={message.id}>
                <div className="flex justify-between items-start">
                    <div>
                        <Title2 className="leading-7">
                            {message.property.title}
                        </Title2>
                        <p>{formatName(message.user)}</p>
                    </div>
                    <div className="text-right">
                    <Title3 className="flex no-wrap justify-between items-center">
                        €{message.property.price.toLocaleString()}
                        <p className={`${message.isRead ? "text-light-green" : "text-black font-normal"} text-sm`}>{message.property.type === PropertyTypes.Rent && `/${t("messages.detail.mo")}`}</p>
                    </Title3>
                    </div>
                </div>
                <div className="mt-2">
                    <p className="text-green">{message.user.email}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-green">{message.user.phonenumber}</p>
                        <p className="text-green underline">
                            <Link
                                to={route(PropertyRoutes.Detail, {
                                    id: message.property.id,
                                })}>
                                {t("messages.detail.view")}
                            </Link>
                        </p>
                    </div>
                </div>
            </Card>

            <Card>
                {message.message}
            </Card>

            <div className="w-fit ml-auto">
                <DeleteButton
                    size="md"
                    id={message.id}
                    scope="messages"
                    onSuccess={handleDelete}
                    className="flex items-center gap-2"
                >
                    {t("messages.detail.delete")} <BiTrash />
                </DeleteButton>
            </div>
        </>
    );
};

export default MessageDetailScreen;
