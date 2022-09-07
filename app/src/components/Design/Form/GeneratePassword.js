import Button from "../Buttons/Button";
import Input from "./Input";
import { FaCopy, FaMagic } from "react-icons/fa";
import { useState } from "react";
import FormGroup from "./FormGroup";

const GeneratePassword = (props) => {
    const [password, setPassword] = useState(props.value);

    const handleGenerateClick = () => {
        // Generate random password
        setPassword(Math.random().toString(36).slice(-8));
    };

    const handleCopyClick = () => {
        // Copy value to clipboard
        navigator.clipboard.writeText(password)
    };

    return (
        <FormGroup>
            <Input type="password" value={Object.keys(password).length === 0 ? "" : password} {...props}>
                <div className="flex gap-2 mt-2 justify-end">
                    <Button color="green" size="sm" onClick={handleGenerateClick}>
                        <FaMagic />
                    </Button>
                    <Button color="green" size="sm" onClick={handleCopyClick}>
                        <FaCopy />
                    </Button>
                </div>
            </Input>
        </FormGroup>
    );
};

GeneratePassword.propTypes = {
    ...Input.propTypes,
};

export default GeneratePassword;
