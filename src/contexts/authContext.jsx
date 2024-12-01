import { useContext, createContext } from "react";
import { useGetData, usePostData } from "../hooks/useFetchApi.js";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const {
        data: userSession,
        loading: loadingUserSession,
        reload: reloadUserSession,
    } = useGetData("/user/session");

    const handleLogout = async () => {
        const response = await usePostData("/user/logout");
        if (response.success) {
            reloadUserSession();
        }
    };

    if (loadingUserSession) return <h1> Cargando sesión del usuario </h1>;
    return (
        <AuthContext.Provider
            value={{ userSession, reloadUserSession, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
