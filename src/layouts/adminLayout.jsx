import React from "react";
import { Link, Outlet } from "react-router";
import { GearIcon, ProductsIcon, UsersIcon } from "../components/icons";

export default function AdminLayout() {
    return (
        <>
            <header className="w-full z-50 sticky top-0 bg-[#20202b]">
                <div className="w-full mx-auto p-5 border-b border-gray-900">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Admin</h1>
                    </div>
                </div>
            </header>
            <article className="drawer lg:drawer-open">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <main className="drawer-content h-[calc(100vh-77px)] overflow-y-auto">
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-primary btn-sm btn-outline w-fit drawer-button lg:hidden absolute top-2 right-2"
                    >
                        Open drawer
                    </label>
                    <Outlet />
                </main>
                <aside className="drawer-side h-full">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 pt-[100px] lg:pt-4">
                        <li>
                            <Link to="/admin/users">
                                <UsersIcon />
                                Administrar usuarios
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/products">
                                <ProductsIcon />
                                Administrar productos
                            </Link>
                        </li>
                    </ul>
                </aside>
            </article>
        </>
    );
}
