import React from "react";
import { Link, useLocation } from "react-router";
import { useAuthContext } from "../contexts/authContext";
import {
    CloseIcon,
    ComponentIcon,
    ComputerIcon,
    GearIcon,
    HomeIcon,
    PhoneIcon,
    TrashIcon,
} from "../components/icons";

export default function Header() {
    const { userSession, handleLogout } = useAuthContext();
    const location = useLocation();

    const scrollFunction = () => {
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            document.getElementById("header").style.backgroundColor = "rgba(0, 0, 0, 0.35)";
            const header = document.getElementById("header");
            if (window.innerWidth < 768) {
                // Small screen
                header.style.paddingInline = "15px";
            } else {
                header.style.paddingInline = "35px";
            }
        } else {
            document.getElementById("header").style.backgroundColor = "rgba(0, 0, 0, 0)";
            document.getElementById("header").style.paddingInline = "0px";
        }
    };

    window.onscroll = function () {
        scrollFunction();
    };

    return (
        <div className="drawer sticky top-0 z-50">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full px-3 py-2">
                    <div
                        id="header"
                        className="navbar max-w-[1200px] mx-auto w-full rounded-full duration-300 py-0 backdrop-blur-sm"
                    >
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
                            className="navbar-start tooltip tooltip-bottom tooltip-accent"
                            data-tip="Ir al inicio"
                        >
                            <h2 className="text-nowrap text-start text-lg sm:text-2xl md:text-[27px] text-[#4e99d3] uppercase font-extrabold tracking-tight">
                                AC COMPUTERS
                            </h2>
                        </Link>
                        <div className="hidden flex-none lg:block navbar-center">
                            <ul className="menu menu-horizontal text-lg [&>li>a:hover]:text-[#4e99d3] [&>li>a:hover]:scale-105 [&>li>a:hover]:duration-300 [&>li>a:hover]:bg-transparent [&>li>a:focus]:bg-transparent [&>li>a:focus]:text-[#4e99d3]">
                                {/* Navbar menu content here */}
                                <li>
                                    <Link
                                        to="/computers"
                                        className={`${
                                            location.pathname === "/computers" &&
                                            "text-[#4e99d3] font-semibold"
                                        }`}
                                    >
                                        Computadores
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/components"
                                        className={`${
                                            location.pathname === "/components" &&
                                            "text-[#4e99d3] font-semibold"
                                        }`}
                                    >
                                        Componentes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className={`${
                                            location.pathname === "/contact" &&
                                            "text-[#4e99d3] font-semibold"
                                        }`}
                                    >
                                        Contáctanos
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-end">
                            <div className="dropdown dropdown-end">
                                <div tabIndex="0" role="button" className="btn btn-ghost avatar">
                                    {userSession ? "Cuenta" : "Autentícate"}
                                </div>
                                <ul
                                    tabIndex="0"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                >
                                    {userSession ? (
                                        <>
                                            {userSession.role_id == 2 && (
                                                <>
                                                    <li>
                                                        <Link
                                                            to="/admin/users"
                                                            className="text-blue-400"
                                                        >
                                                            <GearIcon />
                                                            Usuarios
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to="/admin/products"
                                                            className="text-blue-400"
                                                        >
                                                            <GearIcon />
                                                            Productos
                                                        </Link>
                                                    </li>
                                                </>
                                            )}
                                            <li>
                                                <a onClick={handleLogout} className="text-red-400">
                                                    <TrashIcon />
                                                    Cerrar sesión
                                                </a>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/login">Iniciar sesión</Link>
                                            </li>
                                            <li>
                                                <Link to="/register">Registrarme</Link>
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
                <ul className="menu bg-base-200 min-h-full w-80 p-4 justify-between">
                    <div>
                        <li>
                            <Link
                                to="/"
                                className={`${
                                    location.pathname === "/" && "text-[#4e99d3] font-semibold"
                                }`}
                            >
                                <HomeIcon />
                                <p>Inicio</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/computers"
                                className={`${
                                    location.pathname === "/computers" &&
                                    "text-[#4e99d3] font-semibold"
                                }`}
                            >
                                <ComputerIcon />
                                <p>Computadores</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/components"
                                className={`${
                                    location.pathname === "/components" &&
                                    "text-[#4e99d3] font-semibold"
                                }`}
                            >
                                <ComponentIcon />
                                <p>Componentes</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`${
                                    location.pathname === "/contact" &&
                                    "text-[#4e99d3] font-semibold"
                                }`}
                            >
                                <PhoneIcon />
                                <p>Contáctanos</p>
                            </Link>
                        </li>
                    </div>
                    <div>
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        >
                            <li>
                                <a>
                                    <CloseIcon />
                                    <p>Cerrar</p>
                                </a>
                            </li>
                        </label>
                    </div>
                </ul>
            </div>
        </div>
    );
}
