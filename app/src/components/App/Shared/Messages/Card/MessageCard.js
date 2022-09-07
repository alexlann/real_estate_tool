import { Link } from "react-router-dom";
import { formatName } from "../../../../../core/modules/users/utils";
import { MessageRoutes, route } from "../../../../../core/routing";
import Card from "../../../../Design/Card/Card";
import Title2 from "../../../../Design/Typography/Title2";
import Title3 from "../../../../Design/Typography/Title3";
import DeleteButton from "../../Generic/Buttons/DeleteButton";
import PropTypes from "prop-types";
import { PropertyTypes } from "../../../../../core/modules/properties/constants";
import { useTranslation } from "react-i18next";


const MessageCard = ({ message, handleDelete=undefined}) => {
    const { t } = useTranslation();

    return (
        <Card key={message.id} className={`${!message.isRead ? "bg-light-green" : undefined} flex justify-between items-start`}>
            <div>
                <Title2 className="leading-7">
                    <Link
                        to={route(MessageRoutes.Detail, {
                            id: message.id,
                        })}>
                        {message.property.title}
                    </Link>
                </Title2>
                <p className="mt-1">{formatName(message.user)}</p>
            </div>
            <div className="text-right">
                <Title3 className="flex no-wrap justify-between items-center">
                    €{message.property.price.toLocaleString()}
                    <p className={`${message.isRead ? "text-light-green" : "text-black font-normal"} text-sm`}>{message.property.type === PropertyTypes.Rent && `/${t("messages.overview.mo")}`}</p>
                </Title3>
                {/* Agents can't delete a message before it is read */}
                {(message.isRead && handleDelete) && (
                    <div className="mt-1 flex gap-x-2 justify-end">
                        <DeleteButton
                            size="sm"
                            id={message.id}
                            scope="messages"
                            onSuccess={handleDelete}
                        />
                    </div>
                )}
            </div>
        </Card>
    );
};

MessageCard.propTypes = {
    handleDelete: PropTypes.func,
    ...Card.propTypes,
};

export default MessageCard;


