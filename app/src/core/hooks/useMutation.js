import { useState } from "react";
import useAuthApi from "./useAuthApi";

const useMutation = () => {
    const { authFetch } = useAuthApi();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // method is pretty long, so async/await looks better than Promise.then()
    const mutate = async (url, options = {}) => {
        setIsLoading(true);

        let headers = {};
        if (!options.multipart) {
            headers = {
                "accept": "application/json",
                "content-type": "application/json",
            };
        }

        try {
            let body;
            let data = options.data ?? {};
            if (options.multipart) {
                body = new FormData();
                for (const name in data) {
                    body.append(name, data[name]);
                }
            } else {
                body = JSON.stringify(data);
            }
            const result = await authFetch(url, {
                method: options.method ?? "POST",
                headers: headers,
                body: body,
            });

            if (options.onSuccess) {
                options.onSuccess(result);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            if (options.onError) {
                options.onError(String(error));
            } else {
                console.log(error);
                console.log(error.toString());
                setIsLoading(false);
                setError(error.toString());
            }
        }
    };

    return {
        isLoading,
        error,
        mutate,
    };
};

export default useMutation;
