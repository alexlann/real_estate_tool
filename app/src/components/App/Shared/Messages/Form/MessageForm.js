import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";
import Textarea from "../../../../Design/Form/Textarea";

const schema = yup.object().shape({
    message: yup.string().required(),
    propertyId: yup.string().required(),
});

const MessageForm = ({ propertyId, disabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        message: "",
        propertyId: propertyId,
    });

    const handleData = (values) => {
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <FormGroup>
                <Input
                    name="propertyId"
                    type="hidden"
                    value={values.propertyId}
                    onChange={handleChange}
                    error={errors.propertyId}
                />
            </FormGroup>
            <FormGroup>
                <Textarea
                    placeholder={t("fields.ask")}
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    error={errors.message}
                />
            </FormGroup>
            <div className="flex justify-center">
                <Button type="submit" size="lg" className="max-w-sm" disabled={disabled}>
                    {label}
                </Button>
            </div>
        </form>
    );
};

export default MessageForm;
