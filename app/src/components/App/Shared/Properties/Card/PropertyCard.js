import { Link } from "react-router-dom";
// import isVoid from "../../../../../core/helpers/isVoid";
import { PropertyRoutes, route } from "../../../../../core/routing";
import Card from "../../../../Design/Card/Card";
import Title2 from "../../../../Design/Typography/Title2";
import Title3 from "../../../../Design/Typography/Title3";
import DeleteButton from "../../Generic/Buttons/DeleteButton";
import PropTypes from "prop-types";
import { isUser } from "../../../../../core/modules/users/utils";
// import { getImagePath } from "../../../../../core/helpers/api";
import { useTranslation } from "react-i18next";
import EditButton from "../../../../Design/Buttons/EditButton";
import LikeButton from "../../Generic/Buttons/LikeButton";
import { PropertyTypes } from "../../../../../core/modules/properties/constants";
import SaleButton from "../../Generic/Buttons/SaleButton";
import createRandomImage from "../../../../../core/helpers/createRandomImage";

const PropertyCard = ({ property, user, showImage=false, handleDelete=undefined, onLikeSuccess=undefined, onSaleSucces=undefined }) => {
    const { t } = useTranslation();

    // Display image if the user is not admin or agent or if showImage is true
    const hasImg = (isUser(user) || !user || showImage);

    return (
        <Card key={property.id} hasImg={hasImg}>
            {(hasImg) && (
                <div className="relative">
                    <Link
                        to={route(PropertyRoutes.Detail, {
                            id: property.id,
                        })}>
                        {/* Add random generator if there is no image available*/}
                        <img
                            className="object-cover h-40 w-full rounded-2xl"
                            src={createRandomImage("property")}
                            // src={!isVoid(property.avatar) && getImagePath(property.avatar)}
                            alt={property.title}
                        />
                    </Link>
                    {(isUser(user) || !user) && (
                        <div className="absolute left-0 bottom-0 bg-green rounded-bl-2xl text-white px-2 w-fit">
                            {property.town}
                        </div>
                    )}
                    {isUser(user) && (
                        <LikeButton
                            className={`text-white text-lg absolute right-0 bottom-0 px-2`}
                            id={property.id}
                            onSuccess={onLikeSuccess}
                        />
                    )}
                </div>
            )}
            <div className={hasImg ? "py-2.5 px-4" : undefined}>
                <div className={(user && !isUser(user)) ? "flex justify-between" : undefined}>
                    <div>
                        <Title2 className={(user && !isUser(user)) ? "leading-7" : undefined}>
                            <Link
                                to={route(PropertyRoutes.Detail, {
                                    id: property.id,
                                })}>
                                {property.title}
                            </Link>
                        </Title2>
                        {((user && !isUser(user)) && handleDelete )&& (
                            <SaleButton
                                className="mr-1"
                                property={property}
                                onSuccess={onSaleSucces}
                            />
                        )}
                    </div>
                    <div className="text-right">
                        <Title3 className={`${(isUser(user) || !user) ? "order-last" : undefined} flex no-wrap justify-end items-center`}>
                            €{property.price.toLocaleString()}
                            <p className="text-light-green text-sm">{property.type === PropertyTypes.Rent && `/${t("properties.overview.mo")}`}</p>
                        </Title3>
                        {((!isUser(user) && user) && handleDelete ) && (
                            <div className="mt-1 flex gap-x-2 justify-end">
                                <EditButton
                                    href={route(PropertyRoutes.Edit, { id: property.id })}
                                />
                                <DeleteButton
                                    size="sm"
                                    id={property.id}
                                    scope="properties"
                                    onSuccess={handleDelete}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

PropertyCard.propTypes = {
    onLikeSuccess: PropTypes.func,
    handleDelete: PropTypes.func,
    showImage: PropTypes.bool,
    onSaleSucces: PropTypes.func,
    ...Card.propTypes,
};

export default PropertyCard;


