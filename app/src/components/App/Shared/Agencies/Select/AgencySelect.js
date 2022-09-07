import useFetch from "../../../../../core/hooks/useFetch";
import useRole from "../../../../../core/hooks/useRole";
import Select from "../../../../Design/Form/Select";

const AgencySelect = (props) => {
    const path = useRole("agencies");
    const { data: agencies } = useFetch(`/${path}`);

    const options = agencies
        ? agencies.map((c) => ({ value: c.id, label: c.name }))
        : null;

    return <Select options={options} {...props} />;
};

export default AgencySelect;
