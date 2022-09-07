import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";
import FileInput from "../../../../Design/Form/FileInput";

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phonenumber: yup.string().required(),
});

const AgencyForm = ({
    initialData = {},
    disabled,
    onSubmit,
    label
}) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        name: "",
        email: "",
        phonenumber: "",
        ...initialData,
    });

    const handleData = (values) => {
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true} className="max-w-screen-sm mx-auto">
            <FormGroup>
                <Label htmlFor="name">{t("fields.name")}</Label>
                <Input
                    name="name"
                    value={values.name}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.name}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">{t("fields.email")}</Label>
                <Input
                    name="email"
                    value={values.email}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.email}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="phonenumber">{t("fields.phonenumber")}</Label>
                <Input
                    name="phonenumber"
                    value={values.phonenumber}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.phonenumber}
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

export default AgencyForm;
