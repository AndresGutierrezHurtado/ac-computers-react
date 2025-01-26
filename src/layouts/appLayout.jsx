import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

// Components
import Header from "./header";
import Footer from "./footer";

export default function AppLayout() {
    return (
        <div className="w-full min-h-screen flex flex-col gap-0">
            <Header />
            <main className="grow w-full overflow-x-hidden">
                <Outlet />
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
}
