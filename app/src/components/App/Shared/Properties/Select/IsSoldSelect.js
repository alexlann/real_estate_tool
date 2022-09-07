import { t } from "i18next";
import Select from "../../../../Design/Form/Select";

const IsSoldSelect = (props) => {
    const options = [{value: false, label: t("fields.forSaleRent") }, {value: true, label: t("fields.soldRented")}];

    return <Select options={options} {...props} />;
};

export default IsSoldSelect;
