import { useContext, createContext } from "react";
import { useGetData, usePostData } from "../hooks/useFetchApi.js";
import LoadingContent from "../components/loadingContent.jsx";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const {
        data: userSession,
        loading: loadingUserSession,
        reload: reloadUserSession,
    } = useGetData("/user/session");

    const handleLogout = () => {
        Swal.fire({
            icon: "warning",
            title: "Cerrar sesión",
            text: "Estas seguro de cerrar la sesión?",
            showDenyButton: true,
            confirmButtonText: "Si, cerrar sesión",
            denyButtonText: "No, cancelar",
            confirmButtonColor: "#d33",
            denyButtonColor: "#3085d6",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await usePostData("/user/logout");
                if (response.success) {
                    reloadUserSession();
                }
            }
        })
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
