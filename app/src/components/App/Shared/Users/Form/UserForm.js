import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";
import FileInput from "../../../../Design/Form/FileInput";
import GeneratePassword from "../../../../Design/Form/GeneratePassword";
import { isAdmin, isUser } from "../../../../../core/modules/users/utils";
import { useUser } from "../../../Auth/AuthProvider";
import AgencySelect from "../../Agencies/Select/AgencySelect";
import RoleSelect from "../Select/RoleSelect";

// dynamic schema
const getSchema = (isUpdate) => {
    return yup.object().shape({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        email: yup.string().email().required(),
        role: yup.string(),
        password: isUpdate ? yup.string() : yup.string().required(),
        phonenumber: yup.string().required(),
    });
};

const transformValues = (values) => {
    // don't send password if it's empty
    if (values.password.length === 0) {
        const { password, ...rest } = values; // or use "delete" keyword
        values = rest;
    }
    return values;
};

const UserForm = ({ initialData = {}, disabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const isUpdate = !!initialData.id;
    const user = useUser();
    const { values, errors, handleChange, handleSubmit } = useForm(
        getSchema(isUpdate),
        {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            phonenumber: "",
            ...initialData,
        }
    );

    const handleData = (values) => {
        onSubmit(transformValues(values));
    };

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true} className="max-w-screen-sm mx-auto">
            <FormGroup>
                <Label htmlFor="firstname">{t("fields.firstname")}</Label>
                <Input
                    name="firstname"
                    value={values.firstname}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.firstname}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="lastname">{t("fields.lastname")}</Label>
                <Input
                    name="lastname"
                    value={values.lastname}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.lastname}
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
            {/* only admin and agent can generate password/add img */}
            {isUser(user) ? (
                <FormGroup>
                    <Label htmlFor="password">{t("fields.password")}</Label>
                    <Input
                        name="password"
                        value={values.password}
                        disabled={disabled}
                        onChange={handleChange}
                        error={errors.password}
                    />
                    {isUpdate && (
                        <p className="text-muted">
                            {t("users.edit.password_print")}
                        </p>
                    )}
                </FormGroup>
            ) : (
                <>
                    <FormGroup>
                        <Label htmlFor="password">{t("fields.password")}</Label>
                        <GeneratePassword
                            name="password"
                            value={values.password}
                            disabled={disabled}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        {isUpdate && (
                            <p className="text-muted">
                                {t("users.edit.password_print")}
                            </p>
                        )}
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
                </>
            )}
            {isAdmin(user) && (
                <>
                    <FormGroup>
                        <Label htmlFor="role">{t("fields.role")}</Label>
                        <RoleSelect
                            name="role"
                            value={values.role}
                            onChange={handleChange}
                            error={errors.role}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="agencyId">{t("fields.agency")}</Label>
                        <AgencySelect
                            name="agencyId"
                            value={values.agencyId}
                            onChange={handleChange}
                            error={errors.agencyId}
                        />
                    </FormGroup>
                </>
            )}
            <Button type="submit" size="lg" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default UserForm;
