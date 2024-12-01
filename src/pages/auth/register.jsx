import React, { useState } from "react";
import { Link } from "react-router";

// Components
import {
    EyeIcon,
    EyeSlashIcon,
    FacebookIcon,
    GoogleIcon,
    UploadIcon,
} from "../../components/icons";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section className="hero bg-base-200 min-h-screen bg-[url('https://img.freepik.com/fotos-premium/computadora-teclado-teclado_866548-481.jpg')]">
            <div className="hero-overlay bg-cover bg-black/80 backdrop-blur-sm"></div>
            <div className="hero-content flex-col gap-10 lg:flex-row">
                <div className="text-center lg:text-left space-y-5">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-extrabold">
                            ¿Ya tienes una cuenta?
                        </h1>
                        <p className="">
                            Si ya tienes una cuenta, puedes iniciar sesión en
                            nuestro sitio web.
                        </p>
                    </div>
                    <Link
                        to="/login"
                        className="btn btn-primary btn-outline btn-wide"
                    >
                        Inicia sesión
                    </Link>
                </div>
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div>
                            <Link
                                to="/"
                                className="text-4xl font-extrabold tracking-tight text-primary text-center mb-5 block"
                            >
                                AC COMPUTERS
                            </Link>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-extrabold">
                                    INICIA SESIÓN:
                                </h2>
                                <p className="leading-none">
                                    Ingresa en tu cuenta para obtener una mejor
                                    experiencia.
                                </p>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                                    Nombre:
                                </span>
                            </label>
                            <input
                                placeholder="Ingresa tu nombre y apellido"
                                className="input input-bordered focus:outline-0 focus:input-primary"
                                name="user_name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                                    Correo electrónica:
                                </span>
                            </label>
                            <input
                                placeholder="ejemplo@gmail.com"
                                className="input input-bordered focus:outline-0 focus:input-primary"
                                name="user_email"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                                    Teléfono:
                                </span>
                            </label>
                            <input
                                placeholder="320 9202177"
                                className="input input-bordered focus:outline-0 focus:input-primary"
                                name="user_phone"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                                    Contraseña:
                                </span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 group focus-within:input-primary focus-within:outline-0">
                                <input
                                    placeholder="*******"
                                    type={showPassword ? "text" : "password"}
                                    className="grow"
                                    name="user_password"
                                />
                                <kbd
                                    className="kbd kbd-sm cursor-pointer"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon />
                                    ) : (
                                        <EyeIcon />
                                    )}
                                </kbd>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                <UploadIcon size={20} />
                                Registrarse
                            </button>
                        </div>
                        <div className="divider">Ó</div>
                        <div className="form-control space-y-2">
                            <Link
                                to={
                                    import.meta.env.VITE_API_URL +
                                    "/user/auth/google"
                                }
                                className="btn bg-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-700 font-semibold"
                            >
                                <GoogleIcon size={18} />
                                Continua con Google
                            </Link>
                            <Link
                                to={
                                    import.meta.env.VITE_API_URL +
                                    "/user/auth/facebook"
                                }
                                className="btn bg-blue-700 text-blue-400 hover:bg-blue-800 hover:text-blue-300 font-semibold"
                            >
                                <FacebookIcon size={18} />
                                Continua con Facebook
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
