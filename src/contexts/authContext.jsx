import { useContext, createContext } from "react";
import { useGetData, usePostData } from "../hooks/useFetchApi.js";
import LoadingContent from "../components/loadingContent.jsx";

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

    if (loadingUserSession) return <LoadingContent />;
    return (
        <AuthContext.Provider
            value={{ userSession, reloadUserSession, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
