import { useEffect, useState } from "react";
import Spinner from "../../../../Design/Spinner";

const LoadingIndicator = ({ timeout = 1000 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => setIsVisible(true), timeout);
        return () => clearTimeout(id);
    }, [timeout]);

    if (!isVisible) {
        return null;
    }

    return <Spinner />;
};

export default LoadingIndicator;
