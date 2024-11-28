import React from "react";
import { useGetData, usePostData } from "./hooks/useFetchApi.js";

function App() {
    const { data: products, loading: loadingProducts } = useGetData("/products");
    console.log(products);

    // usePostData("/user/login", {
    //     user_email: "andres52885241@gmail.com",
    //     user_password: "1234",
    // });

    console.log(products);
    if (loadingProducts) return <h2> Cargando </h2>;
    return <></>;
}

export default App;
