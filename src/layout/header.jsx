"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

// Icons
import {
    CloseIcon,
    ComponentIcon,
    ComputerIcon,
    GearIcon,
    HomeIcon,
    PhoneIcon,
    TrashIcon,
} from "@/components/icons";
import { useEffect } from "react";

export default function Header() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const userSession = session?.user;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                document.querySelector("#header").classList.add("bg-black/20");
                document.querySelector("#header").classList.add("px-5");
            } else {
                document.querySelector("#header").classList.remove("bg-black/20");
                document.querySelector("#header").classList.remove("px-5");
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="fixed w-full top-0 z-50">
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

                        <Link href="/" className="navbar-start">
                            <div
                                className="tooltip tooltip-neutral tooltip-bottom"
                                data-tip="Ir al inicio"
                            >
                                <h2 className="text-nowrap text-start text-lg sm:text-2xl md:text-[27px] text-primary uppercase font-extrabold tracking-tight">
                                    AC COMPUTERS
                                </h2>
                            </div>
                        </Link>
                        <div className="hidden flex-none lg:block navbar-center">
                            <ul className="menu menu-horizontal text-lg [&>li>a:hover]:text-primary [&>li>a:hover]:scale-105 [&>li>a:hover]:duration-300 [&>li>a:hover]:bg-transparent [&>li>a:focus]:bg-transparent [&>li>a:focus]:text-primary">
                                {/* Navbar menu content here */}
                                <li>
                                    <Link
                                        href="/computers"
                                        className={`${
                                            router.pathname === "/computers" &&
                                            "text-primary font-semibold"
                                        }`}
                                    >
                                        Computadores
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/components"
                                        className={`${
                                            router.pathname === "/components" &&
                                            "text-primary font-semibold"
                                        }`}
                                    >
                                        Componentes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className={`${
                                            router.pathname === "/contact" &&
                                            "text-primary font-semibold"
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
                                                            href="/admin/users"
                                                            className="text-blue-400"
                                                        >
                                                            <GearIcon />
                                                            Usuarios
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/admin/products"
                                                            className="text-blue-400"
                                                        >
                                                            <GearIcon />
                                                            Productos
                                                        </Link>
                                                    </li>
                                                </>
                                            )}
                                            <li>
                                                <a
                                                    onClick={() => signOut()}
                                                    className="text-red-400"
                                                >
                                                    <TrashIcon />
                                                    Cerrar sesión
                                                </a>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link href="/login">Iniciar sesión</Link>
                                            </li>
                                            <li>
                                                <Link href="/register">Registrarme</Link>
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
                                href="/"
                                className={`${
                                    router.pathname === "/" && "text-primary font-semibold"
                                }`}
                            >
                                <HomeIcon />
                                <p>Inicio</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/computers"
                                className={`${
                                    router.pathname === "/computers" && "text-primary font-semibold"
                                }`}
                            >
                                <ComputerIcon />
                                <p>Computadores</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/components"
                                className={`${
                                    router.pathname === "/components" &&
                                    "text-primary font-semibold"
                                }`}
                            >
                                <ComponentIcon />
                                <p>Componentes</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className={`${
                                    router.pathname === "/contact" && "text-primary font-semibold"
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
