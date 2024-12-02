import React from "react";
import { Outlet } from "react-router";

export default function AdminLayout() {
    return (
        <main className="grow">
            <Outlet />
        </main>
    );
}
