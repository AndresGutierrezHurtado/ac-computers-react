import React from "react";
import { Outlet } from "react-router";

export default function GuestLayout() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
