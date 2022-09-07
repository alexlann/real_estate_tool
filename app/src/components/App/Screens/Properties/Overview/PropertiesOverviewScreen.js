import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { PropertyRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Title from "../../../../Design/Typography/Title";
import PageHeader from "../../../../Design/PageHeader";
import Button from "../../../../Design/Buttons/Button";
import useTitle from "../../../../../core/hooks/useTitle";
import useRole from "../../../../../core/hooks/useRole";
import ToggleTypeInput from "../../../../Design/Form/ToggleTypeInput";
import { useUser } from "../../../Auth/AuthProvider";
import { isUser } from "../../../../../core/modules/users/utils";
import PropertyCard from "../../../Shared/Properties/Card/PropertyCard";
import Header from "../../../Shared/Generic/Header/Header";
import { useEffect, useState } from "react";
import CategorySelect from "../../../Shared/Categories/Select/CategorySelect";
import TownSelect from "../../../Shared/Properties/Select/TownSelect";
import IsSoldSelect from "../../../Shared/Properties/Select/IsSoldSelect";
import isVoid from "../../../../../core/helpers/isVoid";
import Label from "../../../../Design/Form/Label";
import Input from "../../../../Design/Form/Input";
import FormGroup from "../../../../Design/Form/FormGroup";
import { BiFilter } from "react-icons/bi";

const PropertiesOverviewScreen = () => {
    const user = useUser();
    // Set all the useStates for filtering
    const [filteredProperties, setFilteredProperties] = useState();
    const [isFiltering, setIsFiltering] = useState(false);
    const [town, setTown] = useState();
    const [isSold, setIsSold] = useState(!user || isUser(user) ? "false" : "");
    const [lowestPrice, setLowestPrice] = useState(0);
    const [highestPrice, setHighestPrice] = useState(0);
    const [type, setType] = useState("SALE");
    const [category, setCategory] = useState();
    const [hideFilters, setHideFilters] = useState(true);
    const { t } = useTranslation();
    const path = useRole("properties");

    const {
        isLoading,
        data: properties,
        error,
        invalidate,
    } = useFetch(`/${path}`);

    useTitle(t("properties.title"));

    const handleInvalidate = () => {
        invalidate();
    };
    
    // When one of the values updates, properties will be filtered again
    useEffect(() => {
        setIsFiltering(true);
        if (!isLoading && !error) {
            let result = properties;
            result = town ? result.filter((property) => property.town === town) : result;
            result = !isVoid(isSold) ? result.filter((property) => `${property.isSold}` === isSold) : result;
            result = (((lowestPrice !== 0) || (highestPrice !== 0)) ? (result.filter((property) => (property.price >= lowestPrice && property.price <= highestPrice))) : result);
            result = result.filter((property) => property.type === type);
            result = category ? result.filter((property) => property.category.id === parseInt(category)) : result;
            setFilteredProperties(result);
            setIsFiltering(false);
        }
    }, [town, lowestPrice, highestPrice, type, category, isLoading, error, isSold, properties]);

    // Handle all the different onChanges in one switch
    const onChange = (e) => {
        switch(e.target.name) {
            case "type":
                setType(e.target.value);
                break;
            case "category":
                setCategory(e.target.value);
                break;
            case "town":
                setTown(e.target.value);
                break;
            case "isSold":
                setIsSold(e.target.value);
                break;
            case "lowestPrice":
                setLowestPrice(e.target.value);
                break;
            case "highestPrice":
                setHighestPrice(e.target.value);
                break;
            default:
                console.log("Something went wrong");
          }
    }

    const onClickFilter = () => {
        setHideFilters(!hideFilters);
    }

    if (isLoading || isFiltering) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="red">{error}</Alert>;
    }

    return (
        <>
            <Header />
            <PageHeader>
                <Title>{t("properties.overview.title")}</Title>
                {/* Don't show any filters if there are no properties yet */}
                {properties.length !== 0 && (
                    <>
                        <div className="flex justify-between">
                            <ToggleTypeInput
                                onChange={onChange}
                            />
                            <Button color="black" onClick={onClickFilter}>
                                <div className="flex gap-2 item-center">
                                    {t("properties.overview.filter")}
                                    <p className="text-2xl">
                                        <BiFilter />
                                    </p>
                                </div>
                            </Button>
                        </div>
                        <div className={`flex flex-wrap gap-4 ${hideFilters && "hidden"}`}>
                            <FormGroup>
                                <Label htmlFor="category">{t("fields.category")}</Label>
                                <CategorySelect
                                    className="w-36"
                                    name="category"
                                    value={category}
                                    onChange={onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="town">{t("fields.town")}</Label>
                                <TownSelect
                                    className="w-36"
                                    name="town"
                                    value={town}
                                    onChange={onChange}

                                />
                            </FormGroup>
                            {user && !isUser(user) && (
                                <FormGroup>
                                    <Label htmlFor="isSold">{t("fields.isSold")}</Label>
                                    <IsSoldSelect
                                        className="w-36"
                                        name="isSold"
                                        value={isSold}
                                        onChange={onChange}
                                    />
                                </FormGroup>
                            )}
                            <FormGroup>
                                <Label htmlFor="lowestPrice">{t("fields.lowestPrice")}</Label>
                                <Input
                                    className="w-36"
                                    name="lowestPrice"
                                    value={lowestPrice}
                                    onChange={onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="highestPrice">{t("fields.highestPrice")}</Label>
                                <Input
                                    className="w-36"
                                    name="highestPrice"
                                    value={highestPrice}
                                    onChange={onChange}
                                />
                            </FormGroup>
                        </div>
                    </>
                )}
                <div className="flex justify-between items-center">
                    {filteredProperties.length} {filteredProperties.length === 1 ? t("properties.overview.count") : t("properties.overview.counts")}
                    {(!isUser(user) && user) && (
                        <Button href={PropertyRoutes.New}>
                            {t("properties.overview.create")}
                        </Button>
                    )}
                </div>

                </PageHeader>
                <div className={(isUser(user) || !user )? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2" : undefined}>
                    {filteredProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            user={user}
                            showImage={isUser(user) || !user}
                            handleDelete={handleInvalidate}
                            onSaleSucces={handleInvalidate}
                        />
                    ))}
                </div>
            {filteredProperties.length === 0 && (
                <Alert color="green">
                    {t("properties.overview.nothing")}
                </Alert>
            )}
        </>
    );
};

export default PropertiesOverviewScreen;
