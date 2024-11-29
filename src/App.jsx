import React from "react";
import { useGetData, usePostData } from "./hooks/useFetchApi.js";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthContextProvider } from "./contexts/authContext.jsx";

import Home from "./pages/home.jsx";
import Computers from "./pages/computers.jsx";
import Components from "./pages/components.jsx";
import Contact from "./pages/contact.jsx";

// Layouts
import GuestLayout from "./layouts/guestLayout.jsx";
import AdminLayout from "./layouts/adminLayout.jsx";
import AppLayout from "./layouts/appLayout.jsx";

function App() {
    // const { data: computers, loading: loadingComputers } = useGetData("/products?category_id=1");
    // const { data: components, loading: loadingComponents } = useGetData("/products?category_id=2");
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/computers" element={<Computers />} />
                        <Route path="/components" element={<Components />} />
                        <Route path="/contact" element={<Contact />} />
                    </Route>
                    <Route element={<GuestLayout />}>
                        <Route path="/login" element={<h1> Componentes </h1>} />
                        <Route
                            path="/register"
                            element={<h1> Componentes </h1>}
                        />
                    </Route>
                    <Route element={<AdminLayout />}>
                        <Route
                            path="/admin/users"
                            element={<h1> Componentes </h1>}
                        />
                        <Route
                            path="/admin/products"
                            element={<h1> Componentes </h1>}
                        />
                    </Route>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
