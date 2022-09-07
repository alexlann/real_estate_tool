import { BiPencil } from "react-icons/bi";
import Button from "./Button";

const EditButton = ({ href }) => {
    return (
        <Button
            href={href}
            size="sm"
            color="edit"
        >
            <BiPencil />
        </Button>
    );
};

export default EditButton;
