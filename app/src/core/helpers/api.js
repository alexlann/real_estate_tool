import ApiError from "../error/ApiError";

const handleErrors = async (res) => {
    if (!res.ok) {
        const json = await res.json();
        throw new ApiError(json);
    }
    return await res.json();
};

const getImagePath = (path) => {
    return `${process.env.REACT_APP_API_URL}/${path}`;
};

export { handleErrors, getImagePath };
