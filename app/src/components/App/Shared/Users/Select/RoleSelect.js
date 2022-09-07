import { userRolesArray } from "../../../../../core/modules/users/constants";
import Select from "../../../../Design/Form/Select";

const RoleSelect = (props) => {
    return <Select options={userRolesArray} {...props} />;
};

export default RoleSelect;
