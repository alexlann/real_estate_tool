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
import Title from "../../../Design/Typography/Title";
import { Link } from "react-router-dom";
import { AuthRoutes, route } from "../../../../core/routing";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const defaultData = {
    email: "",
    password: "",
};

const LoginScreen = () => {
    const { t } = useTranslation();
    const { login } = useAuthContext();
    const { isLoading, error, mutate } = useMutation();

    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        ...defaultData,
    });

    const handleData = (values) => {
        mutate(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            data: values,
            onSuccess: (data) => {
                login(data);
            },
        });
    };

    return (
        <>
            <Title>{t("onboarding.login.title")}</Title>
            <form onSubmit={handleSubmit(handleData)} noValidate={true} className="max-w-screen-sm mx-auto">
                {error && <Alert color="red">{error}</Alert>}
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
                    {t("onboarding.login.checking")}
                    <Link
                        className="text-green text-sm ml-1"
                        to={route(AuthRoutes.Register)}>
                        {t("onboarding.login.register")}
                    </Link>
                </p>
                <Button type="submit" size="lg" disabled={isLoading}>
                    {t("onboarding.login.button")}
                </Button>
            </form>
        </>
    );
};

export default LoginScreen;
