import { createContext, useContext, useEffect, useState } from "react";

const KEY = "MOBDEVII_AUTH";

const AuthContext = createContext();

const getAuthFromStorage = () => {
    const auth = localStorage.getItem(KEY);
    if (auth) {
        // base64 encode
        return JSON.parse(atob(auth));
    }
    return null;
};

const saveAuthToStorage = (auth) => {
    // base64 decode
    localStorage.setItem(KEY, btoa(JSON.stringify(auth)));
};

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getAuthFromStorage());

    useEffect(() => {
        if (auth) {
            saveAuthToStorage(auth);
        } else {
            localStorage.removeItem(KEY);
        }
    }, [auth]);

    const handleLogout = () => {
        setAuth(null);
    };

    const handleLogin = (auth) => {
        setAuth(auth);
    };

    return (
        <AuthContext.Provider
            value={{ auth, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const useUser = () => {
    const { auth } = useAuthContext();
    return auth?.user;
};

export default AuthProvider;
