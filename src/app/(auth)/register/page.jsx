import Link from "next/link";
import React from "react";

export default function Register() {
    return (
        <>
            <div className="hero bg-base-200 min-h-screen bg-[url('https://img.freepik.com/fotos-premium/computadora-teclado-teclado_866548-481.jpg')]">
                <div className="hero-overlay bg-cover bg-black/70 backdrop-blur-sm"></div>

                <div className="hero-content flex-col lg:flex-row gap-[50px] z-[1]">
                    <div className="text-center lg:text-right flex flex-col items-center md:items-end gap-4">
                        <h1 className="text-4xl font-extrabold text-nowrap">
                            ¿Ya tienes una cuenta?
                        </h1>
                        <p className="pb-3 text-balance text-lg max-w-lg">
                            Si ya tienes una cuenta puedes iniciar sesión en el siguiente botón
                        </p>
                        <Link href="/login">
                            <button className="btn btn-primary btn-outline btn-wide font-medium">
                                Iniciar sesión
                            </button>
                        </Link>
                    </div>
                    <div className="card bg-base-100 w-full max-w-[500px] shrink-0 shadow-2xl">
                        <div className="card-body flex flex-col gap-2 p-10 px-7">
                            <div>
                                <h1 className="text-4xl font-extrabold text-center text-primary">
                                    AC COMPUTERS
                                </h1>
                                <p className="text-center text-2xl font-medium">Regístrate</p>
                            </div>
                            <fieldset className="fieldset gap-4">
                                <div className="fieldset">
                                    <label className="fieldset-label font-medium text-base">
                                        Nombre:
                                    </label>
                                    <input
                                        className="input w-full focus:outline-0 focus:border-primary"
                                        placeholder="Ingresa tu nombre"
                                    />
                                </div>
                                <div className="fieldset">
                                    <label className="fieldset-label font-medium text-base">
                                        Apellidos:
                                    </label>
                                    <input
                                        className="input w-full focus:outline-0 focus:border-primary"
                                        placeholder="Ingresa tus apellidos"
                                    />
                                </div>
                                <div className="fieldset">
                                    <label className="fieldset-label font-medium text-base">
                                        Correo electrónico:
                                    </label>
                                    <input
                                        type="email"
                                        className="input w-full focus:outline-0 focus:border-primary"
                                        placeholder="Ingresa tu correo electrónico"
                                    />
                                </div>
                                <div className="fieldset">
                                    <label className="fieldset-label font-medium text-base">
                                        Telefono:
                                    </label>
                                    <input
                                        type="number"
                                        className="input w-full focus:outline-0 focus:border-primary"
                                        placeholder="Ingresa tu telefono"
                                    />
                                </div>
                                <div className="fieldset">
                                    <label className="fieldset-label font-medium text-base">
                                        Contraseña:
                                    </label>
                                    <input
                                        type="password"
                                        className="input w-full focus:outline-0 focus:border-primary"
                                        placeholder="Ingresa tu contraseña"
                                    />
                                </div>
                                <button className="btn btn-primary font-medium mt-4">
                                    Crear cuenta
                                </button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
