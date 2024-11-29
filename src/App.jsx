import React from "react";
import { useGetData, usePostData } from "./hooks/useFetchApi.js";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
    // const { data: computers, loading: loadingComputers } = useGetData("/products?category_id=1");
    // const { data: components, loading: loadingComponents } = useGetData("/products?category_id=2");
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1> Home </h1>} />
                <Route path="/computers" element={<h1> Computadoras </h1>} />
                <Route path="/components" element={<h1> Componentes </h1>} />
                <Route path="/login" element={<h1> Componentes </h1>} />
                <Route path="/register" element={<h1> Componentes </h1>} />
                <Route path="/admin/users" element={<h1> Componentes </h1>} />
                <Route path="/admin/products" element={<h1> Componentes </h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
