import { useTranslation } from "react-i18next";
import { FaBath, FaBed } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import createRandomImage from "../../../../../core/helpers/createRandomImage";
import isVoid from "../../../../../core/helpers/isVoid";
import useMutation from "../../../../../core/hooks/useMutation";
import useRole from "../../../../../core/hooks/useRole";
import useTitle from "../../../../../core/hooks/useTitle";
import { PropertyTypes } from "../../../../../core/modules/properties/constants";
import { isUser } from "../../../../../core/modules/users/utils";
import { PropertyRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import Avatar from "../../../../Design/Avatar";
import Card from "../../../../Design/Card/Card";
import PageHeader from "../../../../Design/PageHeader";
import Leading from "../../../../Design/Typography/Leading";
import Title from "../../../../Design/Typography/Title";
import Title2 from "../../../../Design/Typography/Title2";
import Title3 from "../../../../Design/Typography/Title3";
import { useUser } from "../../../Auth/AuthProvider";
import LikeButton from "../../../Shared/Generic/Buttons/LikeButton";
import Header from "../../../Shared/Generic/Header/Header";
import MessageForm from "../../../Shared/Messages/Form/MessageForm";

const PropertyAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { property } = useOutletContext();
    const path = useRole("messages");
    const user = useUser();

    useTitle(property ? property.title : "");

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/${path}`, {
            method: "POST",
            data,
            onSuccess: () => {
                navigate(PropertyRoutes.Index);
            },
        });
    };

    return (
        <>
            <Header />
            <PageHeader>
                <Title>{t("properties.detail.title")}</Title>
            </PageHeader>
            <Card hasImg={true}>
                {/* LOCAL api: check if image available */}
                {/* {!isVoid(property.avatar) && ( */}
                    <div className="relative">
                        <img
                            className="object-cover h-32 sm:h-48 md:h-64 lg:h-96 w-full rounded-2xl"
                            // ONLINE with postgress and ranom img generator
                            src={createRandomImage("property")}
                            // LOCAL
                            // src={getImagePath(property.avatar)}
                            alt={property.title}
                        />
                        <div className="absolute left-0 bottom-0 bg-green rounded-bl-2xl text-white px-2 pd:py-2 md:text-lg w-fit">
                            {property.town}
                        </div>
                        {isUser(user) && (
                            <LikeButton
                                className={`text-white text-lg md:text-xl lg:text-2xl absolute right-0 md:right-1 lg:right-2 bottom-0 md:bottom-1 lg:bottom-2 px-2`}
                                id={property.id}
                            />
                        )}
                    </div>
                {/* )} */}
                <div className="py-2.5 px-4">
                    <div>
                        <div>
                            <Title3 className="text-black">
                                {property.title}
                            </Title3>
                        </div>
                        <div className="text-right flex flex-wrap justify-between">
                            <div className="leading-10 flex gap-2 items-center">
                                <p>
                                    <FaBed className="text-green" />
                                </p>
                                <p>
                                    {property.bathrooms}
                                </p>
                                <p>
                                    <FaBath className="text-green" />
                                </p>
                                <p>
                                    {property.bedrooms}
                                </p>
                            </div>
                            <Title3 className="leading-10 flex no-wrap justify-between items-center">
                                €{property.price.toLocaleString()}
                                <p className="text-light-green text-sm">{property.type === PropertyTypes.Rent && `/${t("properties.detail.mo")}`}</p>
                            </Title3>
                        </div>
                        <p>
                            {property.description}
                        </p>
                    </div>
                </div>
            </Card>

            {user && (
                <>
                    <Title2>
                        {t("properties.detail.details")}
                    </Title2>

                    <Card>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Avatar
                                    hasIcon={isVoid(property.agency.avatar)}
                                    src={getImagePath(property.agency.avatar)}
                                    alt={property.agency.name}
                                />
                                <div>
                                    <Title2>
                                        {property.agency.name}
                                    </Title2>
                                    <p>{t("properties.detail.agency")}</p>
                                </div>
                            </div>
                            <div>
                                <Leading>
                                    <strong>{t("fields.town")}:</strong> {property.town}
                                </Leading>
                                <Leading>
                                    <strong>{t("fields.street")}:</strong> {property.street}
                                </Leading>
                                <Leading>
                                    <strong>{t("fields.surfaceArea")}:</strong> {property.surfaceArea}m²
                                </Leading>
                                <Leading>
                                    <strong>{t("fields.category")}:</strong> {property.category.name}
                                </Leading>
                                <Leading>
                                    <strong>{t("fields.buildYear")}:</strong> {property.buildYear}
                                </Leading>
                            </div>
                        </div>
                    </Card>

                    {isUser(user) && (
                        <>
                            <Title2>
                                {t("properties.detail.contact")}
                            </Title2>

                            <Card>
                                <div>
                                    {error && <Alert>{error}</Alert>}
                                    <MessageForm
                                        label={t("buttons.send")}
                                        propertyId={property.id}
                                        disabled={isLoading}
                                        onSubmit={handleSubmit}
                                    />
                                </div>
                            </Card>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default PropertyAddScreen;
