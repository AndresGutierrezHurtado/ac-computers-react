import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export default function GuestLayout() {
    return (
        <div>
            <Outlet />
            <ToastContainer />
        </div>
    );
}
