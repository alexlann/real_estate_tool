import useFetch from "../../../../../core/hooks/useFetch";
import useRole from "../../../../../core/hooks/useRole";
import Select from "../../../../Design/Form/Select";

const CategorySelect = (props) => {
    const path = useRole("categories");
    const { data: categories } = useFetch(`/${path}`);

    const options = categories
        ? categories.map((c) => ({ value: c.id, label: c.name }))
        : null;
    
    return <Select options={options} {...props} />;
};

export default CategorySelect;
