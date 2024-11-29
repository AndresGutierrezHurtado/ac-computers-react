import React from "react";
import { Link } from "react-router";
import { useAuthContext } from "../contexts/authContext";

export default function Header() {
    const { userSession } = useAuthContext();
    console.log(userSession);

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full">
                    <div className="navbar max-w-[1200px] mx-auto w-full">
                        {/* Responsive button */}
                        <div className="flex-none lg:hidden">
                            <label
                                htmlFor="my-drawer-3"
                                aria-label="open sidebar"
                                className="btn btn-square btn-ghost"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>

                        <Link
                            to="/"
                            className="navbar-start font-extrabold text-blue-600 tracking-tight text-xl"
                        >
                            AC COMPUTERS
                        </Link>
                        <div className="hidden flex-none lg:block navbar-center">
                            <ul className="menu menu-horizontal gap-1 font-medium">
                                {/* Navbar menu content here */}
                                <li>
                                    <Link to="/computers">Computadores</Link>
                                </li>
                                <li>
                                    <Link to="/components">Componentes</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contactanos</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-end">
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex="0"
                                    role="button"
                                    className="btn btn-ghost avatar"
                                >
                                    {userSession ? "Cuenta" : "Autentícate"}
                                </div>
                                <ul
                                    tabIndex="0"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                >
                                    {userSession ? (
                                        <>
                                            <li>
                                                <Link to="/profile" className="justify-between">
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <a>Logout</a>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/login">Login</Link>
                                            </li>
                                            <li>
                                                <Link to="/register">
                                                    Register
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                        <a>Inicio</a>
                    </li>
                    <li>
                        <a>Computadores</a>
                    </li>
                    <li>
                        <a>Componentes</a>
                    </li>
                    <li>
                        <a>Contactanos</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
