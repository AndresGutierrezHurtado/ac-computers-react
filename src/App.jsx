import React from "react";
import { useGetData, usePostData } from "./hooks/useFetchApi.js";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthContextProvider } from "./contexts/authContext.jsx";

// Pages
import Home from "./pages/home.jsx";
import Computers from "./pages/computers.jsx";
import Components from "./pages/components.jsx";
import Contact from "./pages/contact.jsx";
import Computer from "./pages/computer.jsx";
import Login from "./pages/auth/login.jsx";

// Layouts
import GuestLayout from "./layouts/guestLayout.jsx";
import AdminLayout from "./layouts/adminLayout.jsx";
import AppLayout from "./layouts/appLayout.jsx";
import Component from "./pages/component.jsx";
import Register from "./pages/auth/register.jsx";

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/computers" element={<Computers />} />
                        <Route path="/computers/:id" element={<Computer />} />
                        <Route path="/components/:id" element={<Component />} />
                        <Route path="/components" element={<Components />} />
                        <Route path="/contact" element={<Contact />} />
                    </Route>
                    <Route element={<GuestLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/register"
                            element={<Register />}
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
