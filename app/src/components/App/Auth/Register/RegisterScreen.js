import useForm from "../../../../core/hooks/useForm";
import useMutation from "../../../../core/hooks/useMutation";
import Alert from "../../../Design/Alert";
import Button from "../../../Design/Buttons/Button";
import FormGroup from "../../../Design/Form/FormGroup";
import Input from "../../../Design/Form/Input";
import Label from "../../../Design/Form/Label";
import { useAuthContext } from "../AuthProvider";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthRoutes, route } from "../../../../core/routing";
import Title from "../../../Design/Typography/Title";

const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    phonenumber: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const defaultData = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
};

const RegisterScreen = () => {
    const { t } = useTranslation();
    const { login } = useAuthContext();
    const { isLoading, error, mutate } = useMutation();

    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        ...defaultData,
    });

    const handleData = (values) => {
        mutate(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            data: values,
            onSuccess: (data) => {
                login(data);
            },
        });
    };

    return (
        <>
            <Title>{t("onboarding.register.title")}</Title>
            <form onSubmit={handleSubmit(handleData)} noValidate={true} className="max-w-screen-sm mx-auto">
                {error && <Alert color="red">{error}</Alert>}
                <FormGroup>
                    <Label htmlFor="firstname">{t("fields.firstname")}</Label>
                    <Input
                        name="firstname"
                        value={values.firstname}
                        error={errors.firstname}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>                <FormGroup>
                    <Label htmlFor="lastname">{t("fields.lastname")}</Label>
                    <Input
                        name="lastname"
                        value={values.lastname}
                        error={errors.lastname}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="phonenumber">{t("fields.phonenumber")}</Label>
                    <Input
                        name="phonenumber"
                        value={values.phonenumber}
                        error={errors.phonenumber}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">{t("fields.email")}</Label>
                    <Input
                        name="email"
                        value={values.email}
                        error={errors.email}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">{t("fields.password")}</Label>
                    <Input
                        name="password"
                        type="password"
                        value={values.password}
                        error={errors.password}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <p className="text-sm mt-6 mb-1">
                    {t("onboarding.register.checking")}
                    <Link
                        className="text-green text-sm ml-1"
                        to={route(AuthRoutes.Login)}>
                        {t("onboarding.register.login")}
                    </Link>
                </p>
                <Button type="submit" size="lg" disabled={isLoading}>
                    {t("onboarding.register.button")}
                </Button>
            </form>
        </>
    );
};

export default RegisterScreen;
