import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import Textarea from "../../../../Design/Form/Textarea";
import AgencySelect from "../../Agencies/Select/AgencySelect";
import { useTranslation } from "react-i18next";
import Input from "../../../../Design/Form/Input";
import CategorySelect from "../../Categories/Select/CategorySelect";
import FileInput from "../../../../Design/Form/FileInput";
import ToggleTypeInput from "../../../../Design/Form/ToggleTypeInput";

const schema = yup.object().shape({
    title: yup.string().required(),
    town: yup.string().required(),
    street: yup.string().required(),
    price: yup.number().min(1).required(),
    surfaceArea: yup.number().required(),
    buildYear: yup.number().min(1900).max(new Date().getFullYear()).required(),
    bathrooms: yup.number().min(0).required(),
    bedrooms: yup.number().min(0).required(),
    description: yup.string().required(),
    agencyId: yup.number().nullable(),
    categoryId: yup.number().required(),
    type: yup.string().required()
});

const transformInitialData = (initialData) => {
    if (initialData.category) {
        initialData = {
            ...initialData,
            categoryId: initialData.category.id,
        };
    }
    if (initialData.agency) {
        initialData = {
            ...initialData,
            agencyId: initialData.agency.id,
        };
    }
    return initialData;
};

const defaultData = {
    agencyId: null,
    categoryId: null,
    description: "",
    town: "",
    title: "",
    street: "",
    price: "",
    surfaceArea: "",
    buildYear: "",
    bathrooms: "",
    bedrooms: "",
    type: "SALE"
};


const defaultOptions = {
    showAgency: true,
};

const PropertyForm = ({
    initialData = {},
    disabled,
    onSubmit,
    label,
    options = {},
}) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        ...defaultData,
        ...transformInitialData(initialData),
    });

    const handleData = (values) => {
        onSubmit(values);
    };

    options = { ...defaultOptions, ...options };

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true} className="max-w-screen-sm mx-auto">
            <FormGroup>
                <ToggleTypeInput
                    value={values.type}
                    onChange={handleChange}
                    error={errors.title}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="title">{t("fields.title")}</Label>
                <Input
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    error={errors.title}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="town">{t("fields.town")}</Label>
                <Input
                    name="town"
                    value={values.town}
                    onChange={handleChange}
                    error={errors.town}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="street">{t("fields.street")}</Label>
                <Input
                    name="street"
                    value={values.street}
                    onChange={handleChange}
                    error={errors.street}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price">{t("fields.price")}</Label>
                <Input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    error={errors.price}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="surfaceArea">{t("fields.surfaceArea")}</Label>
                <Input
                    type="number"
                    name="surfaceArea"
                    value={values.surfaceArea}
                    onChange={handleChange}
                    error={errors.surfaceArea}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="buildYear">{t("fields.buildYear")}</Label>
                <Input
                    type="number"
                    name="buildYear"
                    value={values.buildYear}
                    onChange={handleChange}
                    error={errors.buildYear}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="bedrooms">{t("fields.bedrooms")}</Label>
                <Input
                    type="number"
                    name="bedrooms"
                    value={values.bedrooms}
                    onChange={handleChange}
                    error={errors.bedrooms}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="bathrooms">{t("fields.bathrooms")}</Label>
                <Input
                    type="number"
                    name="bathrooms"
                    value={values.bathrooms}
                    onChange={handleChange}
                    error={errors.bathrooms}
                />
            </FormGroup>
            {options.showAgency && (
                <FormGroup>
                    <Label htmlFor="agencyId">{t("fields.agency")}</Label>
                    <AgencySelect
                        name="agencyId"
                        value={values.agencyId}
                        onChange={handleChange}
                        error={errors.agencyId}
                    />
                </FormGroup>
            )}
            <FormGroup>
                <Label htmlFor="categoryId">{t("fields.category")}</Label>
                <CategorySelect
                    name="categoryId"
                    value={values.categoryId}
                    onChange={handleChange}
                    error={errors.categoryId}
                />
            </FormGroup>
            <FormGroup className="mb-0">
                <Label htmlFor="description">{t("fields.description")}</Label>
                <Textarea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    error={errors.description}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="avatar">{t("fields.avatar")}</Label>
                <FileInput
                    name="avatar"
                    value={values.avatar}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.avatar}
                />
            </FormGroup>
            <Button type="submit" size="lg" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default PropertyForm;
