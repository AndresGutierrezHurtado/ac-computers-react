import { useContext, createContext } from "react";
import { useGetData } from "../hooks/useFetchApi.js";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const {
        data: userSession,
        loading: loadingUserSession,
        reload: reloadUserSession,
    } = useGetData("/user/session");
    
    if (loadingUserSession) return <h1> Cargando sesión del usuario </h1>;
    return (
        <AuthContext.Provider value={{ userSession, reloadUserSession }}>
            {children}
        </AuthContext.Provider>
    );
};
