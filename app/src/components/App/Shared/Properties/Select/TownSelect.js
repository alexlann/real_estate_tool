import { useEffect, useState } from "react";
import useFetch from "../../../../../core/hooks/useFetch";
import useRole from "../../../../../core/hooks/useRole";
import Select from "../../../../Design/Form/Select";

const TownSelect = (props) => {
    const path = useRole("properties");
    const [uniqueOptions, setUniqueOptions] = useState([]);
    
    // fetch properties
    const { data: properties, isLoading, error } = useFetch(`/${path}`);

    useEffect(() => {
        if(!isLoading && !error) {
            // map properties into array
            const options = properties
                ? properties.map((c) => ({ value: c.town, label: c.town }))
                : null;

            // delete duplicates from array
            function removeDuplicates(originalArray, prop) {
                const newArray = [];
                const lookupObject  = {};
           
                for(const i in originalArray) {
                   lookupObject[originalArray[i][prop]] = originalArray[i];
                }
           
                for(const i in lookupObject) {
                    newArray.push(lookupObject[i]);
                }
                return newArray;
            }
           
           setUniqueOptions(removeDuplicates(options, "value"));
        }
    }, [isLoading, error, properties])

    return <Select options={uniqueOptions} {...props} />;
};

export default TownSelect;
