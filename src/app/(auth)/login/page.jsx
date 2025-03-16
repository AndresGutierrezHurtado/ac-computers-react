"use client";
import { FacebookIcon, GoogleIcon } from "@/components/icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        await signIn("credentials", data); 
    }
    return (
        <>
            <div className="hero bg-base-200 min-h-screen bg-[url('https://img.freepik.com/fotos-premium/computadora-teclado-teclado_866548-481.jpg')]">
                <div className="hero-overlay bg-cover bg-black/70 backdrop-blur-sm"></div>

                <div className="hero-content flex-col lg:flex-row-reverse gap-[50px] z-[1]">
                    <div className="text-center lg:text-left flex flex-col items-center md:items-start gap-4">
                        <h1 className="text-4xl font-extrabold text-nowrap">
                            ¿No has creado una cuenta?
                        </h1>
                        <p className="pb-3 text-balance text-lg max-w-lg">
                            Si aún no tienes una cuenta, puedes crearla en el siguiente botón
                        </p>
                        <Link href="/register">
                            <button className="btn btn-primary btn-outline btn-wide font-medium">
                                Registrarse
                            </button>
                        </Link>
                    </div>
                    <div className="card bg-base-100 w-full max-w-[500px] shrink-0 shadow-2xl">
                        <div className="card-body flex flex-col gap-2 p-10 px-7">
                            <div>
                                <Link href="/">
                                    <h1 className="text-4xl font-extrabold text-center text-primary">
                                        AC COMPUTERS
                                    </h1>
                                </Link>
                                <p className="text-center text-2xl font-medium">Regístrate</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <fieldset className="fieldset gap-4">
                                    <div className="fieldset">
                                        <label className="fieldset-label font-medium text-base">
                                            Correo electrónico:
                                        </label>
                                        <input
                                            className="input w-full focus:outline-0 focus:border-primary"
                                            placeholder="Ingresa tu correo electrónico"
                                            name="user_email"
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
                                            name="user_password"
                                        />
                                    </div>
                                    <div>
                                        <a className="link link-hover text-primary font-medium text-base">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <button className="btn btn-primary font-medium mt-4">
                                        Iniciar Sesión
                                    </button>
                                </fieldset>
                            </form>
                            <div className="divider">
                                <p>O</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    type="button"
                                    onClick={() => signIn("google")}
                                    className="btn bg-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900 font-semibold"
                                >
                                    <GoogleIcon size={18} />
                                    Continua con Google
                                </button>
                                <button
                                    type="button"
                                    onClick={() => signIn("facebook")}
                                    className="btn bg-blue-700 text-blue-200 hover:bg-blue-800 hover:text-blue-100 font-semibold"
                                >
                                    <FacebookIcon size={18} />
                                    Continua con Facebook
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { signIn, useSession } from "next-auth/react";
// import { EyeIcon, EyeSlashIcon, FacebookIcon, GoogleIcon, UploadIcon } from "@/components/icons";
// import Link from "next/link";

// export default function Login() {
//     const [showPassword, setShowPassword] = React.useState(false);
//     const { data: session } = useSession();
//     const router = useRouter();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = Object.fromEntries(new FormData(e.target));
//         const result = await signIn("credentials", {
//             redirect: false,
//             email: data.user_email,
//             password: data.user_password,
//         });

//         if (result.error) {
//             alert(result.error);
//         } else {
//             router.push("/");
//         }
//     };

//     if (session) {
//         router.push("/");
//         return null;
//     }

//     return (
//         <section className="hero bg-base-200 min-h-screen bg-[url('https://img.freepik.com/fotos-premium/computadora-teclado-teclado_866548-481.jpg')]">
//             <div className="hero-overlay bg-cover bg-black/80 backdrop-blur-sm"></div>
//             <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
//                 <div className="text-center lg:text-left space-y-5">
//                     <div className="space-y-2">
//                         <h1 className="text-5xl font-extrabold">¿No tienes una cuenta?</h1>
//                         <p className="">
//                             Si aún no tienes una cuenta, puedes crearla en nuestro sitio web.
//                         </p>
//                     </div>
//                     <Link href="/register" className="btn btn-primary btn-outline btn-wide">
//                         Registrarse
//                     </Link>
//                 </div>
//                 <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
//                     <form onSubmit={handleSubmit} className="card-body">
//                         <div>
//                             <Link
//                                 href="/"
//                                 className="text-4xl font-extrabold tracking-tight text-primary text-center mb-5 block"
//                             >
//                                 AC COMPUTERS
//                             </Link>
//                             <div className="space-y-2">
//                                 <h2 className="text-2xl font-extrabold">INICIA SESIÓN:</h2>
//                                 <p className="leading-none">
//                                     Ingresa en tu cuenta para obtener una mejor experiencia.
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="form-control flex flex-col">
//                             <label className="label">
//                                 <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
//                                     Correo electrónico:
//                                 </span>
//                             </label>
//                             <input
//                                 placeholder="ejemplo@gmail.com"
//                                 className="input input-bordered focus:outline-0 focus:input-primary autofill:bg-yellow-200 w-full"
//                                 name="user_email"
//                             />
//                         </div>
//                         <div className="form-control flex flex-col">
//                             <label className="label">
//                                 <span className="label-text font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
//                                     Contraseña:
//                                 </span>
//                             </label>
//                             <label className="input input-bordered flex items-center gap-2 group focus-within:input-primary focus-within:outline-0 w-full">
//                                 <input
//                                     placeholder="*******"
//                                     type={showPassword ? "text" : "password"}
//                                     className="grow"
//                                     name="user_password"
//                                 />
//                                 <kbd
//                                     className="kbd kbd-sm cursor-pointer"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                 >
//                                     {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
//                                 </kbd>
//                             </label>
//                         </div>
//                         <div className="form-control flex flex-col mt-6">
//                             <button type="submit" className="btn btn-primary">
//                                 <UploadIcon size={20} />
//                                 Inicia sesión
//                             </button>
//                         </div>
//                         <div className="divider">Ó</div>
//                         <div className="form-control flex flex-col space-y-2">
//                             <button
//                                 type="button"
//                                 onClick={() => signIn("google")}
//                                 className="btn bg-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-700 font-semibold"
//                             >
//                                 <GoogleIcon size={18} />
//                                 Continua con Google
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => signIn("facebook")}
//                                 className="btn bg-blue-700 text-blue-400 hover:bg-blue-800 hover:text-blue-300 font-semibold"
//                             >
//                                 <FacebookIcon size={18} />
//                                 Continua con Facebook
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// }
